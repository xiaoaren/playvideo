<template>
    <video :src="url" controls="controls">
        你的浏览器暂不支持在线播放
    </video>
</template>

<script>
export default {
  data () {
    return {
        url:''
    }
  },
  created: function(){
      let self = this;
      this.url = self.$route.query.url;
      console.log(self);
      
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
