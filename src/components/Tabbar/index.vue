<template>
  <div>
    <!-- <h1>这是index</h1> -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.img">
      </van-swipe-item>
    </van-swipe>
    <router-view></router-view>
    <!-- <grid></grid> -->
  </div>
</template>
<script>
import { Toast } from "vant";
// import grid from './grid'
export default {
  data: () => ({
    images: []
  }),
  created() {
    this.getlunbo();
  },
  methods: {
    async getlunbo() {
      const res = await this.$http.get("api/getlunbo")
        // console.log(res);
        var {
          status,
          data: { message }
        } = res;
        if (status === 200) {
          this.images = message;
        } else {
          Toast("获取轮播内容失败");
        }
    }
  },
  // components:{
  //   grid,
  // }
};
</script>
<style lang="less" scoped>
.van-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
