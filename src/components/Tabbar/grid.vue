<template>
  <div>
    <van-row>
      <van-col span="8" v-for="(item, index) in col" :key="index">
        <router-link :to="item.to">
          <img :src="item.src" alt>
          <div>{{item.name}}</div>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    col: [
      { name: "新闻资讯", src: "static/gird/menu1.png", to: "/index/newslist" },
      { name: "图片分享", src: "static/gird/menu2.png", to: "/index/photolist" },
      { name: "商品购买", src: "static/gird/menu3.png", to: "/index/goodslist" },
      { name: "留言反馈", src: "static/gird/menu4.png", to: "/index/newlist" },
      { name: "视频专区", src: "static/gird/menu5.png", to: "/index/newlist" },
      { name: "联系我们", src: "static/gird/menu6.png", to: "/index/newlist" }
    ]
  })
};
</script>
<style lang="less">
.van-col {
  text-align: center;
  padding-top: 20px;
  img {
    height: 60px;
    width: 60px;
  }
  div {
    color: #000;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
