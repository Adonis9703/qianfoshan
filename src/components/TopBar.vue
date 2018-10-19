<template>
  <div class="top-bar">
    <i class="" :src="IconBack"></i>
    {{title}}
  </div>
</template>

<script>
  import IconBack from '@/assets/images/icon_back.png'

  export default {
    props: {
      title: {
        default: 'title',
        type: String
      }
    },
    data () {
      return {
        IconBack
      }
    }
  }
</script>

<style scoped>
.top-bar {
  height: 44px;
  width: 100%;
  border-bottom: 1px solid #E2E2E2;
}
</style>
