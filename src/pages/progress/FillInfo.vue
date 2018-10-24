<template>
  <div class="fillInfo">
    <div class="personal">
      <div class="title">个人信息</div>
      <div class="field van-hairline--bottom">
        <span class="title">患者姓名</span>
        <input type="text" v-model="formData.name" placeholder="请输入真实的姓名"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">手机号</span>
        <input type="text" maxlength="11" v-model="formData.tel" placeholder="请输入"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">验证码</span>
        <input v-model="formData.code" placeholder="请输入"/>
        <!--<input type="text" placeholder="请输入"/>-->
        <button v-if="!timer" class="code-btn" @click="getIdentifyCode">获取验证码</button>
        <button v-else class="code-btn-wait" disabled>重新获取({{count}}s)</button>
      </div>
      <div class="field">
        <span class="title">身份证号</span>
        <input v-model="formData.idCard" maxlength="18" type="text" placeholder="选填"/>
      </div>
    </div>
    <div class="inpatient">
      <div class="field van-hairline--bottom">
        <span class="title">住院号</span>
        <input v-model="formData.inpatientCode" type="text" placeholder="请输入住院号后六位"/>
      </div>
      <div class="field van-hairline--bottom">
        <span class="title">出院状态</span>
        <div>
          <div class="inline-block" style="margin-right: 1.3rem" @click="formData.inpatientState=1">
            <div v-if="formData.inpatientState==1" class="flex-align">
              <i class="van-icon van-icon-checked color-blue" style="margin-right: .3rem"></i> 已出院
            </div>
            <div v-else class="flex-align">
              <i class="van-icon van-icon-check color-999" style="margin-right: .3rem"></i> 已出院
            </div>
          </div>
          <div class="inline-block" @click="formData.inpatientState=0; formData.endDate=''">
            <div v-if="formData.inpatientState==1" class="flex-align">
              <i class="van-icon van-icon-check color-999" style="margin-right: .3rem"></i> 未出院
            </div>
            <div v-else class="flex-align">
              <i class="van-icon van-icon-checked color-blue" style="margin-right: .3rem"></i> 未出院
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <span class="title">住院时间</span>
        <input readonly placeholder="请选择" class="color-blue date-width" v-model="formData.startDate"
               @click="selectTime(1)"/>
        <!--<span @click="selectTime(1)" style="color: #dddddd">请选择</span>-->
        <div class="font-size88 split">至</div>
        <input readonly placeholder="请选择" class="color-blue date-width" v-model="formData.endDate"
              :disabled="formData.inpatientState==0" @click="selectTime(2)"/>
      </div>
    </div>
    <div class="known-check font-size88 flex-align" @click="known=!known">
      <div class="check inline-block"><i v-show="known" class="van-icon van-icon-success"/></div>
      我已阅读
      <span class="color-blue inline-block" @click.stop="$router.replace({name: 'Index'})">  《预约须知》</span>
    </div>
    <div style="background-color: #f6f6f6;height: 60px;width: 1px"></div>
    <div class="foot">
      <van-button type="default" class="width100 font-size106 margin-right"
                  @click.stop="$router.push({name: 'AskRecord'})">申请记录
      </van-button>
      <van-button class="blue-btn margin-left" @click="nextStep">下一步</van-button>
    </div>
    <van-popup v-model="isShowPicker1" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="selected1"
        @cancel="hiddenPicker"
        :min-date="minDate"></van-datetime-picker>
    </van-popup>
    <van-popup v-model="isShowPicker2" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="selected2"
        @cancel="hiddenPicker"
        :min-date="minDate"></van-datetime-picker>
    </van-popup>
    <van-popup class="error-pop" v-model="isShowError" :close-on-click-overlay="false">
      <div class="error">
        {{errorInfo}}
      </div>
      <div class="confirm-btn" @click="isShowError=false">确认</div>
    </van-popup>
  </div>
</template>

<script>
  import {RadioGroup, Radio, DatetimePicker} from 'vant'

  export default {
    name: "FillInfo",
    components: {
      VanRadioGroup: RadioGroup,
      VanRadio: Radio,
      VanDatetimePicker: DatetimePicker,
    },
    data() {
      return {
        known: true,
        isShowPicker1: false,
        isShowPicker2: false,
        isShowError: false,
        errorInfo: '出错啦，请稍后再试',
        radio: '1',
        minDate: new Date(2000, 0, 1),
        currentDate: new Date(),
        // startDate: '请选择',
        // endDate: '请选择',
        timer: null,
        count: '',
        show: true,
        formData: {
          name: '',
          tel: '',
          code: '',
          idCard: '',
          inpatientCode: '',
          inpatientState: '1', //1=出院 0=未出院
          startDate: '',
          endDate: '',
        }
      }
    },
    created() {
      localStorage.setItem('active', '0')
    },
    methods: {
      selectTime(v) {
        if (v == 1) {
          this.minDate = new Date(2000, 0, 1)
          this.isShowPicker1 = true
        } else {
          if (!this.formData.startDate) {
            this.$toast('请先选择入院时间');
            return
          }
          this.isShowPicker2 = true
        }
      },
      selected1(time) {
        console.log(`开始时间 ===> `, this.$date.formatDate(time))
        let temp = this.$date.formatDate(time).split('-')
        this.formData.startDate = temp[0] + '-' + temp[1] + '-' + temp[2]
        this.minDate = time //结束时间大于开始时间
        this.isShowPicker1 = false
      },
      selected2(time) {
        console.log(`结束时间 ===> `, this.$date.formatDate(time))
        let temp = this.$date.formatDate(time).split('-')
        this.formData.endDate = temp[0] + '-' + temp[1] + '-' + temp[2]
        this.isShowPicker2 = false
      },
      hiddenPicker() {
        this.isShowPicker1 = false
        this.isShowPicker2 = false
      },
      getIdentifyCode() {
        if (this.formData.tel && this.$validate.isMobile(this.formData.tel)) {
          this.$post({
            isLoading: true,
            url: this.$api.getMessageCode,
            param: {phone: this.formData.tel},
            postType: 'json'
          }).then(res => {
            if (res.data.R == 200) {
              this.setTime()
            } else {
              this.errorInfo = res.data.I
              this.isShowError = true
            }

          })
        } else {
          this.$toast(`手机号格式错误`)
        }

      },
      setTime() {
        const TIME_COUNT = 120
        if (!this.timer) {
          this.count = TIME_COUNT
          this.show = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      },
      nextStep() {
        if (this.known) {
          let params = {
            patientName: this.formData.name,
            hosNumber: this.formData.inpatientCode,
            idCard: this.formData.idCard,
            state: this.formData.inpatientState,
            valid: this.formData.code,
            phone: this.formData.tel,
            inDate: this.formData.startDate,
            outDate: this.formData.endDate
          }
          if (!params.patientName) {
            this.$toast(`请输入姓名`);
            return
          } else if (!params.phone) {
            this.$toast(`请输入手机号`);
            return
          } else if (!params.valid) {
            this.$toast(`请输入验证码`)
            return
          } else if (!params.idCard) {
            this.$toast(`请输入身份证号`)
            return
          } else if (!this.$validate.isIdCard(params.idCard)[0]) {
            this.$toast(`身份证格式错误`)
            return
          } else if (!params.hosNumber) {
            this.$toast(`请输入住院号`)
            return
          } else if (!params.inDate) {
            this.$toast(`请选择入院时间`)
            return
          }
          else if (params.state == 1 && !params.outDate) {
            this.$toast(`请选择出院时间`)
            return
          }
          // if (params.state == '1'){
          //   if (!params.outDate){
          //     this.$toast(`请选择出院时间`)
          //     return
          //   }
          // }
          // // console.log(item)
          this.$post({
            isLoading: true,
            url: this.$api.fillPatientInfo,
            param: params,
            postType: 'json'
          }).then(res => {
            if (res.data.R == 200) {
              delete params.valid
              this.$common.setUserInfo2Local(params)
              console.log(this.$common.getUserInfoFMLocal())
              this.$router.push({name: 'TransType'})
            } else {
              this.isShowError = true
              this.errorInfo = res.data.I
              // this.$toast(`${res.data.I}`)
              return
            }
          })

        }
        else {
          this.$toast(`请先确认预约须知`)
        }
        // console.log(this.known.toString())
      }
    }
  }
</script>

<style>
  .van-radio-group {
    display: flex;
    align-content: center;
    align-items: center;
  }

  .van-radio .van-icon-checked {
    color: #1c97fc;
    font-size: 17px;
  }

  .van-radio .van-icon-check {
    font-size: 17px;
  }

  .van-radio__label {
    font-size: 16px;
  }

  .error-pop {
    text-align: center;
    border-radius: .5rem;
    width: 18.13rem;
  }
</style>
<style lang="scss" scoped>

  .fillInfo {
    .error {
      font-family: PingFang-SC-Medium;
      padding: 1.75rem 3.5rem;
      border-bottom: #e5e5e5 solid .01rem;
      line-height: 1.38rem;
    }
    .confirm-btn {
      margin: .75rem 0;
      color: #1c97fc;
    }
    background-color: #f6f6f6;
    .split {
      display: inline-block;
    }
    .check {
      margin-right: .3rem;
      width: .84rem;
      height: .84rem;
      border: #1c97fc 1px solid;
      border-radius: 0.15rem;
      font-size: .50rem;
      font-weight: bold;
      color: #1c97fc;
    }
    .inpatient {
      background-color: white;
      border-top: .5rem solid #f6f6f6;
      padding-left: 0.88rem;
    }
    .personal {
      background-color: white;
      padding: 0.75rem 0.88rem 0;
    }
    .select-btn {
      color: #666666;
    }
    .code-btn {
      font-size: 0.88rem;
      width: 6.43rem;
      height: 2rem;
      color: #1c97fc;
      border: 1px solid #1c97fc;
      border-radius: 0.13rem;
      position: absolute;
      right: 0;
    }
    .code-btn-wait {
      font-size: 0.8rem;
      min-width: 6.43rem;
      height: 2rem;
      color: #999999;
      border: 1px solid #DDDDDD;
      border-radius: 0.13rem;
      position: absolute;
      right: 0;
    }
    .title {
      width: 100%;
      margin-bottom: 0.35rem;
    }
    .date-width {
      font-family: SanFranciscoText-Medium;
      font-size: .93rem;
      width: 7.2rem;
    }

    .translate {
      position: relative;
      left: 1.63rem;
    }
    .translate135 {
      position: absolute;
      left: 13.26rem;
    }
    .translate290 {
      position: absolute;
      left: 14.88em;
    }
    .margin-right {
      margin-right: 0.2rem;
    }
    .margin-left {
      margin-left: 0.2rem;
    }
    .known-check {
      margin: .55rem .89rem;
      color: #999999;
    }
  }

  .field {
    display: flex;
    /*align-items: baseline;*/
    align-items: center;
    padding-right: .88rem;
    /*border-bottom: 1px solid #eee;*/
    min-height: 3.31rem;
    &:last-child {
      border-bottom: none;
      /*height: 4.75rem;*/
      /*align-items: baseline;*/
      /*padding-top: 1rem;*/
    }
    input {
      min-height: 3.31rem;
      /*flex-grow: 1;*/
    }
    .title {
      width: 5.31rem;
      text-align: left;
      color: #999;
    }
  }

</style>
