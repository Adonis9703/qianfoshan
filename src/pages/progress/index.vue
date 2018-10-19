<template>
  <div >
    <div class="steps">
      <span v-for="(item, index) in list" :key="index" class="step"
            :class="{ 'step-checked': index <=active }">{{item}}</span>
      <div class="lines flex-align-justify">
        <div class="flex-align-justify" v-for="(item, index) in list.length" :key="index">
          <div class="line inline-block" v-if="index !== 0" :class="{'line-checked': index <= active}"></div>
          <i class="circle" :class="{'circle-checked': index === active, 'circle-ing': index <= active}"></i>
          <div class="line inline-block" v-if="index !== list.length - 1"
               :class="{'line-checked': index <= active}"></div>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view class="height100"/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        active: 0,
        list: ['信息填写', '配送方式', '复印内容', '资料验证']
      }
    },
    created() {
      this.active = Number(localStorage.getItem('active'))
    },
    watch: {
      '$route'(to) {
        let list = ['FillInfo', 'TransType', 'CopyContent', 'InfoConfirm']
        this.active = list.indexOf(to.name) || Number(localStorage.getItem('active'))
      }
    }
  }
</script>

<style lang="scss" scoped>

  .van-steps {
    background-color: #f6f6f6;
  }

  .van-step--horizontal .van-step__circle-container {
    background-color: #f6f6f6;
  }

  .steps {
    /*position: fixed;*/
    width: 100%;
    /*top: 2.75rem;*/
    z-index: 2000;
    // font-family: PingFangSC-Regular;
    color: #333333;
    font-size: 0.88rem;
    padding: 0.75rem 0 .05rem 0;
    text-align: center;
    background-color: #f6f6f6;
    letter-spacing: 0.01rem;
  }

  .step {
    /*float: left;*/
    display: inline-block;
    margin: 0 1rem;
    color: #999999;
  }

  .step-checked {
    color: #333333;
  }

  .circle {
    width: 0.38rem;
    height: 0.38rem;
    background-color: #E2E2E2;
    border-radius: 50%;
  }

  .circle-ing {
    width: 0.38rem;
    height: 0.38rem;
    background-color: #00C07C;
    border-radius: 50%;
  }

  .circle-checked {
    width: 0.88rem;
    height: 0.88rem;
    background-color: #00C07C;
    border: #d1eee4 0.2rem solid;
    border-radius: 50%;
  }

  .lines {
    margin: .44rem 0 1rem;
  }

  .line {
    background-color: #E2E2E2;
    width: 2.81rem;
    height: 1px;
  }

  .line-checked {
    background-color: #00c07c;
  }
</style>
