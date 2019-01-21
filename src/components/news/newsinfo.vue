<template>
  <div class="newsinfo">
    <h3 class="title">{{listinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{ listinfo.add_time |datefmt()}}</span>
      <span>点击：{{ listinfo.click }}次</span>
    </p>
    <hr>
    <div class="content" v-html="listinfo.content"></div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
import { Toast } from "vant";
import comment from "../comment";
export default {
  data: () => ({
    id: "",
    listinfo: {}
  }),
  created() {
    this.id = this.$route.params.id;
    this.getnew();
  },
  methods: {
    async getnew() {
      const res = await this.$http.get("/api/getnew/" + this.id);
      // console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listinfo = message;
      } else {
        Toast("获取内容失败");
      }
    }
  },
  components:{
    comment,
  }
};
</script>
<style lang="less">
.newsinfo {
  padding: 0 16px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
        font-size: 14px;
    img {
      width: 100%;
    }
  }
}
</style>
