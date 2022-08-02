<template>

  <div class="navi" :style="width">
    <ul>
      <li v-for="v of items.length" :key="v" @click="enter(v-1)">
        <span>{{items[v-1]}}</span>
      </li>
    </ul>
    <span class="indicator" :style="indicate"></span>
    <span class="separate"></span>
    <span class="avatar">
      <img :src="avatarSrc"/>
    </span>
    <div @click="logOut" class="logout">注销</div>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data() {
    return {
      avatarSrc: "",
      items: ["工作台","个人信息","修改密码"],
      links: ["workSpace","userInfo","changePwd"],
      indPos: ["display:none","left:612px;width:94px","left:752px;width:94px"],
      indicate: "",
      width: ""
    }
  },
  components: {

  },
  methods: {
    getInfo() {
      this.avatarSrc=sessionStorage.getItem("src");
      this.width="min-width: "+window.innerWidth+"px";
    },
    logOut() {
      sessionStorage.setItem("isLogin","");
      this.$router.push("/home");
    },
    enter(i) {
      this.indicate=this.indPos[i];
      this.$router.push({name:this.links[i]});
    }
  },
  created() {
    this.getInfo();
  },
  watch: {
    $route: {
      handler: function(val){
        if(val.path=="/userCenter/userInfo")
          this.getInfo();
      },
      deep: true
    },
  }
}
</script>

<style scoped>
  .navi
  {
    position: fixed;
    top: 0px;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    width: 100%;
  }
  li
  {
    float: left;
    line-height: 60px;
    padding: 0 20px;
    margin: 0 20px;
    font-size: 15px;
    color: #4d4c4c;
    cursor: pointer;
  }
  li:hover,.logout:hover
  {
    color: black;
  }
  .indicator
  {
    position: absolute;
    bottom: 0;
    border-bottom: 2px solid rgb(59, 89, 238);
    display: inline-block;
    transition: all 0.2s ease-out;
  }
  .separate
  {
    border-left: 1px solid var(--el-border-color);
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    margin-left: 6%;
    margin-right: 20px;
    cursor: default;
    height: 70%;
  }
  .avatar
  {
    display: flex;
    align-items: center;
  }
  .avatar img
  {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .logout
  {
    margin-left:20px;
    font-size: 15px;
    color: #4d4c4c;
    cursor: pointer;
  }
  .back
  {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    min-height: 660px;
  }
  .white
  {
    border-radius: 10px;
    width: 1000px;
    margin: 20px 0 20px;
    padding: 30px 40px;
    background-color: white;
    box-shadow: #27364e14 0px 2px 7px 0px
  }
</style>