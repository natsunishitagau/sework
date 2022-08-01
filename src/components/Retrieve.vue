<template>
  <div class="container">
    <div class="panel">
      <div class="content">
        <div class="switch">
          <h1 id="signUp">忘记密码</h1>
        </div>

        <form action="">

          <div id="email" class="input"><input type="text" v-model="email" @keyup="checkEmail(email)" placeholder="邮箱"><span v-show="emailWrong">邮箱格式错误</span></div>
          <p><button id="getEmailCode" type="button" @click="sendEmail()">点击获取验证码</button></p>
          <div id="emailCode" class="input"><input type="text" v-model="code" placeholder="邮箱验证码"></div>
          <div id="password" class="input" ><input type="password" v-model="password1" @keyup="checkPassword1(password1)" placeholder="新密码"><span v-show="passwordWrong">密码应为6~20位且包含字母与数字</span></div>
          <div id="repeat" class="input"><input type="password" v-model="password2" @keyup="checkPassword2(password2)" placeholder="确认密码"><span v-show="twoPasswordWrong">两次密码不一致</span></div>

          <p>
            <a id="login" href="login" class="input">点击跳转登录</a>
          </p>

          <button onclick="location.href='login'" id="reset" type="button" @click="changePassword">提交更改</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RetrieveVue",
  data(){
    return{
      email:'',
      code:'',
      password1:'',
      password2:'',
      emailWrong:false,
      passwordWrong:false,
      twoPasswordWrong:false,
      nowHref:'retrieve'
    }
  },
  methods:{
    checkEmail(emailIn){
      const that = this
      const pattern = new RegExp("^[\\w-]+@[\\w-]+\\.(com|net|org|edu|mil|tv|biz|info)$")
      that.emailWrong = !(pattern.test(emailIn))
    },
    checkPassword1(passwordIn){
      const that = this
      const pattern = new RegExp( /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,20}$/)
      that.passwordWrong = !(pattern.test(passwordIn))
    },
    checkPassword2(password2In){
      const that = this
      that.twoPasswordWrong = !(password2In === that.password1)
    },
    sendEmail(){
      const that = this
      if(that.emailWrong){
        that.$message.error("邮箱格式错误")
      }else{
        this.$axios.post('/user/changePasswordEmail/', this.$qs.stringify({
          email: that.email
        })).then(res =>{
          console.log(res);
          if(res.data.result === 0){
            that.$message.success("发送成功！")
          }
          else if(res.data.result === 2){
            that.$message.error("邮箱未注册！")
          }
          else if(res.data.result === 3){
            that.$message.error("发送失败，请检查邮箱是否正确！")
          }else{
            that.$message.error("请求错误")
          }
        })
      }
    },
    changePassword(){
      const that = this
      if(!that.emailWrong && !that.passwordWrong && !that.twoPasswordWrong && that.email.length !==0 && that.password1.length !==0 && that.password2.length !==0){
        this.$axios.post('user/changePassword/', this.$qs.stringify({
          email: that.email,
          code: that.code,
          newPassword: that.password1
        })).then(res =>{
          console.log(res)
          if(res.data.result === 0){
            that.$message.success("修改密码成功!")
            that.nowHref = 'login'
          }
          else if(res.data.result === 2){
            that.$message.error("邮箱未注册!")
          }
          else if(res.data.result === 3){
            that.$message.error("邮箱验证码错误!")
          }
          else{
            that.$message.error("请求方式错误！")
          }
        })
      }
      else{
        that.$message.error("输入信息有误！")
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

input::-webkit-input-placeholder{
  color:  rgba(125, 116, 255,.8);
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../assets/星空.jpg") no-repeat;
}

.container {
  position: relative;
}

.panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: rgba(0,0,0,.8);
  display: flex;
  justify-content: center;
  width: 400px;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.5);
  border-radius: 10px;
}

.switch h1 {
  text-align: center;
  font-size: 1.4rem;
  color: rgba(125, 116, 255,.8);
  border-bottom: rgba(125, 116, 255,.8) solid 2px;
  cursor: default;
}

.input input {
  outline: none;
  width: 100%;
  border: none;
  background: none;
  border-bottom: .1rem solid #7d74ff;
  color: rgba(37, 215, 202, 0.84);
  font-size: 1rem;
}

.input::after {
  content: attr(aria-placeholder);
  position: absolute;
  left: 0;
  top: -20%;
  font-size: 1.1rem;
  color: rgba(125, 116, 255, 0.44);
  transition: .3s;
}

.input.focus::after {
  top: -70%;
  font-size: 1rem;
}

.input#forget {
  color: #7d74ff;
  font-size: 0.8rem;
  text-decoration: none;
}

.input#forget:hover {
  color: rgba(138, 143, 255, 0.4);
}

.input#login {
  color: #7d74ff;
  font-size: 0.8rem;
  text-decoration: none;
}

.input#login:hover {
  color: rgba(138, 143, 255, 0.4);
}

form p {
  text-align: center;
}

form span {
  color: red;
  font-size: 0.8rem;
  cursor: default;
}

form {
  width: 12rem;
  margin: 1rem 0 0;
}

form .input {
  position: relative;
  opacity: 1;
  width: 100%;
  margin: 2rem 0 0;
  height: 42px;
}

form .input#email {
  margin: 3rem 0 0;
}

form button#reset {
  display: block;
  border: none;
  outline: none;
  margin: 2rem 56px 0;
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(90deg, #8a8fff, rgb(216, 174, 255));
  box-shadow: 0 0 8px #8a8fff;
  cursor: pointer;
}

form button#reset:hover {
  border: none;
  outline: none;
  margin: 2rem -7px 0;
  width: 100%;
  height: 66px;
  border-radius: 3rem;
  background: linear-gradient(90deg, rgba(138, 143, 255, 0.75), rgba(216, 174, 255, 0.75));
  box-shadow: 0 0 8px #8a8fff;
  cursor: pointer;
  color: rgba(0,0,0,0.6);
  transition: .4s;
}

form button#getEmailCode {
  display: block;
  border: none;
  outline: none;
  width: 7rem;
  border-radius: 5%;
  background: linear-gradient(90deg, rgba(138, 143, 255, 0.76), rgba(182, 130, 255, 0.76));
  box-shadow: 0 0 8px #8a8fff;
  cursor: pointer;
  color: #d3c2ff;

}

form button#getEmailCode:hover {
  background: linear-gradient(90deg, rgba(138, 143, 255, 0.5), rgba(182, 130, 255, 0.51));
  color: rgba(211, 194, 255, 0.7);

}

</style>