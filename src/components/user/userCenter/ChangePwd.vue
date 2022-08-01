<template>
  <div>
    <header>修改密码</header>
    <hr/>
    <div class="info">
      <div>
        <el-form :model="form" label-width="120px">
          <el-form-item label="原密码：">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <a href="/retrieve" blank="_self">忘记密码？</a>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="form.password2" />
          </el-form-item>
        </el-form>
      </div>
      <img :src="avatarSrc" @click="updateAvatar"/>
    </div>
    <span class="change" @click="changePwd">提交修改</span>
  </div>

</template>

<script>
export default {
  name: "changePwd",
  data() {
    return {
      form: {
        email: "",
        password: "",
        password2: ""
      },
    }
  },
  methods: {
    changePwd() {
      /*
      if(this.password===this.password2)
      {
        
      }
      else 
      {
        //not same
      }
      */
    }
  }
}
</script>

<style scoped>
  header
  {
    text-align: left;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    font-family: Mulish;
  }
  hr
  {
    border: none;
    height: 1px;
    background-color: var(--el-border-color);
  }
  .info
  {
    width: 300px;
    margin-top: 50px;
    font-size: 18px;
  }
  .change
  {
    float:left;
    margin-left: 18%;
    height: 36px;
    line-height: 36px;
    width: 120px;
    background-color: #00c3ff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  .change:active
  {
    background-color: rgb(100, 200, 237);
  }
</style>