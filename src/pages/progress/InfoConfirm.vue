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

      <!--<input type="file" ref="takePicture3" accept="image/*" capture="camera" style="display: none">-->
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
      }
    },
    created() {
      localStorage.setItem('active', '3')
    },
    methods: {
      onRead1(file) {
        this.frontUrl = file.content
        let temp = new FormData()
        temp.append('file', file.file, file.file.name)
        this.$post({
          isLoading: true,
          url: this.$api.uploadFront,
          param: temp,
          postType: 'file'
        }).then(res => {
          let user = this.$common.getUserInfoFMLocal()
          user = Object.assign(user, {
            ownIdcardFacade: res.data.url
          })
          this.$common.setUserInfo2Local(user)
        })
      },
      onRead2(file) {
        this.behindUrl = file.content
        let temp = new FormData()
        temp.append('file', file.file, file.file.name)
        this.$post({
          isLoading: true,
          url: this.$api.uploadBehind,
          param: temp,
          postType: 'file'
        }).then(res => {
          let user = this.$common.getUserInfoFMLocal()
          user = Object.assign(user, {
            ownIdcardIdentity: res.data.url
          })
          this.$common.setUserInfo2Local(user)
        })
      },
      onRead3(file) {
        this.inHandUrl = file.content
        let temp = new FormData()
        temp.append('file', file.file, file.file.name)
        this.$post({
          isLoading: true,
          url: this.$api.uploadInHand,
          param: temp,
          postType: 'file'
        }).then(res => {
          let user = this.$common.getUserInfoFMLocal()
          user = Object.assign(user, {
            ownWithIdcardUrl: res.data.url
          })
          this.$common.setUserInfo2Local(user)
        })
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
            },3000)
          }
          console.log(`提交申请 ===> `, res)
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
