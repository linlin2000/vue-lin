<template>
  <div id="app">
    <van-nav-bar class="app-nav" title="滴···滴滴！！！" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <transition>
      <router-view to="/index"></router-view>
    </transition>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/member" >会员中心</van-tabbar-item>
      <van-tabbar-item icon="cart-circle-o" info="0" to="/Shopping">购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">search</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "App",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      history.back();
    }
  }
};
</script>

<style>
#app {
  /* position: relative; */
  overflow-x: hidden;
  padding-bottom: 50px;
}
.app-nav {
  background-color: skyblue;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0; 
  position: absolute;
  transform: translateX(-100%);
  left: -10000%;
}
.v-enter-active,
.v-leave-active {
  transition: all 1.2s ease;
}
</style>
