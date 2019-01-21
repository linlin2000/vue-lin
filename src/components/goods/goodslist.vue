<template>
  <div class="goodslist">
    <router-link
      tag="div"
      :to="'/index/goodsinfo/'+item.id"
      class="gcard"
      v-for="(item,index) in imageInfo"
      :key="index"
    >
      <img :src="item.img_url" alt>
      <h1>{{item.zhaiyao}}</h1>
      <div>
        <p class="price">
          <span class="reds">￥{{item.sell_price}}</span>
          <span class="decor">￥{{item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>
    <van-button plain type="danger" size="large" @click="goodslist">加载更多</van-button>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data: () => ({
    pageindex: 1,
    imageInfo: []
  }),
  created() {
    this.getimageInfo();
  },
  methods: {
    async getimageInfo() {
      const res = await this.$http.get(
        "/api/getgoods?pageindex=" + this.pageindex
      );
      console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.imageInfo = this.imageInfo.concat(message);
      } else {
        Toast("获取内容失败");
      }
    },
    goodslist() {
      this.pageindex++;
      this.getimageInfo();
    }
  }
};
</script>
<style lang="less">
.goodslist {
  padding: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .gcard {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 48%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 5px 0;
    min-height: 300px;
    img {
      width: 100%;
    }
    h1 {
      font-size: 14px;
      font-weight: normal;
      padding: 0 2px;
    }
    div {
      margin: 3px;
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .reds {
          color: red;
          font-weight: 600;
        }
        .decor{
            text-decoration:line-through;
            font-size: 12px;
            margin-left: 10px;
            color: #666;
        }
      }
      .sell {
        color: #666;
        display: flex;
        flex-wrap: wrap;
        font-size: 12px;
        justify-content: space-between;
      }
    }
  }
}
</style>
