<template>
  <div class="add-address">
    <div class="input-area">
      <div class="field van-hairline--bottom">
        <span class="title">收件人</span>
        <input type="text" placeholder="请输入" v-model.trim="address.mandataryName"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">联系电话</span>
        <input type="tel" placeholder="请输入" maxlength="11" v-model.number="address.mandataryPhone"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">所在地区</span>
        <div class="choose" @click="isChooseShow = true" :class="{'color-333': address.sendAddress !== '请选择省市区'}">
          {{address.sendAddress}}
        </div>
        <i class="icon_enter"></i>
      </div>
      <div class="field ">
        <span class="title">详细地址</span>
        <textarea class="detail" type="text" maxlength="50" placeholder="请输入街道、楼牌号等详细信息"
                  v-model.trim="address.detailAddress"></textarea>
      </div>
    </div>
    <div class="text-align-center relative" style="top: 1.5rem;">
      <!--<button class="btn-save" :class="{'disable': !saveBtnAble}" @click="save">保存</button>-->
      <!--<button class="btn-delete" @click="" style="margin-top: .5rem">删除</button>-->
    </div>
    <div class="cover" v-show="isChooseShow" @click="isChooseShow = false"></div>
    <div style="margin-top: 4rem;margin-right: 1px"></div>
    <van-popup v-model="isChooseShow" position="bottom">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="isChooseShow = false"
                :class="{show: isChooseShow}"></van-area>

    </van-popup>
    <div v-if="type==0" class="foot">
      <van-button @click="deleteAddress" type="default" class="width100 font-size106" style="margin-right: .2rem">删除
      </van-button>
      <van-button :disabled="!saveBtnAble" class="blue-btn" style="margin-left: .2rem" @click="save">保存</van-button>
    </div>
    <div v-else class="foot">
      <van-button :disabled="!saveBtnAble" class="blue-btn" style="margin-left: .2rem" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
  import TopBar from '@/components/TopBar.vue'
  import areaList from '@/utils/address'
  import {Area} from 'vant'

  export default {
    name: 'AddAddress',
    components: {
      TopBar,
      VanArea: Area
    },
    data() {
      return {
        type: undefined, // 0 编辑 1 新增
        address: {
          sendAddress: '请选择省市区',
          detailAddress: '',
          mandataryName: '',
          mandataryPhone: '',
        },
        areaList: areaList,
        isChooseShow: false,
      }
    },
    computed: {
      saveBtnAble() {
        return this.address.mandataryName && this.address.mandataryPhone && this.address.sendAddress !== '请选择省市区' && this.address.detailAddress
      }
    },
    created() {
      console.log(this.$route)
      let user = this.$common.getUserInfoFMLocal()
      let type = this.$route.query.type // 0 编辑 1 新增
      this.type = type
      if (type === 0) {
        this.address = JSON.parse(this.$route.params.address)
      }
      this.address = Object.assign(this.address, {
        patientName: user.patientName,
        idCard: user.idCard,
      })
    },
    methods: {
      confirm(data) {
        let province = data[0].name
        let sendAddress = ''
        if (['北京市', '天津市', '重庆市', '上海市'].indexOf(province) > -1) {
          sendAddress = data[0].name + data[2].name
        } else {
          sendAddress = data[0].name + data[1].name + data[2].name
        }
        this.address = Object.assign({}, this.address, {
          // province: data[0].name,
          // city: data[1].name,
          // district: data[2].name,
          sendAddress: sendAddress
        })
        this.isChooseShow = false
      },
      save() {
        // this.address.detailAddress.trim()
        if (!this.saveBtnAble) {
          return
        } else if (this.address.mandataryName.length === 0 || this.address.mandataryName.length > 20) {
          this.$toast('请输入20位以下姓名')
          return
        } else if (!this.$validate.isMobile(this.address.mandataryPhone)) {
          this.$toast('手机号格式错误')
          return
        } else if (this.address.sendAddress === '请选择省市区') {
          this.$toast('请选择所在地区')
          return
        } else if (!this.address.detailAddress) {
          this.$toast('请输入详细地址')
          return
        }
        if (this.type == 0) {
          console.log('updateAddress')
          this.updateAddress()
        } else if (this.type == 1) {
          console.log('addAddress')
          this.addAddress()
        }
      },
      updateAddress() {
        console.log(this.address)
        this.$post({
          url: this.$api.updateAddress,
          param: {
            id: this.address.id,
            idCard: this.address.idCard,
            patientName: this.address.patientName,
            sendAddress: this.address.sendAddress,
            detailAddress: this.address.detailAddress,
            mandataryName: this.address.mandataryName,
            mandataryPhone: this.address.mandataryPhone,
          },
          postType: 'json',
          isLoading: true
        }).then(res => {
          if (res.data.I === '成功') {
            this.$router.go(-1)
          } else {
            this.$toast.fail(res.data.I)
          }
        })
      },
      addAddress() {
        console.log(this.address)
        this.$post({
          url: this.$api.addAddress,
          param: this.address,
          postType: 'json',
          isLoading: true
        }).then(res => {
          this.$router.go(-1)
        })
      },
      deleteAddress() {
        this.$post({
          url: this.$api.deleteAddress,
          param: {
            id: this.address.id
          },
          postType: 'json'
        }).then(res => {
          this.$toast(`删除成功`)
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .add-address {
    position: relative;
    background-color: #f6f6f6;
    height: 100%;
    /*overflow: hidden;*/
  }

  .input-area {
    padding-left: .88rem;
    background-color: #fff;
  }

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
  }

  .icon_enter {
    display: inline-block;
    height: 1rem;
    width: 1rem;
    background-image: url('../../assets/images/icon_enter.png');
    -webkit-background-size: 1rem 1rem;
    background-size: 1rem 1rem;
  }

  .title {
    width: 5.31rem;
    text-align: left;
    color: #999;
  }

  .choose {
    color: #ddd;
    flex-grow: 1;
    text-align: left;
    &.color-333 {
      color: #333;
    }
  }

  .detail {
    height: 2.75rem;
    flex-grow: 1;
  }

  .cover {
    position: absolute;
    top: 0;
    width: 100%;
    /*background-color: rgba(0,0,0,.2);*/
    height: calc(100% - 16rem);
  }

  .btn-delete {
    height: 2.88rem;
    width: 89.3%;
    color: #fff;
    background-color: #dd7c5a;
    border-radius: .25rem;
  }

  .btn-save {
    /*position: fixed;*/
    /*bottom:2.5rem;*/
    /*left: 5.35%;*/
    height: 2.88rem;
    width: 89.3%;
    color: #fff;
    background-color: #1C97FC;
    &.disable {
      background-color: #B4D9F8;
    }
    border-radius: .25rem;
  }

  .choose-area {
    position: absolute;
    width: 100%;
    height: 16rem;
    left: 0;
    bottom: 0;
    transition: all .3s;
    transform: translateY(16rem);
    &.show {
      transform: translateY(0);
    }
  }
</style>
