<template>
    <div class="rs__select__layout ">
        <div v-for="(file, index) in currentResource" :key="index"
            :class="[currentResource[index].editFlag?activeClass:'','rs__card']" @dblclick="matching(index)">
            <svg v-if="flagCheck(index)" class="rs__card__complete">
                <use xlink:href="../../../assets/img/all.svg#icon-pin"></use>
            </svg>
            <img v-if="currentResource[index].type.split('/').shift()=='image'" 
                class="rs__card__extension" :src="currentResource[index].url">
            <img v-if="currentResource[index].type.split('/').shift()=='video'" 
                class="rs__card__extension" src="https://rs-learning-resources.s3.cn-northwest-1.amazonaws.com.cn/public/index/mp4.png">
            <!-- <svg v-if="currentResource[index].type.split('/').shift()=='video'"
                class="rs__card__extension rs__card__extension--1">
                <use xlink:href="../../../assets/img/all.svg#icon-file-video"></use>
            </svg> -->
            <!-- <svg v-if="currentResource[index].type.split('/').shift()=='text'"
                class="rs__card__extension rs__card__extension--1">
                <use xlink:href="../../../assets/img/all.svg#icon-empty-file"></use>
            </svg> -->
            <h5 class="rs__card__name">{{currentResource[index].name}}</h5>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeClass: 'rs__card--edit',
                resList: this.$store.state.resourceList,
                pinshow: false
            }
        },
        computed: {
            userAuth() {
                return this.$store.state.userId;
            },
            currentResource() {
                return this.$store.state.resourceList;
            },
            courseProfile() {
                return this.$store.state.courseInfo;
            },
        },
        created() {
            let userData = {
                token: localStorage.getItem('token'),
                userId: localStorage.getItem('userId'),
                roleId: localStorage.getItem('roleId'),
                expirationDate: localStorage.getItem('expirationDate')
            }
            this.$store.dispatch("authUser", userData).then(() => {
                console.log("authUser 成功");
            }).catch((err) => {
                console.error(err);
            });
            this.$store.dispatch("getResources").then(() => {
                console.log("--------");
            }).catch((err) => {
                console.error(err);
            });
        },
        methods: {
            matching: function (index) {
                console.log("dbclick")
                let payload = {
                    index: index
                }
                this.$store.dispatch("prepareMatching", payload).then(() => {
                    console.log("准备配对标志成功返回");
                }).catch((err) => {
                    console.error(err);
                });
            },
            flagCheck: function (index) {
                let flag = false;
                let tempList = this.$store.state.resourceList[index].RS_TAG;
                // let me =this;
                if (!tempList.length == 0) {
                    // let me = this;
                    for (let i = 0; i < tempList.length; i++) {
                        if (tempList[i].userId == this.$store.state.userId) {
                            flag = true;
                            break;
                        }
                    }
                }
                return flag;
            },
            // getImagePreviews() {
            //     for (let i = 0; i < this.files.length; i++) {
            //         if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
            //             let reader = new FileReader();
            //             reader.addEventListener("load", function () {
            //                 this.$refs['preview' + parseInt(i)][0].src = reader.result;
            //             }.bind(this), false);
            //             reader.readAsDataURL(this.files[i]);

            //         } else {
            //             this.$nextTick(function () {
            //                 this.$refs['preview' + parseInt(i)][0].src = 'https://rs-learning-resources.s3.cn-northwest-1.amazonaws.com.cn/public/index/mp4.png';
            //             });

            //         }
            //     }
            // },s

        },
    }
</script>