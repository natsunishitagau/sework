<template>
  <div class="container">
    <div class="panel">
      <div class="content">
        <div class="switch">
          <h1 id="signUp">注册</h1>
        </div>

        <form action="">

          <div id="userName" class="input" aria-placeholder="用户名"><input type="text"></div>
          <div id="email" class="input" aria-placeholder="邮箱"><input type="text"></div>
          <button id="getEmailCode">点击获取验证码</button>
          <div id="code" class="input" aria-placeholder="邮箱验证码"><input type="text"></div>
          <div id="password" class="input" aria-placeholder="密码"><input type="password"></div>
          <div id="repeat" class="input" aria-placeholder="确认密码"><input type="password"></div>
          <p>
            <a id="login" href="login" class="input">已有账户？点击登录</a>
          </p>
          <button id="register" onclick="location.href='login'" type="button">注册</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterVue"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
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
  color: #7d74ff;
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