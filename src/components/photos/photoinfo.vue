<template>
  <div class="photoinfo">
    <h3 class="title">{{listpoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{ listpoinfo.add_time |datefmt()}}</span>
      <span>点击：{{ listpoinfo.click }}次</span>
    </p>
    <hr>
    <div class="content">
      <img :src="item.src" alt @click="thuminfo(index)" v-for="(item,index) in listthum" :key="item.id">
      <p>{{listpoinfo.content}}</p>
    </div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
import { Toast } from "vant";
import comment from "../comment";
import { ImagePreview } from "vant";
export default {
  data: () => ({
    id: "",
    listpoinfo: [],
    listthum: [],
    listsrc: []
  }),
  created() {
    this.id = this.$route.params.id;
    this.getimageInfo();
    this.getthumimages();
  },
  methods: {
    async getimageInfo() {
      const res = await this.$http.get("/api/getimageInfo/" + this.id);
      console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listpoinfo = message;
      } else {
        Toast("获取内容失败");
      }
    },
    async getthumimages() {
      const res = await this.$http.get("/api/getthumimages/" + this.id);
      console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listthum = message;
        message.forEach(item => {
          this.listsrc.push(item.src);
        });
        console.log(this.listsrc);
      } else {
        Toast("获取内容失败");
      }
    },
    thuminfo(index) {
      ImagePreview({images:this.listsrc,startPosition:index});
    }
  },
  components: {
    comment
  }
};
</script>
<style lang="less">
.photoinfo {
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
      width: 33.33%;
      padding: 0 5px;
      box-sizing: border-box;
      height: 99px;
    }
  }
}
</style>
