<template>
  <div style="background-color: #f6f6f6">
    <div class="panel text-align-center ">
      <div class="flex-align-justify">
        <img :src="success" style="height: 1.63rem;margin-right: .75rem">
        <div class="green">申请提交成功</div>
      </div>

      <div class="tip">
        病历将在出院15个工作日内处理，请注意查看
      </div>
    </div>
    <div class="address" style="margin-top: .5rem">
      <p class="detail">{{submitInfo.sendAddress}}</p>
      <p class="detail" style="margin-top: .3rem">{{submitInfo.detailAddress}}</p>
      <p class="user-inf">
        <span class="margin-right1">{{submitInfo.mandataryName}}</span>{{submitInfo.mandataryPhone}}
      </p>
    </div>
    <div class="ask-inf">
      <div class="title van-hairline--bottom">
        <i class="icon-message"></i>申请信息
      </div>
      <div class="content">
        <div class="item">患者姓名 <span class="inf">{{submitInfo.patientName}}</span></div>
        <div class="item">住院号<span class="inf">{{submitInfo.hosNumber}}</span></div>
      </div>
    </div>
    <div class="copy-content">
      <div class="title van-hairline--bottom">
        <i class="icon-message"></i>复印内容
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in submitInfo.content" :key="index">
          {{item.title}} <span>x{{item.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import success from '@/assets/images/success.png'

  export default {
    name: "Submit",
    data() {
      return {
        success,
        submitInfo: {}
      }
    },
    mounted() {
      // this.submitInfo =JSON.parse(localStorage.getItem('userInfo'))
      // console.log(this.submitInfo)

      let record = JSON.parse(localStorage.getItem('userInfo'))
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
      this.submitInfo = record
    }
  }
</script>

<style lang="scss" scoped>
  .panel {
    height: 6rem;
    width: 100%;
    background-color: white;
    padding-top: 1.31rem;
    padding-bottom: 1.25rem;
    .green {
      color: #2fb727;
      font-size: 1.06rem;
    }
    .tip {
      color: #888888;
      font-size: .81rem;
      margin-top: .81rem;
    }
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

  .copy-content {
    margin-top: .5rem;
    padding-left: .88rem;
    background-color: #fff;
    padding-bottom: .5rem;
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
</style>
