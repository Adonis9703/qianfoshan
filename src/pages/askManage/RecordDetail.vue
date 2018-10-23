<template>
  <div class="record-detail">
    <div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '0'">
        <div class="green">待审核</div>
        <img :src="standby" class="inline-block"/>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '1'">
        <div class="green">待支付</div>
        <img :src="passed" class="inline-block"/>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '2'">
        <div class="green">待复印</div>
        <img :src="passed" class="inline-block"/>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '3'">
        <div class="green">待投递</div>
        <img :src="delivered" class="inline-block"/>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '4'">
        <div class="green">待领取</div>
        <img :src="standby" class="inline-block"/>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '5'">
        <div class="green">已审核</div>
        <img :src="passed" class="inline-block"/>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '6'">
        <div class="green">已寄出</div>
        <img :src="delivered" class="inline-block"/>
      </div>
      <div class="state " v-if="record.applicationState == '7'">
        <div class="flex-align-spacebetween">
        <div class="red">已拒绝</div>
        <img :src="refused" class="inline-block"/>
        </div>
        <span class="reason">{{record.refuseReason}}</span>
      </div>
      <div class="state flex-align-spacebetween" v-if="record.applicationState == '8'">
        <div class="red">已取消</div>
        <img :src="refused" class="inline-block"/>
      </div>
      <div style="clear: both;"></div>
      <div class="address">
        <p class="detail">{{record.sendAddress}}</p>
        <p class="detail" style="margin-top: .3rem">{{record.detailAddress}}</p>
        <p class="user-inf">
          <span class="margin-right1">{{record.mandataryName}}</span>{{record.mandataryPhone}}
        </p>
      </div>
      <div class="ask-inf">
        <div class="title van-hairline--bottom">
          <i class="icon-message"></i>申请信息
        </div>
        <div class="content">
          <div class="item">患者姓名 <span class="inf">{{record.patientName}}</span></div>
          <div class="item">住院号<span class="inf">{{record.hosNumber}}</span></div>
        </div>
      </div>
      <div class="copy-content">
        <div class="title van-hairline--bottom">
          <i class="icon-message"></i>复印内容
        </div>
        <div class="content">
          <div class="item" v-for="(item, index) in record.content" :key="index">
            {{item.title}} <span>x{{item.count}}</span>
          </div>
          <div class="price">
            <span class="tip">快递费由快递公司按标准收取</span>
            <p>复印费<span class="count">￥{{record.totalFee}}</span></p>
          </div>
        </div>
      </div>
      <div class="express">
        <p class="item">申请时间：{{$date.formatDate(new Date(record.createTime.time), 'yyyy-MM-dd hh:mm:ss')}}</p>
        <p class="item">配送方式：{{record.sendType !== null ? record.sendType : '暂无'}}</p>
        <p class="item">物流单号：{{record.logisticsNumber !== null ? record.logisticsNumber : '暂无'}}
          <input id="expressNum" ref="expressNum" type="text" v-model="record.logisticsNumber" class="copy-input"/>
          <button class="btn-copy" :data-clipboard-text="record.logisticsNumber" @click="copy">复制</button>
        </p>
      </div>
    </div>
    <div v-if="record.applicationState == '0'" class="foot">
      <div @click="cancel" class="btn">取消申请</div>
    </div>
  </div>
</template>

<script>
  import imgRefuse from '@/assets/images/icon_failed.png'
  import refused from '@/assets/images/refused.png'
  import passed from '@/assets/images/passed.png'
  import delivered from '@/assets/images/delivered.png'
  import standby from '@/assets/images/standby.png'
  import Clipboard from 'clipboard'

  export default {
    name: 'RecordDetail',
    data() {
      return {
        imgRefuse,
        refused,
        passed,
        delivered,
        standby,
        record: {}
      }
    },
    created() {
      let record = JSON.parse(this.$route.params.detail)
      let content = record.copyContent.split(',').map(item => {
        let num = item.match(/\d+/g)[0]
        if (num) {
          return {
            title: item.replace(num, ''),
            count: num
          }
        }
      })
      for (let item of content) {
        item.title = item.title.substring(0, 2)
      }
      record.content = content
      this.record = record
    },
    methods: {
      copy() {
        if (this.record.logisticsNumber=='无' || !this.record.logisticsNumber) {
          this.$toast(`暂无物流单号`)
          return
        } else {
          let clipboard = new Clipboard('.btn-copy')
          clipboard.on('success', e => {
            this.$toast(`复制成功`)
            clipboard.destroy()
          })
        }
      },
      cancel() {
        this.$post({
          url: this.$api.cancelApplication,
          param: {
            idCard: this.$common.getUserInfoFMLocal().idCard,
            id: JSON.parse(this.$route.params.detail).id
          },
          postType: 'json',
        }).then(res => {
          this.$toast.success(`取消成功`)
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
  .reason {
    /*float: left;*/
    display: inline-block;
    width: 10rem;
    position:relative;
    top: -2rem;
    color: #888888;
    font-size: .81rem;

  }
  .foot {
    position: fixed;
    bottom: 0;
    text-align: center;
    background-color: white;
    padding: .5rem 1.25rem;
    color: #333333;
    font-size: 1.06rem;
    .btn {
      padding: .69rem 0;
      text-align: center;
      width: 100%;
      border-radius: .25rem;
      border: #cdcdcd solid .06rem;
    }
  }

  .state {
    padding-right: 1.25rem;
    padding-left: 3.75rem;
    margin-bottom: .5rem;
    background-color: #fff;
    /*height: 6.25rem;*/
    font-size: 1.13rem;
    img {
      height: 6.25rem;
    }
    .green {
      color: #32ae57;
    }
    .red {
      color: #f6424b;
    }
  }

  .record-detail {
    background-color: #f6f6f6;
    color: #333;
    padding-bottom: 4.5rem;
  }

  .margin-right1 {
    margin-right: 1rem;
  }

  .address {
    padding: 1.25rem .88rem;
    background-size: 100% .19rem;
    background: #fff url('../../assets/images/border-bottom.png') no-repeat 100% 100%;
    letter-spacing: 0.01rem;
    .detail {
      font-weight: 500;
    }
  }

  .user-inf {
    font-size: .88rem;
    color: #666;
    margin-top: .5rem;
  }

  .ask-inf {
    padding-left: .88rem;
    background-color: #fff;
    margin-top: .5rem;
    .content {
      padding: 1rem .88rem 1rem 0;
    }
    .item {
      display: flex;
      justify-content: space-between;
      color: #666;
      &:first-child {
        margin-bottom: .63rem;
      }
      .inf {
        color: #333;
      }
    }
  }

  .copy-content {
    margin-top: .5rem;
    padding-left: .88rem;
    background-color: #fff;
    .content {
      font-size: 0.88rem;
      padding: 1rem .88rem 0 0;
    }
    .item {
      display: flex;
      justify-content: space-between;
      color: #333;
      margin-bottom: .63rem;
    }
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px #e2e2e2 dashed;
      padding: .65rem 0;
      .tip {
        font-size: .75rem;
        color: #999;
      }
      .count {
        color: #FF7B35;
        font-size: 1rem;
        margin-left: .18rem;
      }
    }
  }

  .express {
    background: #FCFCFC;
    margin-top: .5rem;
    color: #999;
    font-size: 0.88rem;
    padding: .75rem .88rem;
    .btn-copy {
      border: 1px solid #CDCDCD;
      border-radius: 4px;
      font-size: .75rem;
      float: right;

    }
    .item {
      margin-bottom: .2rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .title {
    height: 2.5rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 1.38rem;
    font-weight: 600;
    background-color: #fff;
    .icon-message {
      display: inline-block;
      height: 1.25rem;
      width: 1.25rem;
      background-image: url('../../assets/images/icon_message.png');
      background-size: 100% 100%;
      margin-right: .69rem;
    }
  }

  .copy-input {
    display: none;
  }

</style>
