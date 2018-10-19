<template>
  <div>
    <div class="top-card">
      <div class="content">
        <div class="title">
          邮寄报告单
        </div>
        <div class="intro">
          “在线病案邮寄服务”是由山东省千佛山医院推出的一项全新的便民服务，您可以在线申请、物流查询，便捷获取打印病案。
        </div>
      </div>
    </div>
    <div class="index">
      <div v-for="(item, index) of QAContent" :key="index">
        <div class="circle"></div>
        <div class="count">{{index+1}}</div>
        <span class="question">{{item.q}}</span>
        <p class="answer">{{item.a}}</p>
      </div>
    </div>
    <div class="foot">
      <van-button class="blue-btn" @click="goProgress">已阅读，同意</van-button>
    </div>
  </div>
</template>

<script>
  import img_notice from '@/assets/images/img_notice.png'

  export default {
    name: 'Index',
    created() {
    },
    data() {
      return {
        img_notice,
        QAContent: [
          {
            q: '订单处理时间？',
            a: '随时申请，无论在住院期间、出院后都可以进行申请。工作人员会在患者出院后十五个工作日内寄出。'
          },
          {
            q: '订单可否修改？',
            a: '订单生成后不可修改订单信息，订单审核之前可以取消订单。'
          },
          {
            q: '订单填写要求？',
            a: '请按要求完成患者信息、打印内容、地址填写，以便完成资料验证，订单生成后不可修改订单信息。'
          },
          {
            q: '是否需要服务费用？',
            a: '本服务不收取手续费及服务费，用户仅需收货时支付快递费用以及复印费用。目前仅支持顺丰速运，费用以顺丰市场价为标准，如有价格疑问请咨询顺丰客服热线0531-88913937。'
          }
        ]
      }
    },
    methods: {
      goProgress() {
        this.$router.push({name: 'FillInfo'})
        // console.log(`gogogogogo`)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index {
    padding: 0.70rem 1.56rem;
    margin-bottom: 3rem;
  }

  .top-card {
    color: #FFFFFF;
    background: url(".././assets/images/img_notice.png") no-repeat;
    display: block;
    width: 100%;
    height: 10.55rem;
    background-size: 100% 100%;
    .content {
      padding-top: 1.9rem;
      padding-left: 2.13rem;
    }
    .title {
      /*font-family: PingFang-SC-Medium;*/
      font-size: 1.25rem;
      line-height: 1.75rem;
      letter-spacing: 0.08rem;
      /*font-weight: bolder;*/
    }
    .intro {
      margin-top: 0.5rem;
      font-family: 'PingFangSC-Regular', serif;
      width: 11.88rem;
      line-height: 1.13rem;
      font-size: 0.81rem;
      letter-spacing: 0.01rem;
    }
  }

  .question {
    line-height: 1.56rem;
    color: #333333;
    font-weight: bolder;
    font-size: 1.13rem;
    letter-spacing: 0.2rem;
  }

  .answer {
    margin-top: 0.65rem;
    margin-bottom: 1.3rem;
    padding-left: 2.65rem;
    font-size: 0.88rem;
    color: #666666;
    line-height: 1.56rem;
  }

  .circle {
    display: inline-block;
    background-color: #63AFFF;
    border-radius: 50%;
    width: 1.19rem;
    height: 1.19rem;
  }

  .count {
    font-size: 1.60rem;
    position: relative;
    left: -1rem;
    top: 0.4rem;
    display: inline-block;
    font-weight: bold;
  }

</style>
