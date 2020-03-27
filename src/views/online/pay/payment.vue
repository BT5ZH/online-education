<template>
  <div class="father">
    <div class="payment">
      <h1 class="payment-title">支付</h1>
      <div class="content">
        <h2>订单编号:{{orderId}}</h2>
        <div class="detial">
          <div class="course-cover">
            <img :src="courseMess.courseCover" alt class="cover-img" />
          </div>
          <h1 class="course-money">￥{{courseMess.coursePrice}}</h1>
          <h1 class="course-name">{{courseMess.courseName}}</h1>
        </div>
        <button class="submit-pay" @click="showAlert()">微信支付</button>
        <h2 class="cancel" @click="cancel()">取消</h2>
      </div>
    </div>
    <div class="modal" v-show="showModal">
      <div class="modal-bg">
        <h1 class="modal-title">使用微信扫一扫</h1>
        <div id="query">
          <canvas id="canvas" class="qrcode"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import random from "string-random";
import QRCode from "qrcode";
// import globalAxios from "axios";
import instance from "../../../store/axios-auth.js";

export default {
  data() {
    return {
      orderId: "",
      showModal: false,
      canvas: ""
    };
  },
  computed: {
    courseMess() {
      return this.$store.state.payCourse;
    }
  },
  created: function() {
    this.orderId = random(6) + Date.now();
  },
  methods: {
    showAlert() {
      this.showModal = true;
      let payment = {
        orderId: this.orderId,
        productName: this.courseMess.courseName,
        fee: this.courseMess.coursePrice,
        payType: "tenpay"
      };
      let config = {
        headers: { Authorization: localStorage.getItem("token") }
      };
      console.log(payment);
      console.log(config);
      instance
        .post("/rs-pay/UNIONPAY", payment, config)
        .then(res => {
          console.log(res);
          this.qrCode(res.data.code_url, payment.orderId);
        })
        .catch(err => {
          console.error(err);
        });
    },
    qrCode(url, orderId) {
      let canvas = document.getElementById("canvas");
      var that = this;
      QRCode.toCanvas(canvas, url, function(error) {
        if (error) console.error(error);
        var timer = setInterval(function() {
          that.query(timer, orderId);
        }, 2000);
      });
    },
    query(timer, orderId) {
      //let config = {params:{orderId: orderId ,payType:"tenpay"}};
      let token = {
        headers: { Authorization: localStorage.getItem("token") }
      };
      console.log(token)
      instance
        .get("/rs-pay/QUERY?orderId="+orderId+"&payType=tenpay",token,)
        .then(response => {
          //console.log(response);
          if (response.data.xml.trade_state == "SUCCESS") {
            console.log("支付")
            this.showModal = false
            clearInterval(timer)
            this.$toast.success({title:"支付成功",message:"本课程支付成功"});
            this.$router.push( {name:'courses'})
          }
        })
        .catch(err => console.log(err));
    },
    cancel(){
      this.$router.push( {name:'courses'})
    }
  }
};
</script>