<template>
  <div class="ask-record">
    <div class="tip">只有待审核的申请才允许取消</div>
    <WithoutData v-if="!recordList.length" :tip="'还没有记录'"></WithoutData>
    <div class="record van-hairline--bottom" v-for="(item, index) in recordList" :key="index" @click="forDetail(item)">
      <p>
        <span class="name bold">{{item.patientName}}</span>
        <span v-if="item.sendType">{{` / ` + item.sendType}}</span>
        <span class="status" :class="{'examine': item.applicationState == '0'}">{{status[item.applicationState]}}</span>
      </p>
      <p class="ask-time">申请时间<span class="time">{{$date.formatDate(new Date(item.createTime.time))}}</span></p>
    </div>
  </div>
</template>

<script>
  import WithoutData from '@/components/WithoutData.vue'

  export default {
    name: 'AskRecord',
    components: {
      WithoutData
    },
    data() {
      return {
        recordList: [],
        status: ['待审核', '待支付', '待复印', '待投递', '待领取', '已审核', '已寄出', '已拒绝', '已取消']
      }
    },
    created() {
      this.getData()
    },
    methods: {
      forDetail(item) {
        this.$router.push({name: 'RecordDetail', params: {detail: JSON.stringify(item)}})
      },
      getData() {
        let user = this.$common.getUserInfoFMLocal()
        this.$post({
          url: this.$api.getAskRecord,
          param: {
            patientName: user.patientName,
            idCard: user.idCard
          },
          postType: 'json',
          isLoading: true
        }).then(res => {
          if (res.data.I === '成功') {
            this.recordList = res.data.list
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ask-record {
    background-color: #f6f6f6;
  }
  .tip {
    background-color: #fff0e6;
    text-align: center;
    width: 100%;
    padding: .56rem 0;
    color: #ff7b35;
    font-size: .88rem;
  }
  .record {
    height: 5rem;
    padding: 1rem .88rem;
    background-color: #fff;
    .name {
      font-size: 1.06rem;
      /*font-weight: 500;*/
    }
    .status {
      float: right;
      font-size: 0.94rem;
      color: #999;
      &.examine {
        color: #FF7B35;
      }
    }
    .ask-time {
      color: #999;
      font-size: 0.88rem;
      margin-top: .25rem;
      .time {
        margin-left: .5rem;
      }
    }
  }

</style>
