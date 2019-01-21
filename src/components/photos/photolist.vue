<template>
  <div>
    <van-tabs v-model="active" animated @click="onClick">
      <van-tab v-for="item in listpho" :title="item.title" :key="item.id">
        <div v-for="item in listImages" :title="item.title" :key="item.id">
          <router-link tag="div" :to="'/index/photoinfo/'+item.id" class="listpos">
            <img :src="item.img_url" alt>
            <div class="pholist">
              <p>{{item.title}}</p>
              <p>{{item.zhaiyao}}</p>
            </div>
          </router-link>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0,
    listpho: [],
    listImages: []
  }),
  created() {
    this.getimgcategory();
    this.getimages(this.active);
  },
  methods: {
    async getimgcategory() {
      const res = await this.$http.get("/api/getimgcategory");
      console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        var arr = { id: 0, title: "全部" };
        this.listpho = message;
        this.listpho.unshift(arr);
      } else {
        Toast("获取内容失败");
      }
    },
    onClick(index, title) {
      this.getimages(index);
    },
    async getimages(id) {
      const res = await this.$http.get("/api/getimages/" + id);
      console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listImages = message;
      } else {
        Toast("获取内容失败");
      }
    }
  }
};
</script>
<style lang="less">
.listpos {
    position: relative;
    img{
        display: block;
    }
  .pholist {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    color: rgb(187, 233, 22);
    padding: 0 10px;
  }
}
</style>