<template>
  <div class="copy-content">
    <section class="tips">
      <header class="title">提示</header>
      <p>打印内容以详情为准，如需添加其他病案打印内容请在备注上注明。</p>
      <article class="tip" v-for="(item, index) in tipList" :key="index">
        <header>{{index+1}}、{{item.title}}</header>
        {{item.content}}
      </article>
    </section>
    <section>
      <article class="material van-hairline--bottom" v-for="(item, index) in materialList" :key="index">
        <div class="flex-align" style="padding: 1px 0">
          <van-checkbox class="checkbox" v-model="item.isChecked">
            {{item.title}}
          </van-checkbox>
          <van-stepper class="stepper" v-model="item.count" :min="0" :max="99"/>
        </div>
        <p class="tip">{{item.tip}}</p>
      </article>
    </section>
    <div class="remarks flex-align">
      备注<input type="text" v-model="copyRemark" placeholder="选填"/>
    </div>
    <div class="foot">
      <van-button class="blue-btn" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<script>
  import {Checkbox, Stepper, Popup} from 'vant'

  export default {
    name: 'CopyContent',
    components: {
      VanCheckbox: Checkbox,
      VanStepper: Stepper,
      VanPopup: Popup
    },
    data() {
      return {
        tipList: [
          {
            title: '医保',
            content: '详情（病案首页、出院记录、入院记录、手术记录、病理报告、影像报告单、长期医嘱单、临时医嘱单）',
          },
          {
            title: '门规',
            content: '详情（病案首页、出院记录、入院记录、手术记录、病理报告、影像报告单、心电图、化验报告单、长期医嘱单、临时医嘱单）\n',
          },
          {
            title: '全套',
            content: '详情（病案首页、出院记录、入院记录、手术记录、病理报告、麻醉记录、影像报告单、心电图、化验报告单、长期医嘱单、临时医嘱单、 体温单）\n',
          },
        ],
        materialList: [],
        copyRemark: ''
      }
    },
    created() {
      localStorage.setItem('active', '2')
      this.getmaterialList()
    },
    methods: {
      getmaterialList() {
        this.$post({
          url: this.$api.getApplicationList
        }).then(res => {
          res.data.list.forEach(item => {
            this.materialList.push({
              title: item.copyDescName,
              isChecked: false,
              tip: item.describe,
              count: 0
            })
          })
        })
      },
      nextStep() {
        let temp = []
        this.materialList.forEach(item => {
          if (item.isChecked && item.count != 0) {
            temp.push(item.title + 'X' + item.count + '份')
          }
        })
        if (temp.length === 0) {
          this.$toast(`至少打印一项内容`)
          return
        }
        let user = this.$common.getUserInfoFMLocal()
        user = Object.assign(user, {
          copyContent: temp.toString(),
          copyRemark: this.copyRemark
        })
        this.$common.setUserInfo2Local(user)
        console.log(`CopyContent user ===> `, user)
        temp = []
        this.$router.push({name: 'InfoConfirm'})
      }
    }
  }
</script>
<style lang="scss">
  .material {
    .van-stepper {
      height: 1.63rem !important;
    }
    .van-stepper__minus, .van-stepper__plus {
      height: 1.63rem !important;
      width: 1.78rem;
      box-sizing: border-box;
      color: #1C97FC;
    }
    .van-stepper__minus {
      border-radius: 50rem 0 0 50rem;
    }
    .van-stepper__plus {
      border-radius: 0 50rem 50rem 0;
    }
    .van-stepper__input {
      height: 1.63rem !important;
      box-sizing: border-box;
      color: #333;
      font-size: 0.88rem;
      width: 1.69rem;
    }
    .van-stepper__minus::after, .van-stepper__minus::before, .van-stepper__plus::after, .van-stepper__plus::before {
      background-color: #1C97FC;
    }
    .van-checkbox__icon--checked .van-icon {
      border-color: #1C97FC;
      background-color: #1C97FC;
    }
  }
</style>

<style lang="scss" scoped>
  .copy-content {
    background-color: #f6f6f6;
  }

  .tips {
    letter-spacing: 0.01rem;
    background-color: #FFF9F5;
    padding: 1rem .88rem;
    color: #666;
    font-size: .88rem;
    .title {
      color: #E98550;
      font-size: 1rem;
      margin-bottom: .5rem;
    }
    .tip {
      margin-top: .5rem;
    }
  }

  .material {
    background-color: #fff;
    padding: .88rem;
    .checkbox {
      margin-right: 1rem;
    }
    .tip {
      color: #F6424B;
      font-size: .75rem;
      text-indent: 2.25rem;
      margin-top: .38rem;
    }
    .stepper {
      position: absolute;
      right: .88rem;
    }
  }

  .remarks {
    border-bottom: #f6f6f6 5rem solid;
    box-sizing: content-box;
    height: 3.38rem;
    padding: 0 .88rem;
    color: #999;
    font-size: 1rem;
    margin-top: .5rem;
    background-color: #fff;
    input {
      height: 100%;
      font-size: 1rem;
      line-height: 3.38rem;
      margin-left: 1.25rem;
      color: #333;
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    height: 3.81rem;
    width: 100%;
    padding: .5rem 0;
    background-color: #fff;
  }
</style>
