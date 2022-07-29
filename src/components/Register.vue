<template>
  <div class="container">
    <div class="panel">
      <div class="content">
        <div class="switch">
          <h1 id="signUp">注册</h1>
        </div>

        <form action="">

          <div id="userName" class="input" ><input type="text" placeholder="用户名" v-model="nickname" @keyup="checkNickname(nickname)"><span v-show="nicknameWrong">用户名应为1-10位汉字、字母或数字</span></div>
          <div id="email" class="input"><input type="text" placeholder="邮箱" v-model="email" @keyup="checkEmail(email)"><span v-show="emailWrong">邮箱格式错误</span></div>
          <button id="getEmailCode" @click="sendEmail()" type="button">点击获取验证码</button>
          <div id="code" class="input"><input type="text" placeholder="邮箱验证码" v-model="code"></div>
          <div id="password" class="input"><input type="password" placeholder="密码" v-model="password1" @keyup="checkPassword1(password1)"><span v-show="passwordWrong">密码应为6~20位且包含字母与数字</span></div>
          <div id="repeat" class="input"><input type="password" placeholder="确认密码" v-model="password2" @keyup="checkPassword2(password2)"><span v-show="twoPasswordWrong">两次密码不一致</span></div>
          <p>
            <a id="login" href="login" class="input">已有账户？点击登录</a>
          </p>
          <button id="register" onclick="location.href= nowHref" type="button" @click="registerIn()">注册</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterVue",
  data(){
    return{
      nowHref:'register',
      nickname:'',
      password1:'',
      password2:'',
      email:'',
      code:'',
      result:-1,
      message:'',
      nicknameWrong:false,
      emailWrong:false,
      passwordWrong:false,
      twoPasswordWrong:false
    }
  },
  methods:{
    checkNickname(nicknameIn){
      const that = this
      const pattern = new RegExp("^[\u4e00-\u9fa5a-zA-Z0-9_]{1,10}$")
      that.nicknameWrong = !(pattern.test(nicknameIn))
    },
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
        that.$message.error('邮箱格式错误！')
      }
      else{
        this.$axios.post('/user/registerEmail/', this.$qs.stringify({
          email: that.email
        })).then(res =>{
          console.log(res);
          if(res.data.result === 0){
            that.$message.success('发送成功！')
          }
          else if(res.data.result === 2){
            that.$message.error('邮箱已被注册！')
          }
          else if(res.data.result === 3){
            that.$message.error("发送失败，请检查邮箱是否正确！")
          }else{
            that.$message.error("请求错误!")
          }
        })
      }
    },
    registerIn(){
      const that = this
      if(!that.nicknameWrong && !that.emailWrong && !that.passwordWrong && !that.twoPasswordWrong && that.email.length !==0 && that.password1.length !==0 && that.password2.length !==0 && that.nickname.length !==0){
        this.$axios.post('/user/register/', this.$qs.stringify({
          nickname: that.nickname,
          password: that.password1,
          email: that.email,
          code: that.code
        })).then(res =>{
          console.log(res);
          if(res.data.result === 0){
            that.$message.success("注册成功!")
            that.nowHref = 'login'
          }
          else if(res.data.result === 2){
            that.$message.error("邮箱已注册!")
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

form .input#userName {
  margin: 3rem 0 0;
}

form .input#password {
  height: 1.6rem;
}

form button#register {
  display: block;
  border: none;
  outline: none;
  margin: 2rem 61px 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(90deg, #8a8fff, rgb(216, 174, 255));
  box-shadow: 0 0 8px #8a8fff;
  cursor: pointer;
}

form button#register:hover {
  border: none;
  outline: none;
  margin: 2rem -7px 0;
  width: 100%;
  height: 3.5rem;
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