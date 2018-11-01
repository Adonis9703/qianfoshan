<template>
  <div class="info-confirm">
    <div class="tip-top font-size88">
      <div style="margin-bottom: .5rem">拍照注意事项</div>
      <div class="tips">
        1、请注意第一张是“身份证正面”，第二张是“身份证反面”，第三张是“手持身份证正面”。
        <div class="tips">
          2、拍照时请确保“身份证”所有信息清晰可见。
        </div>
        <div class="tips">
          3、照片需免冠，手持身份证正面“五官必须清晰可见”，身份证与身体保持平行，并且靠近摄像头，建议不要化妆。
        </div>
      </div>
    </div>
    <div class="bgcolor-white text-align-center content">

      <van-uploader :after-read="onRead1" accept="image/*">
        <img :src="frontUrl" class="img"/>
        <div v-if="frontUrl == idCardFront" class="image-edit flex-align-justify">
          <img :src="imageEdit"/>
        </div>
      </van-uploader>
      <div class="title font-size88">示例：身份证人像面（正面）</div>

      <van-uploader :after-read="onRead2" accept="image/*">
        <img :src="behindUrl" class="img"/>
        <div v-if="behindUrl == idCardBehind" class="image-edit flex-align-justify">
          <img :src="imageEdit"/>
        </div>
      </van-uploader>
      <div class="title font-size88">示例：身份证团徽面（反面）</div>

      <van-uploader :after-read="onRead3" accept="image/*">
        <img :src="inHandUrl" class="img"/>
        <div v-if="inHandUrl == idCardInHand" class="image-edit flex-align-justify">
          <img :src="imageEdit"/>
        </div>
      </van-uploader>
      <div class="title font-size88">示例：手持身份证（正面）</div>
    </div>
    <div class="foot">
      <van-button class="blue-btn" @click="submit">提交申请</van-button>
    </div>
  </div>
</template>

<script>
  import idCardFront from '@/assets/images/idCard_front.png'
  import idCardBehind from '@/assets/images/idCard_behind.png'
  import idCardInHand from '@/assets/images/idCard_in_hand.png'
  import imageEdit from '@/assets/images/image_edit.png'
  import iconNotice from '@/assets/images/icon_notice.png'
  import {Uploader} from 'vant'

  export default {
    name: "InfoConfirm",
    components: {
      vanUploader: Uploader
    },
    data() {
      return {
        idCardFront,
        idCardBehind,
        idCardInHand,
        imageEdit,
        iconNotice,
        frontUrl: idCardFront,
        behindUrl: idCardBehind,
        inHandUrl: idCardInHand,
        isIos: true
      }
    },
    created() {
      this.getUserAgent()
      localStorage.setItem('active', '3')
    },
    methods: {
      getUserAgent() {
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) {
          this.isIos = true
        } else if (/android/.test(ua)) {
          this.isIos = false
        }
      },
      compress(img) {
        let canvas = document.createElement("canvas");
        let tCanvas = document.createElement("canvas")
        let ctx = canvas.getContext("2d");
        let tctx = tCanvas.getContext("2d")
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;

        let ratio
        if ((ratio = width * height / 8000000) > 1) {
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio
        }

        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.drawImage(img, 0, 0, width, height);

        let count
        if ((count = width * height / 8000000) > 1) {
          count = ~~(Math.sqrt(count) + 1)
          let nw = ~~(width / count)
          let nh = ~~(height / count)
          tCanvas.width = nw
          tCanvas.height = nh
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }

        //进行最小压缩
        let ndata = canvas.toDataURL("image/jpeg", 0.1);
        console.log(`压缩前：` + initSize)
        console.log(`压缩后：` + ndata.length)
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      dataURItoBlob(dataURI) {
        var type = dataURI.match(/data:([^;]+)/)[1];
        var base64 = dataURI.replace(/^[^,]+,/, '');
        var byteString = atob(base64);

        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: type});
      },
      onRead1(file) {
        // if (!this.isIos) {
        //   this.frontUrl = file.content
        //   let temp = new FormData()
        //   temp.append('file', file.file, file.file.name)
        //   this.$post({
        //     isLoading: true,
        //     url: this.$api.uploadFront,
        //     param: temp,
        //     postType: 'file'
        //   }).then(res => {
        //     let user = this.$common.getUserInfoFMLocal()
        //     user = Object.assign(user, {
        //       ownIdcardFacade: res.data.url
        //     })
        //     this.$common.setUserInfo2Local(user)
        //     this.$toast(`上传成功`)
        //   }, err => {
        //     this.$toast(`图片过大，上传失败`)
        //   })
        // } else {
        this.frontUrl = file.content
        let self = this
        if (/^image/.test(file.file.type)) {
          let reader = new FileReader()
          reader.readAsDataURL(file.file)
          reader.onloadend = function () {
            let result = this.result
            let img = new Image()
            img.src = result
            img.onload = function () {
              let data = self.compress(img)
              self.imgUrl = result
              let blob = self.dataURItoBlob(data)
              let formData = new FormData()
              formData.append("file", blob)
              self.$post({
                isLoading: true,
                url: self.$api.uploadFront,
                param: formData,
                postType: 'file'
              }).then(res => {
                let user = self.$common.getUserInfoFMLocal()
                user = Object.assign(user, {
                  ownIdcardFacade: res.data.url
                })
                self.$common.setUserInfo2Local(user)
                self.$toast(`上传成功`)
              }, err => {
                self.$toast(`图片过大，上传失败`)
              })
            }
          }
        }
        // }
      },
      onRead2(file) {
        // if (this.isIos) {
        //   this.behindUrl = file.content
        //   let temp = new FormData()
        //   temp.append('file', file.file, file.file.name)
        //   this.$post({
        //     isLoading: true,
        //     url: this.$api.uploadBehind,
        //     param: temp,
        //     postType: 'file'
        //   }).then(res => {
        //     let user = this.$common.getUserInfoFMLocal()
        //     user = Object.assign(user, {
        //       ownIdcardIdentity: res.data.url
        //     })
        //     this.$common.setUserInfo2Local(user)
        //     this.$toast(`上传成功`)
        //   }, err => {
        //     this.$toast(`图片过大，上传失败`)
        //   })
        // } else {
        this.behindUrl = file.content
        let self = this
        if (/^image/.test(file.file.type)) {
          let reader = new FileReader()
          reader.readAsDataURL(file.file)
          reader.onloadend = function () {
            let result = this.result
            let img = new Image()
            img.src = result
            img.onload = function () {
              let data = self.compress(img)
              self.imgUrl = result
              let blob = self.dataURItoBlob(data)
              let formData = new FormData()
              formData.append("file", blob)
              // self.behindUrl = file.content
              self.$post({
                isLoading: true,
                url: self.$api.uploadBehind,
                param: formData,
                postType: 'file'
              }).then(res => {
                let user = self.$common.getUserInfoFMLocal()
                user = Object.assign(user, {
                  ownIdcardIdentity: res.data.url
                })
                self.$common.setUserInfo2Local(user)
                self.$toast(`上传成功`)
              }, err => {
                self.$toast(`图片过大，上传失败`)
              })
            }
          }
          // }
        }
      },
      onRead3(file) {
        // if (this.isIos) {
        //   this.inHandUrl = file.content
        //   let temp = new FormData()
        //   temp.append('file', file.file, file.file.name)
        //   this.$post({
        //     isLoading: true,
        //     url: this.$api.uploadInHand,
        //     param: temp,
        //     postType: 'file'
        //   }).then(res => {
        //     let user = this.$common.getUserInfoFMLocal()
        //     user = Object.assign(user, {
        //       ownWithIdcardUrl: res.data.url
        //     })
        //     this.$common.setUserInfo2Local(user)
        //     this.$toast(`上传成功`)
        //   }, err => {
        //     this.$toast(`图片过大，上传失败`)
        //   })
        // } else {
        this.inHandUrl = file.content
        let self = this
        if (/^image/.test(file.file.type)) {
          let reader = new FileReader()
          reader.readAsDataURL(file.file)
          reader.onloadend = function () {
            let result = this.result
            let img = new Image()
            img.src = result
            img.onload = function () {
              let data = self.compress(img)
              self.imgUrl = result
              let blob = self.dataURItoBlob(data)
              let formData = new FormData()
              formData.append("file", blob)
              self.$post({
                isLoading: true,
                url: self.$api.uploadInHand,
                param: formData,
                postType: 'file'
              }).then(res => {
                let user = self.$common.getUserInfoFMLocal()
                user = Object.assign(user, {
                  ownWithIdcardUrl: res.data.url
                })
                self.$common.setUserInfo2Local(user)
                self.$toast(`上传成功`)
              }, err => {
                self.$toast(`图片过大，上传失败`)
              })
            }
          }
          // }
        }
      },
      submit() {
        if (this.frontUrl === this.idCardFront) {
          this.$toast(`请上传身份证正面照`)
          return
        } else if (this.behindUrl === this.idCardBehind) {
          this.$toast(`请上传身份证反面照`)
          return
        } else if (this.inHandUrl === this.idCardInHand) {
          this.$toast(`请上传手持身份证照`)
          return
        }
        this.$post({
          isLoading: true,
          url: this.$api.submit,
          param: this.$common.getUserInfoFMLocal(),
          postType: 'json'
        }).then(res => {
          if (res.data.R == 200) {
            this.$toast.loading(`提交中`)
            setTimeout(() => {
              this.$router.replace({name: 'Submit'})
            }, 3000)
          }
        }, err => {
          this.$toast(`网络状况不佳，请稍后再试`)
        })
      }
    }
  }
</script>
<style>
</style>
<style lang="scss" scoped>
  .info-confirm {
    background-color: #f6f6f6;
    .tip-top {
      width: 100%;
      background-color: #fff0e6;
      color: #ff8646;
      padding: 1rem 0.88rem;
      font-size: 1rem;
    }
    .tips {
      color: #666666;
      font-size: 0.88rem;
      line-height: 1.31rem;
      font-family: PingFangSC-Regular;
      letter-spacing: .01rem;
    }
    .content {
      padding: 1.5rem 3.6rem 0;
      border-bottom: 5rem #f6f6f6 solid;
      .img {
        width: 16.25rem;
        height: 10.25rem;
      }
    }
    .image-edit {
      width: 16.25rem;
      height: 10.25rem;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 0;
      border-radius: 0.63rem;
      img {
        width: 3.75rem;
      }
    }
    .icon-notice {
      width: 1rem;
      margin-right: 0.5rem;
    }
    .icon-arrow {
      position: absolute;
      right: .88rem;
    }
    .title {
      color: #333333;
      margin: 0.63rem 0 1.5rem 0;
    }
  }
</style>
