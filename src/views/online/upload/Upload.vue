<template>
  <main class="upload" id="file-drag-drop">
    <!-- 方法二 -->
    <!-- <main class="upload" id="file-drag-drop" ref="fileform" > -->
    <div class="upload__area">
      <svg class="upload__area--svg">
        <use xlink:href="../../../assets/img/sprite2.svg#icon-info"></use>
      </svg>
      <span class="upload__area--txt">拖拽文件到窗口灰色区域</span>
    </div>
    <div class="upload__drag" :style="{'background-color': (borderhover ? '#3d8cff':'#f9f7f6')}">
      <div class="upload__drag--area " v-for="(item,index) in files" :key="index">
        <img class="upload__drag--img preview" v-bind:ref="'preview'+parseInt( index )">
        <button class="upload__drag--btn" v-on:click="removeFile( item )">删除</button>
      </div>
    </div>



    <div class="process" :style="{'background-color': (borderhover ? '#3d8cff':'#f9f7f6')}">
      <ul>
        <li v-for="(file,index) in files" :key="index">
          <div class="process__bar" max="100" :value.prop="uploadPercentage">
            <svg>
              <use xlink:href="../../../assets/img/sprite.svg#icon-key"></use>
            </svg>
            <div class="process__item">
              <span class="process__item--name">{{ file.name }}</span>
              <span class="process__item--info">60kb / {{ file.size | kb }} kb</span>
            </div>
            <div class="process__bar--btn" @click="uploadBusiness(index)">上传</div>
          </div>
        </li>

      </ul>



    </div>
    <div class="process__btn">
      <a class="process__btn__link">上传资源文件<span>&plus;</span></a>
    </div>

  </main>
</template>
<script>
  import axios from '../../../store/axios-auth';
  import { uploadFile } from "../../../store/uploadFile";
  export default {
    data() {
      return {
        borderhover: false,
        dragAndDropCapable: false,
        files: [],
        uploadPercentage: 0,
        currentIndex: -1
      }
    },
    mounted: function () {
      //方法一
      let _this = this;
      var dropbox = document.getElementById('file-drag-drop');
      dropbox.addEventListener("drop", this.enentDrop, false)
      dropbox.addEventListener("dragleave", function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = false;
        // _this.borderWeight =  false;
      })
      dropbox.addEventListener("dragenter", function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = true;
        // _this.borderWeight =  true;
      })
      dropbox.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = true
        // _this.borderWeight =  true
      })

      //方法二 拖拽到时候背景或边框不能改变
      /**
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      console.log(this.dragAndDropCapable)
      if (this.dragAndDropCapable) {
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave','drop'].forEach(function (evt) {
          this.$refs.fileform.addEventListener(evt, function (e) {
            e.preventDefault();
            e.stopPropagation();
          }.bind(this), false);
        }.bind(this));
        this.$refs.fileform.addEventListener('drop', function (e) {
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
            this.getImagePreviews();
          }
        }.bind(this));
      }
      */
    },
    methods: {
      enentDrop: function (e) {
        this.borderhover = false
        this.borderWeight = false
        e.stopPropagation();
        e.preventDefault();

        // let fileData = e.dataTransfer.files;
        // this.imgPreview(e.dataTransfer.files);
        // this.uploadFile(fileData)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
          this.getImagePreviews()
        }
      },
      determineDragAndDropCapable() {

        var div = document.createElement('div');
        return (('draggable' in div)
          || ('ondragstart' in div && 'ondrop' in div))
          && 'FormData' in window
          && 'FileReader' in window;
      },
      getImagePreviews() {
        for (let i = 0; i < this.files.length; i++) {
          if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
            let reader = new FileReader();
            reader.addEventListener("load", function () {
              this.$refs['preview' + parseInt(i)][0].src = reader.result;
              console.log("------------ 2 " + reader.result);
            }.bind(this), false);
            reader.readAsDataURL(this.files[i]);
          } else {
            this.$nextTick(function () {
              this.$refs['preview' + parseInt(i)][0].src = '/images/file.png';
            });
          }
        }
      },


      submitFiles() {
        let formData = new FormData();
        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          formData.append('files[' + i + ']', file);
        }


        axios.post('/file-drag-drop',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }.bind(this)
          }
        ).then(function () {
          console.log('SUCCESS!!');
        })
          .catch(function () {
            console.log('FAILURE!!');
          });
      },

      removeFile(file) {
        // this.files.splice(key, 1);
        
        this.files = this.files.filter(f => {
          console.log(file.name)
          return f != file;
        });
        console.log(this.files);
        this.getImagePreviews();
      },

      uploadBusiness(index) {
        console.log(index);
        this.currentIndex = index
        this.$toast.info({ title: "上传失败", message: "出错啦，请重新上传！" })
        this.getPass();
        
      },

      getPass() {
        const userId = localStorage.getItem("userId")
        const config = { headers: { Authorization: localStorage.getItem("token") } };
        console.log(JSON.stringify(config));
        console.log(this.files[this.currentIndex].name.split(".").pop());

        const data = {
          type: this.files[this.currentIndex].name.split(".").pop(),
          name: this.files[this.currentIndex].name,
          size: this.files[this.currentIndex].size,
          userId: userId
        };
        console.log(JSON.stringify(data));

        axios.post("/rs-upload", {
          type: this.files[this.currentIndex].name.split(".").pop(),
          name: this.files[this.currentIndex].name,
          size: this.files[this.currentIndex].size,
          userId: userId
        }, config)
          .then(response => {
            console.log(response);
            let { data,statusNumber } = response.data;
            if (statusNumber !== "rs-108") {
              throw new Error("upload attributes error");
            }
            const that = this;
            let AWSConfig = { ...data.Credentials, path: "learning/resources", id:data.id};
            const upload = (err, data) => {
              // that.screenLoading = false;
              if (err || !data.ETag) {
                // console.error(err, data);
                that.$toast.error({ title: "上传失败", message: "出错啦，请重新上传！" })
              } else {
                that.$toast.success({ title: "上传成功", message: "继续上传，或者创建课程吧" })
                // that.cancelUpload();
              }
            };
            const progress = event => {
              let process = Number((event.loaded * 100) / event.total);
              that.loadingTips = `连接成功，上传进度为 ${parseInt(process)}%`;
            };
            console.log("----------"+AWSConfig)
            uploadFile(this.files[this.currentIndex], AWSConfig, upload, progress);

          }).catch(error => {
            console.error(error);
          });
      }
    },
  }
</script>