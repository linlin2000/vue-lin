<template>
  <div class="Shopping">
    <van-checkbox-group v-model="result">
      <van-checkbox v-for="(item, index) in list" :key="index" :name="item">
        <van-card
          num="2"
          tag="标签"
          :price="item.sell_price"
          :thumb="imageURL"
          desc="描述信息"
          title="商品标题"
          origin-price="10.00"
        >
          <div slot="footer">
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </div>
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar :price="price" button-text="提交订单"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    list: [{ id: 1, age: 25 }, { id: 2, age: 25 }, { id: 3, age: 25 }],
    result: [],
    price: 0,
    imageURL:
      "https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
  }),
  watch: {
    result() {
      console.log(this.result);
    }
  },
  created() {
    this.list = this.count;
    this.list.forEach(item => {
      this.price += item.sell_price;
    });
  },
  computed: {
    ...mapGetters(["count"])
  }
};
</script>
<style lang="less">
.Shopping {
  padding-bottom: 88px;
  .van-submit-bar {
    bottom: 50px;
  }
  .van-checkbox {
    border: 1px solid #ccc;
    margin-bottom: 6px;
    .van-checkbox__icon {
      width: 10%;
      text-align: center;
    }
    .van-checkbox__label {
      margin: 0;
      padding: 0;
      width: 90%;
    }
  }
}
</style>