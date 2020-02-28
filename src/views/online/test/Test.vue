<template>
    <div>
      <div style="width: 100%;">
        <div class="drop_area mg-b-20 disFlex align-center hor-center"  id="drop_area"
             :style="{'border-color': (borderhover ? '#3d8cff':'#BBBBBB')}">
          <div  style="">将文件拖拽到此处,或</div>
          <div>
            <div class="font-blue pos-r cur-hand mg-l-10" style="top: 12px;"><i class="el-icon-upload mg-r-5"></i>点击上传</div>
            <input type="file" accept="image/png,image/jpeg,image/gif" multiple class="input-upload  cur-hand"  @change ="getUpload($event)" /></div>
        </div>
        <div class="imgpreview" id="preview-area">

        </div>
        
      </div>
    </div>
  </template>

  <script>
  export default {
    data () {
      return {
        borderhover:false,  //文件拖拖动到区域的hover效果
        imgArr:[],
        fileData:[],
      }
    },
    mounted: function () {
        let _this = this;
      var dropbox = document.getElementById('drop_area');
      dropbox.addEventListener("drop",this.enentDrop,false)
      dropbox.addEventListener("dragleave",function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover =  false;
      })
      dropbox.addEventListener("dragenter",function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover =  true;
      })
      dropbox.addEventListener("dragover",function (e) {
        e.stopPropagation();
        e.preventDefault();
        _this.borderhover =  true
      })
    },
    methods:{
      enentDrop: function(e){
        this.borderhover = false
        e.stopPropagation();
        e.preventDefault();  //必填字段
        let fileData = e.dataTransfer.files;
        console.log(fileData);
        this.imgPreview(e.dataTransfer.files);
        // this.uploadFile(fileData)
      },
      uploadFile: function (file){   //渲染上传文件
        for (let i = 0; i !== file.length; i++) {
          let fileJson = {
            Url:'',
            progressStatl:0,
            fileText:'',
          };
          let video_type=file[i].type == "video/mp4" || file[i].type == "video/ogg";
          if(file[i].type.indexOf('image') === 0){  //如果是图片
            let fileurl = window.URL.createObjectURL(file[i]); //创建一个url连接,供src属性引用
                fileJson.Url = fileurl;
          }else if(video_type){
              alert("不支持此类型文件")
          }else{
            alert("不支持此类型文件")
          }
          fileJson.fileText = file[i].name;
          this.fileData.push(fileJson);
        }
      },
      deleteFile:function (){   //删除已选文件
        
      },
      imgPreview (files) {
      let read = new FileReader();
      // let imgUrl = document.querySelector('preview-area');
      read.readAsDataURL(files[0]);
      read.onload = function () {  
        let url = read.result;
        let img = new Image();
        img.src = url;
        document.getElementById('preview-area').appendChild(img);
      }
    },
    }
  }
  </script>
  <style>
    .drop_area{
      height: 500px;
      border: 5px salmon solid;
    }
  </style>