<template>
  <div>
    <router-link :to="'/index/newsinfo/'+item.id" v-for="(item) in list" :key="item.id">
      <van-card :title="item.title" :thumb="item.img_url">
        <div slot="price">
          <div>发布时间：{{item.add_time | datefmt('YYYY-MM-DD')}}</div>
        </div>
        <div slot="num">
          <div>点击：{{item.click}}次</div>
        </div>
      </van-card>
    </router-link>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data: () => ({
    list: []
  }),
  created() {
    this.getnewslist();
  },
  methods: {
    async getnewslist() {
      const res = await this.$http.get("api/getnewslist");
      // console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.list = message;
      } else {
        Toast("获取内容失败");
      }
    }
  }
};
</script>
<style lang="less">
.van-card__thumb {
  height: 66px;
}
.van-card__content {
  height: 66px;
  .van-card__title {
    margin-top: 12px;
  }
  .van-card__desc {
    margin-top: 9px;
  }
}
.van-card__bottom {
  bottom: 9px;
  color: skyblue;
}
</style>
