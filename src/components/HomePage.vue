<template>
  <div class="container">
    <NaviBar></NaviBar>
      <div class="body">
          <div class="app">
              <div class="left-part">
                  <p class="character2">欢迎来到墨书</p>
                  <p class="character3">一个助您高效协作的平台</p>
                  <button class="button1" type="button" @click="judgeJump()" v-show="isShow">开始使用</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import NaviBar from "./NaviBar.vue";
export default {
  name: 'HomePage',
  data() {
    return {
        email: "",
        isShow: false,
    }
  },
  components: {
    NaviBar
  },
  methods: {
      judgeJump(){
          this.$router.push({name:'login'})
      }
  },
  created() {
      if(sessionStorage.getItem('isLogin')){
          this.isShow=false
      }else{
          this.isShow=true
      }
  }
}
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../../public/墨.png") no-repeat;
}
.container {
    position: fixed;
}
.character1{
    font-size: 30px;
    font-weight: bold;
}
.character2{
    padding-left: 400px;
    padding-top: 250px;
    font-size: 50px;
    font-weight: bolder;
}
.character3{
    padding-left: 400px;
    padding-top: 30px;
    font-size: 30px;
    font-weight: lighter;
}
.button1{
    font-size: 20px;
    font-weight: lighter;
    color: white;
    background: #303133;
    margin-top: 25px;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: none;
    margin-left: 450px;
}
.button1:hover{
    cursor: pointer;
    background: #606266;
}
div {
    display: block;
}
.body {
    width: 100vw;
    height: 100vh;
    display: block;
    margin: 0;
    padding: 0;
    background: rgba(68,138,255,.05);
}
.app{
    font-family: Avenir,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
}
.left-part{
    padding-top: 10vh;
    padding-left: 20vw;
    position: relative;
    z-index: 1;
    float: left;
    height: 100vh;
}
.top-part{
    padding-top: 30px;
    padding-left: 30px;
    z-index: 10;
    position: fixed;

}
</style>
