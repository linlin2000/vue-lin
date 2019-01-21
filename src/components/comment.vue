<template>
  <div class="comment">
    <h3>发表评论：</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="age"></textarea>
    <van-button type="primary" size="large" @click="postcomment">发表评论</van-button>
    <van-panel v-for="(item,index) in listcomments" :key="index">
      <div>第{{index + 1}}楼&nbsp;&nbsp;用户：{{item.user_name}} &nbsp;&nbsp;发表时间：{{item.add_time | datefmt}}</div>
      <div slot="footer">{{ item.content === '' ? '此用户很懒，嘛都没说': item.content }}</div>
    </van-panel>
    <van-button plain type="danger" size="large" @click="comments">加载更多</van-button>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data: () => ({
    pageindex: 1,
    listcomments: [],
    age: ""
  }),
  props: ["id"],
  created() {
    this.getcomments();
  },
  methods: {
    async getcomments() {
      const res = await this.$http.get(
        "/api/getcomments/" + this.id + "?pageindex=" + this.pageindex
      );
    //   console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
        this.listcomments = this.listcomments.concat(message);
      } else {
        Toast("获取内容失败");
      }
    },
    comments() {
      this.pageindex++;
      this.getcomments();
    },
    async postcomment() {
      const res = await this.$http.post("/api/postcomment/" + this.id, {
        content: this.age
      });
      // console.log(res);
      var {
        status,
        data: { message }
      } = res;
      if (status === 200) {
          Toast("发表成功");
      } else {
        Toast("发表失败");
      }
      this.age = "";
    }
  }
};
</script>
<style lang="less">
.comment {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    box-sizing: border-box;
    resize: none;
    width: 100%;
    height: 85px;
    margin: 0;
  }
  .van-cell {
    padding: 6px;
  }
  .van-panel__content {
    background-color: #ddd;
    font-size: 12px;
    padding: 6px;
  }
  .van-panel__footer {
    background-color: #ccc;
    font-size: 14px;
  }
  .van-button--plain.van-button--danger {
    margin-top: 10px;
  }
}
</style>
