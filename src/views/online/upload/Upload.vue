<template>
  <main class="upload" id="file-upload">
    <div class="upload__area">
      <svg class="upload__area--svg">
        <use xlink:href="../../../assets/img/all.svg#icon-upload"></use>
      </svg>
      <span class="upload__area--txt">拖拽文件至下方</span>
      <div class="upload__area--video">
        <video :src="videoUrl" controls preload="auto" id="videoPlayer"></video>
      </div>
    </div>
    <div class="upload__drag" :style="{'background-color': (borderhover ? '#3d8cff':'#f9f7f6')}">
      <div class="upload__drag__area " v-for="(item,index) in files" :key="index">
        <img class="upload__drag__area--img preview" v-bind:ref="'preview'+parseInt( index )">
        <svg class="upload__drag__area--btn" v-on:click="removeFile( item )">
          <use xlink:href="../../../assets/img/all.svg#icon-circle-with-cross"></use>
        </svg>
      </div>
    </div>

    <div class="process" :style="{'background-color': (borderhover ? '#3d8cff':'#f9f7f6')}">
      <ul>
        <li v-for="(file,index) in files" :key="index" class="process__block">
          <div class="process__bar" max="100">
            <div class="process__bar__detail">
              <svg>
                <use xlink:href="../../../assets/img/all.svg#icon-key"></use>
              </svg>
              <div class="process__bar__detail__item">
                <span class="process__item--name">{{ file.name }}</span>
                <span class="process__item--info">
                  {{currentLoad[index] | fileSize | fileFormat }}{{ file.size | fileSize }}</span>
              </div>
              <div class="process__bar__detail--btn" @click="uploadBusiness(index)">上传</div>
            </div>
            <div class="process__bar__view" id="index" :style="{'width':uploadPercentage[index]}">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
<script>
  import axios from '../../../store/axios-auth';
  import { uploadFile } from "../../../store/uploadFile";
  import mime from "mime";
  export default {
    data() {
      return {
        borderhover: false,
        dragAndDropCapable: false,
        files: [],
        videoUrl: "",
        uploadPercentage: [],
        uploadPercentageTxt: '',
        currentLoad: [],
        duration: [],
        currentIndex: -1,
        allowFlag: true
      }
    },
    computed: {
    },
    mounted: function () {

      //方法一
      let _this = this;
      var dropbox = document.getElementById('file-upload');
      dropbox.addEventListener("drop", this.enentDrop, false)
      dropbox.addEventListener("dragleave", function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = false;
      });
      dropbox.addEventListener("dragenter", function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = true;
      });
      dropbox.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover = true
      });

    },
    filters: {
      fileSize: function (value) {
        if (null == value || value == '') {
          return "";
        }
        var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
        var index = 0;
        var srcsize = parseFloat(value);
        index = Math.floor(Math.log(srcsize) / Math.log(1024));
        var size = srcsize / Math.pow(1024, index);
        if (size % 1 === 0) {
          size = size.toFixed(0); //如果是整数不保留小数
        } else {
          size = size.toFixed(2);//保留的小数位数
        }
        return size + "  " + unitArr[index];
      },
      fileFormat: function (value) {
        if (null == value || value == '') {
          return ""
        } else {
          return value + " / ";
        }
      }
    },
    methods: {
      enentDrop: function (e) {
        this.borderhover = false
        this.borderWeight = false
        e.stopPropagation();
        e.preventDefault();

        for (let i = 0; i < e.dataTransfer.files.length; i++) {

          if (/\.(jpe?g|png|gif|mp4)$/i.test(e.dataTransfer.files[i].name)) {
            this.files.push(e.dataTransfer.files[i]);
            console.log(e.dataTransfer.files[i]);
            this.getImagePreviews();
          } else {
            this.$toast.error({ title: "注意!注意!注意!", message: "该文件类型暂不支持" });
          }
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
            }.bind(this), false);
            reader.readAsDataURL(this.files[i]);
            this.duration[i] = 0;

          } else {
            let videoFile = this.files[i];
            let url = URL.createObjectURL(videoFile);
            this.videoUrl = url;
            setTimeout(() => {
              if(this.duration[i]==null || this.duration==""){
                console.log(document.getElementById("videoPlayer").duration);
                this.duration[i] = document.getElementById("videoPlayer").duration;
              }
            }, 800);
            this.$nextTick(function () {
              this.$refs['preview' + parseInt(i)][0].src = 'https://rs-learning-resources.s3.cn-northwest-1.amazonaws.com.cn/public/index/mp4.png';
            });
          }
        }
      },
      
      timeFormat: function (s) {
        let day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
        let hour = Math.floor((s - day * 24 * 3600) / 3600);
        let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
        let second = Math.floor (s - day * 24 * 3600 - hour * 3600 - minute * 60);
        let result = "";
        if(day >0) {
          result = day + "天" + hour + "时" + minute + "分" + second + "秒";
        }else if(day==0 && hour>0){
          result =  hour + "时" + minute + "分" + second + "秒";
        }else if(day==0 && hour ==0 && minute>0){
          result =   minute + "分" + second + "秒";
        } else if(day==0 && hour ==0 && minute==0 && second>0){
          result =    second + "秒";
        }
        return result
      },
      removeFile(file) {
        this.files = this.files.filter((f,i) => {
          console.log(file.name)
          this.duration.splice(i,1);
          return f != file;
        });
        console.log(this.files);
        this.getImagePreviews();
      },

      uploadBusiness(index) {
        console.log(index);
        this.currentIndex = index;
        this.getPass();
      },
      getPass() {
        const userId = localStorage.getItem("userId")
        const config = { headers: { Authorization: localStorage.getItem("token") } };
        const fileType = this.files[this.currentIndex].name.split(".").pop();
        let mimeType = mime.getType(fileType)
        if (fileType == "jpg") {
          mimeType = "image/" + fileType
        } else {
          mimeType = mime.getType(fileType)
        }
        let tag = [];
        const data = {
          type: mimeType,
          name: this.files[this.currentIndex].name,
          size: this.files[this.currentIndex].size,
          duration: this.duration[this.currentIndex],
          tag: tag,
          editflag: false,
          userId: userId
        };

        axios.post("/rs-upload", data, config)
          .then(response => {
            console.log(response);
            let { data, statusNumber } = response.data;
            if (statusNumber !== "rs-108") {
              throw new Error("upload attributes error");
            }
            const that = this;
            let AWSConfig = { ...data.Credentials, path: "teaching/resources/" + userId + "", id: data.id };
            const upload = (err, data) => {
              // that.screenLoading = false;
              if (err || !data.ETag) {
                // console.error(err, data);
                that.$toast.error({ title: "上传失败", message: "出错啦，请重新上传！" })
              } else {
                that.$toast.success({ title: "上传成功", message: "继续上传，或者创建课程吧" })
              }
            };
            const progress = event => {
              let process = Number((event.loaded * 100) / event.total);
              that.currentLoad[this.currentIndex] = event.loaded;
              this.$set(this.uploadPercentage, this.currentIndex, this.uploadPercentage[this.currentIndex]);
              that.uploadPercentage[this.currentIndex] = `${parseInt(process)}%`;
              that.test = `${parseInt(process)}%`;
            };
            uploadFile(this.files[this.currentIndex], AWSConfig, upload, progress);

          }).catch(error => {
            console.error(error);
          });
      },
    },
  }
</script>