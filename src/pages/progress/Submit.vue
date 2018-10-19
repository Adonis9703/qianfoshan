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
  </div>
</template>

<script>
  import success from '@/assets/images/success.png'

  export default {
    name: "Submit",
    data() {
      return {
        success
      }
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
</style>
