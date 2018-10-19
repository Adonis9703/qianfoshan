<template>
  <div class="select-address">
    <without-data :tip="'还没添加过地址'" v-if="!addressList.length"></without-data>
    <article class="address" v-for="(item, index) in addressList" :key="index">
      <div class="main" @click="$router.push({name: 'TransType', params: {address: JSON.stringify(item)}})">
        <div class="inf">
          <p class="detail">{{item.detailAddress}}</p>
          <p class="receiver-inf"><span class="name">{{item.mandataryName}}</span>{{item.mandataryPhone}}</p>
        </div>
        <i class="icon-edit"
           @click.stop="$router.push({name: 'AddAddress',query: {type: 0} ,params: {address: JSON.stringify(item)}})"></i>
      </div>
      <div class="change-default" :class="{'color-blue': item.state==1}" @click="setDefaultAddress(item)">
        <van-checkbox class="ck-box" name="isDefault" v-model="item.state === '1'">
        </van-checkbox>
        <span v-if="item.state==1">默认地址</span>
        <span v-else>设为默认</span>
      </div>
    </article>
    <div class="bottom">
      <button class="btn-add" @click="$router.push({name: 'AddAddress', query: {type: 1}})"><i
        class="icon-add"></i>添加新地址
      </button>
    </div>

  </div>
</template>

<script>
  import {Checkbox} from 'vant'
  import WithoutData from '@/components/WithoutData.vue'

  export default {
    name: 'SelectAddress',
    components: {
      VanCheckbox: Checkbox,
      WithoutData: WithoutData
    },
    data() {
      return {
        // withoutData,
        addressList: [],
        user: {}
      }
    },
    created() {
      console.log('get data')
      this.user = this.$common.getUserInfoFMLocal()
      this.getList()
    },
    methods: {
      setDefaultAddress(item) {
        if (item.state === '0') {
          this.$post({
            url: this.$api.setDefaultAddress,
            postType: 'json',
            param: {
              id: item.id,
              patientName: this.user.patientName,
              idCard: this.user.idCard
            }
          }).then(res => {
            console.log(res)
            this.getList()
          })
        }
      },
      getList() {
        this.$post({
          url: this.$api.getAddress,
          postType: 'json',
          isLoading: true,
          param: {
            patientName: this.user.patientName,
            idCard: this.user.idCard
          }
        }).then(res => {
          if (res.data.I === '暂无记录') {
            this.addressList = []
          } else {
            this.addressList = res.data.list
          }

        })
      },
      deleteAddress(item) {
        this.$post({
          url: this.$api.deleteAddress,
          postType: 'json',
          param: {
            id: item.id
          }
        }).then(res => {
          console.log(res)
          getList()
        })
      }
    }
  }
</script>
<style lang="scss">
  .select-address {
    .van-checkbox__icon--checked .van-icon {
      border-color: #1C97FC;
      background-color: #1C97FC;
    }

    .van-checkbox__icon .van-icon {
      height: 1rem;
      width: 1rem;
      margin-right: .5rem;
      font-size: .6rem;
    }

    .van-checkbox__icon, .van-checkbox__label {
      line-height: 1rem;
    }
  }
</style>

<style lang="scss" scoped>
  @mixin icon($width, $url) {
    display: inline-block;
    height: $width;
    width: $width;
    background-image: url($url);
    -webkit-background-size: $width $width;
    background-size: $width $width;
  }

  .color-blue {
    color: #1C97FC !important;
  }

  .select-address {
    background-color: #f6f6f6;
    padding-bottom: 5rem;
  }

  .address {
    height: 7.5rem;
    width: 100%;
    background-color: #fff;
    margin-top: .5rem;
  }

  .main {
    position: relative;
    overflow: hidden;
    padding: 1rem .88rem;
    .inf {
      float: left;
      max-width: 18.81rem;
    }
    .icon-edit {
      @include icon(1.38rem, '../../assets/images/icon_edit.png');
      position: relative;
      float: right;
      top: .94rem;
    }
  }

  .detail {
    font-weight: 500;
    margin-bottom: .25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .receiver-inf {
    font-size: .88rem;
    color: #666;
    .name {
      margin-right: .75rem;
    }
  }

  .change-default {
    padding: .75rem .88rem;
    display: flex;
    flex-align: center;
    color: #666;
    font-size: .75rem;
    height: 2.59rem;
    border-top: 1px #E2E2E2 dashed;
  }

  .btn-add {
    position: relative;
    height: 2.88rem;
    width: 89.3%;
    left: 5.35%;
    margin: 0 auto;
    color: #fff;
    background-color: #1C97FC;
    border-radius: .25rem;
    .icon-add {
      @include icon(1.13rem, '../../assets/images/icon_add.png');
      margin-right: .63rem;
      transform: translateY(.2rem);
    }
  }

  .bottom {
    position: absolute;
    border-top: 1px solid #e2e2e2;
    bottom: 0;
    height: 3.81rem;
    width: 100%;
    padding: .5rem 0;
    background-color: #fff;
  }
</style>
