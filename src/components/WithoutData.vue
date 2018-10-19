<template>
  <div class="without-data">
    <img :src="withoutData" />
    <p class="tip">{{tip}}</p>
  </div>
</template>

<script>
  import withoutData from '@/assets/images/withoutData.png'
  export default {
    name: 'WithoutData',
    data() {
      return {
        withoutData
      }
    },
    props: {
      tip: {
        type: String,
        default: '无数据'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .without-data {
    position: relative;
    text-align: center;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    width: 10rem;
    top: 4.88rem;
  img {
    width: 10rem;
  }
  .tip {
    font-size: 1.06rem;
    color: #6C7D8F;
  }
  }
</style>
