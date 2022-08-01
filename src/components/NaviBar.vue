<template>

  <div class="naviBar">
    <div class="flex-grow"></div>
    <div class="avatar">
      <img :src="avatarSrc" @mouseenter="LookIn" @mouseleave="LookOut" :style="imgSize"/>
    </div>
    <div class="info" @mouseenter="LookIn" @mouseleave="LookOut" v-show="isLookInfo">
      <div v-if="isLogin" class="userInfo">
        <div>{{userName}}</div>
        <div @click="userClick"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"></path></svg>
          &nbsp;&nbsp;个人中心
          <svg class="arow" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg>
        </div>
        <hr/>
        <div @click="updateAvatar"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
          &nbsp;&nbsp;更新头像
        </div>
        <hr/>
        <div @click="logOut"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"></path><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path></svg>
          &nbsp;&nbsp;注销账号
        </div>
      </div>
      <div v-else>
        <div>未登录</div>
        <div class="login"><a href="login" target="_self">登录 / 注册</a></div>
      </div>
    </div>
    <ul>
      <li v-for="v of items.length" :key="v" >
        <span>{{items[v-1]}}</span>
      </li>
    </ul>
  </div>
  <el-dialog title="修改头像" v-model="DialogVisible" width="35%" :modal-append-to-body="false" center @close="DialogClosed">
    <el-form ref="avatarRef" label-width="110px" enctype="multipart/form-data">
      <div style="margin-left: 155px">点击选取头像</div>
      <el-form-item>
        <el-upload
            class="avatar-uploader"
            action=""
            ref="upload"
            :http-request="upload"
            :show-file-list="false"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            :on-change="filePreview">
          <img v-if="newAvatarSrc" :src="newAvatarSrc" class="avatar-style" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <span name="footer" class="dialog-footer">
        <el-button @click="DialogClosed(false)">取消</el-button>
        <el-button type="primary" @click="changeAvatar">确定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'NaviBar',
  data() {
    return {
      isLogin: true,
      userName: "user",
      defaultSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      avatarSrc: '',
      isLookInfo: false,
      imgSize: "height:45px;width:45px",
      links: ["message","collect","history"],
      items: ["消息","收藏","历史"],
      DialogVisible: false,
      newAvatarSrc: '',
    }
  },
  components: {
  },
  methods: {
    LookIn() {
      this.isLookInfo=true;
      this.imgSize="padding-top:60px;height:70px;width:70px";
    },
    LookOut() {
      this.isLookInfo=false;
      this.imgSize="height:45px;width:45px";
    },
    logOut() {
      this.isLogin=false;
      this.LookOut();
      this.avatarSrc=this.defaultSrc;
      this.$message.success("注销成功！")
      this.$store.dispatch("clearUserInfo");
    },
    userClick() {
      this.$router.push("userCenter");
    },
    updateAvatar(){
      console.log("aaaaa")
      this.DialogVisible=true
    },
    DialogClosed(isOk){
      if (isOk){
        this.$refs.avatarRef.resetFields();
        this.newAvatarSrc = '';
      }
      this.DialogVisible=false
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },
    filePreview(e){
      this.newAvatarSrc = URL.createObjectURL(e.raw);
    },
    changeAvatar(){
      this.$refs.upload.submit();
    },
    async upload(file) {
      let fd = new FormData();
      //fd.append("email", window.sessionStorage.email);
      fd.append("email", '2041341499@qq.com');
      fd.append("avatar", file.file);
      console.log(fd);
      const {data: res} = await this.$axios.post("/user/changeAvatar/", fd);
      console.log(res);
      if (res.result === 0) {
        window.sessionStorage.setItem('avatar', 'http://' + res.url);
        this.avatarSrc = 'http://' + res.url;
        this.newAvatarSrc = '';
        this.$message.success("更改头像成功");
        this.$router.go(0);
      }
      this.DialogVisible=false;
    },
  },
  created() {
    this.isLogin=this.$store.getters.isLogin;
    if(this.isLogin)
    {
      // avator src
      this.avatarSrc=this.defaultSrc;
    }
    else this.avatarSrc=this.defaultSrc;
  }
}
</script>

<style scoped>
svg
{
  height: 18px;
  width: 18px;
}
.naviBar
{
  position: fixed;
  top: 0px;
  display: flex;
  height: 70px;
  align-items: center;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  width: 100%;
}
.flex-grow
{
  flex-grow: 1;
}
.avatar
{
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 70px;
}
.avatar img
{
  height: 45px;
  width: 45px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}
/*
.avatar img:hover
{
  padding-top: 60px;
  height: 70px;
  width: 70px;
  transition: all 0.3s ease;
}
*/
.info
{
  position: absolute;
  border: 1px solid rgb(222, 222, 222);
  background-color: white;
  padding: 45px 20px 15px 20px;
  top: 100%;
  right: 141px;
  margin-top: -6px;
  width: 260px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  z-index: 900;
  cursor: pointer;
}
.userInfo div
{
  display: flex;
  align-items: center;
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  padding: 10px;
  margin: 2px 8px;
  border-radius: 8px;
}
.userInfo div:nth-child(1)
{
  display: block;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
}
.userInfo div:nth-child(2):hover,
.userInfo div:nth-child(4):hover
{
  background-color: rgb(240, 240, 240);
}
hr
{
  border: none;
  height: 1px;
  background-color: var(--el-border-color);
}
.login
{
  margin-top: 15px;
  font-weight: 300;
  font-size: 16px;
  color:white;
  border-radius: 5px;
  height: 38px;
  line-height: 38px;
  background-color: #00c3ff;
  user-select: none;
  -webkit-user-select:none;
}
.login a{color: white}
.login:active
{
  background-color: rgb(100, 200, 237);
}
.arow
{
  height: 15px;
  width: 15px;
  padding-left: 116px;
}
ul{margin-right:20px}
li
{
  float: left;
  padding: 0 20px;
  text-align: center;
  height: 70px;
  line-height: 70px;
  cursor: pointer;
}
li:hover
{
  background-color: rgb(222, 222, 222);
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-style {
  width: 178px;
  height: 178px;
  display: block;
}
</style>