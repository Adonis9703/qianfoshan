<template>
  <div id="app">
    <div class="top-bar van-hairline--bottom">
      <img class="back" :src="IconBack" @click="back"/> {{title}}
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="page"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="page"/>
  </div>
</template>

<script>
  import IconBack from '@/assets/images/icon_back.png'

  export default {
    name: 'App',
    data() {
      return {
        IconBack,
        title: '病历邮寄申请',
        active: 0,
        list: ['信息填写', '配送方式', '复印内容', '资料验证']
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      scroll() {
        window.addEventListener("resize", () => {
          if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(() => {
              document.activeElement.scrollIntoViewIfNeeded()
            }, 0)
          }
        })

        let scrollView = document.getElementsByTagName("input")

      }
    },
    created() {
      this.active = Number(localStorage.getItem('active'))
      this.scroll()
      // let fontSize = (window.screen.width / 375) * 16;
      // document.documentElement.style.fontSize = fontSize + 'px';
    },
    watch: {
      '$route'(to, from) {
        let list = ['FillInfo', 'TransType', 'CopyContent', 'InfoConfirm']
        this.active = list.indexOf(to.name) || Number(localStorage.getItem('active'))
        let titles = {
          Index: '病历邮寄申请',
          AddAddress: '添加收货地址',
          Progress: '病历邮寄申请',
          FillInfo: '病历邮寄申请',
          TransType: '病历邮寄申请',
          SelectAddress: '选择收货地址',
          AskRecord: '申请记录',
          RecordDetail: '申请记录详情',
          Submit: '申请结果'
        }
        this.title = titles[to.name] || '病历邮寄申请'
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'PingFangSC-Regular', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #333;*/
    padding-top: 2.75rem;
    height: 100%;
  }

  .top-bar {
    position: absolute;
    top: 0;
    height: 2.75rem;
    width: 100%;
    font-size: 1.13rem;
    text-align: center;
    line-height: 2.75rem;
    font-weight: 600;
  }

  .back {
    display: inline-block;
    position: absolute;
    top: 50%;
    margin-top: -.69rem;
    left: .5rem;
    height: 1.38rem;
    width: 1.38rem;
  }

  .page {
    height: 100%;
    overflow: auto;
  }

  .van-steps {
    background-color: #f6f6f6;
  }

  .van-step--horizontal .van-step__circle-container {
    background-color: #f6f6f6;
  }
</style>
