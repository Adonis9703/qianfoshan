<template>
  <div class="trans-type">
    <div class="panel bgcolor-white">
      <div class="title">配送方式：邮寄</div>
      <p>为能及时收到复印病历，请确保收件地址填写无误</p>
    </div>
    <img :src="border" style="display: block; width: 100%"/>
    <div class="form-content bgcolor-white">
      <div class="title">
        收件人地址
      </div>
      <div @click="$router.push({name: 'SelectAddress'})" class="value flex-align">默认地址
        <van-icon name="arrow" class="translate"></van-icon>
      </div>
      <div style="clear: both;"></div>
    </div>
    <div class="address-select bgcolor-white">
      <div class="field van-hairline--bottom">
        <span class="title">收件人</span>
        <input type="text" placeholder="请输入" v-model.trim="address.mandataryName"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">联系电话</span>
        <input type="text" placeholder="请输入" maxlength="11" v-model.number="address.mandataryPhone"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">所在地区</span>
        <div class="choose" @click="isChooseShow=true" :class="{'color-333': address.sendAddress !== '请选择省市区'}">
          {{address.sendAddress}}
        </div>
      </div>
      <div class="field ">
        <span class="title">详细地址</span>
        <textarea class="detail" type="text" maxlength="50" placeholder="请输入街道、楼牌号等详细信息" v-model.trim="address.detailAddress"></textarea>
      </div>
    </div>
    <div class="foot">
      <van-button class="blue-btn" @click="nextStep">下一步</van-button>
    </div>
    <van-popup v-model="isChooseShow" position="bottom">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="isChooseShow = false"
                :class="{show: isChooseShow}"></van-area>

    </van-popup>
    <!--<van-area class="fixed-bottom" v-if="isShowPicker" :area-list="areaList" value="110101" @confirm="selectAddress"/>-->
  </div>
</template>

<script>
  import border from '@/assets/images/border-bottom.png'
  import areaList from '@/utils/address'
  import address from '@/pages/addressManage/AddAddress'

  export default {
    components: {
      AddAddress: address
    },
    name: "test",
    data() {
      return {
        user: {},
        address: {
          sendAddress: '请选择省市区',
          detailAddress: '',
          mandataryName: '',
          mandataryPhone: '',
        },
        areaList: areaList,
        isChooseShow: false,
        border,
        active: 0,
      }
    },
    created() {
      localStorage.setItem('active', '1')
      this.user = this.$common.getUserInfoFMLocal()
      if (this.$route.params.address) {
        let temp = JSON.parse(this.$route.params.address)
        // this.address = Object.assign({}, this.address, temp)
        this.address.sendAddress = temp.sendAddress
        this.address.detailAddress = temp.detailAddress
        this.address.mandataryName = temp.mandataryName
        this.address.mandataryPhone = temp.mandataryPhone
      } else {
        this.getAddressList()
      }
    },
    methods: {
      confirm(data) {
        console.log(data)
        let province = data[0].name
        let sendAddress = ''
        if (['北京市', '天津市', '重庆市', '上海市'].indexOf(province) > -1) {
          sendAddress = data[0].name + data[2].name
        } else {
          sendAddress = data[0].name + data[1].name + data[2].name
        }
        this.address = Object.assign({}, this.address, {
          sendAddress: sendAddress
        })
        this.isChooseShow = false
      },
      getAddressList() {
        this.$post({
          isLoading: true,
          url: this.$api.getAddress,
          param: {
            patientName: this.user.patientName,
            idCard: this.user.idCard
          },
          postType: 'json',
        }).then(res => {
          if (res.data.list) {
            for (let item of res.data.list) {
              if (item.state == 1) {
                this.address.sendAddress = item.sendAddress
                this.address.detailAddress = item.detailAddress
                this.address.mandataryName = item.mandataryName
                this.address.mandataryPhone = item.mandataryPhone
                break
              }
            }
          }
        })
      },
      nextStep() {
        this.user = this.$common.getUserInfoFMLocal()
        if (!this.$validate.isMobile(this.address.mandataryPhone)) {
          this.$toast(`手机号格式错误`)
          return
        } else if (!this.address.detailAddress) {
          this.$toast(`请输入详细地址`)
        } else if (!this.address.mandataryName) {
          this.$toast(`请填写姓名`)
        } else if (!this.address.sendAddress) {
          this.$toast(`请选择所在地区`)
        } else {
          console.log(this.address)
          this.user = Object.assign(this.user, this.address)
          this.$common.setUserInfo2Local(this.user)
          // console.log(this.user)
          this.$router.push({name: 'CopyContent'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trans-type {
    background-color: #f6f6f6;
    .field {
      display: flex;
      /*align-items: baseline;*/
      align-items: center;
      padding-right: .88rem;
      min-height: 3.31rem;
      &:last-child {
        height: 4.75rem;
        align-items: baseline;
        padding-top: 1rem;
      }
      input {
        min-height: 3.31rem;
        flex-grow: 1;
      }
      .title {
        width: 5.31rem;
        text-align: left;
        color: #999;
      }
      .detail {
        height: 2.75rem;
        flex-grow: 1;
      }

    }

    .address-select {
      padding: 0 0.88rem;
    }

    .fixed-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    .label {
      font-size: 1rem;
      color: #999999;
      line-height: 1.38rem;
    }

    .form-content {
      border-top: 0.5rem #f6f6f6 solid;
      border-bottom: 0.01rem #f6f6f6 solid;
      padding: 0 0.88rem;
      line-height: 2.75rem;
      .title {
        color: #333333;
        font-size: 0.94rem;
        float: left;
      }
      .value {
        float: right;
        color: #1c97fc;
        font-size: 0.88rem;
      }
    }

    .translate {
      position: relative;
      top: 0.1rem;
    }

    .translate3 {
      position: relative;
      top: 0.3rem;
    }

    .van-cell {
      /*padding: 0.9rem 15px;*/
      line-height: 2rem;
    }

    .van-cell__title {
      color: #999999;
    }

    .van-cell__value {
      color: #1c97fc;
    }

    .panel {
      height: 5.81rem;
      padding: 1.38rem 0.88rem;
      .title {
        font-size: 1rem;
        color: #333333;
        line-height: 1.38rem;
      }
      p {
        margin-top: 0.5rem;
        font-size: 0.88rem;
        color: #999999;
      }
    }
  }


</style>
