<template>
  <div class="goodsinfo">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in listthumimages" :key="index">
        <img v-lazy="image">
      </van-swipe-item>
    </van-swipe>
    <div class="shop">
      <h1>{{listgetinfo.title}}</h1>
      <hr>
      <div class="shop-dse">
        <p>
          市场价格：
          <span class="deco">￥{{listgetinfo.market_price}}</span>&nbsp;&nbsp;
          销售价格：
          <span>￥{{listgetinfo.sell_price}}</span>
        </p>
        <div class="shop-vof">
          <div class="shop-mod">购买数量：</div>
          <transition v-on:before-enter="bEnter" v-on:enter="enter" v-on:after-enter="aEnter">
            <div class="btn" v-show="show"></div>
          </transition>
          <van-stepper v-model="value"/>
        </div>
        <div class="shop-button">
          <van-button type="primary">立即购买</van-button>
          <van-button :disabled="disabled" type="danger" @click="butn">加入购物车</van-button>
        </div>
      </div>
    </div>
    <div class="des">
      <h1>商品参数</h1>
      <hr>
      <div class="des-sop">
        <p>商品货架：{{listgetinfo.goods_no}}</p>
        <p>库存情况：{{listgetinfo.stock_quantity}}件</p>
        <p>上架时间：{{listgetinfo.add_time |datefmt}}</p>
      </div>
      <hr>
      <div class="dos-button">
        <van-button plain type="primary">图文介绍</van-button>
        <van-button plain type="danger">商品评论</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    show: false,
    value: 1,
    id: "",
    listgetinfo: {},
    listthumimages: [],
    disabled: false
  }),
  computed: {
    ...mapGetters([""])
  },
  created() {
    this.id = this.$route.params.id;
    this.getinfo();
    this.getthumimages();
  },
  methods: {
    async getinfo() {
      const res = await this.$http.get("/api/goods/getinfo/" + this.id);
      console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listgetinfo = message;
      } else {
        Toast("获取内容失败");
      }
    },
    async getthumimages() {
      var id = 100 + parseInt(this.id);
      const res = await this.$http.get("/api/getthumimages/" + id);
      // console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listthumimages = message;
      } else {
        Toast("获取内容失败");
      }
    },
    butn() {
      this.show = !this.show;
      this.disabled = !this.disabled;
      const goodsinfo = {
        value: this.value,
        id: this.id,
        title: this.listgetinfo.title,
        sell_price: this.listgetinfo.sell_price
      };
      setTimeout(() => {
        this.disabled = !this.disabled;
        //简写mapMutations调用
        this.addToCar(goodsinfo)
        // this.$store.commit("addToCar", goodsinfo);
        this.value = 1;
      }, 1000);
    },
    bEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetTop;

      const ballpos = document.querySelector(".btn").getBoundingClientRect();
      const badgepos = document
        .querySelector(".van-info")
        .getBoundingClientRect();
      const xbon = badgepos.left - ballpos.left;
      const ybon = badgepos.top - ballpos.top;

      el.style.transform = `translate(${xbon}px,${ybon}px)`;
      el.style.transition = "all 1s cubic-bezier(0.43,-0.54, 0.74, 0.5)";
      done();
    },
    aEnter(el) {
      // setTimeout(() => {
      this.show = !this.show;
      // }, 400);
    },
    //简写
    ...mapMutations(['addToCar'])
  }
};
</script>
<style lang="less">
.goodsinfo {
  padding: 10px;
  hr {
    margin: 0;
  }
  .van-swipe {
    height: 200px;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    padding: 10px;
    .van-swipe-item {
      text-align: center;
      img {
        height: 100%;
      }
    }
  }
  .shop {
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin-top: 10px;
    h1 {
      font-size: 18px;
      padding-left: 10px;
    }
    .shop-dse {
      padding: 12px;
      p {
        margin: 0;
        padding: 0 0 8px 0;
        color: #666;
        font-size: 14px;
        .deco {
          text-decoration: line-through;
        }
      }
      .shop-button {
        padding: 10px 0;
        .van-button--primary,
        .van-button--danger {
          height: 36px;
          line-height: 36px;
          font-size: 14px;
        }
      }
      .shop-vof {
        height: 30px;
        padding: 5px 0;
        color: #666;
        position: relative;
        .shop-mod {
          float: left;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
        }
        .van-stepper {
          float: left;
        }
        .btn {
          opacity: 1;
          position: absolute;
          left: 120px;
          top: 12px;
          z-index: 999;
          height: 16px;
          width: 16px;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
  }
  .des {
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin-top: 10px;
    h1 {
      font-size: 18px;
      padding-left: 10px;
    }
    .des-sop {
      padding: 12px;
      margin-bottom: 10px;
      p {
        margin: 0;
        padding: 0 0 10px 0;
        color: #666;
        font-size: 14px;
      }
    }
    .dos-button {
      padding: 12px;
      .van-button--plain {
        width: 49%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
