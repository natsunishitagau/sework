<template>
  <div>
    <header>基本信息</header>
    <hr/>
    <div class="info">
      <div>
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名：">
            <el-input v-model="form.nickname" />
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="form.realname" />
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="form.email" disabled/>
          </el-form-item>
          <el-form-item label="个人简介：">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <img :src="avatarSrc" @click="updateAvatar"/>
    </div>
    <span class="change" @click="changeInfo">修改信息</span>

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
    <div>上传头像图片只能是 JPG 格式且大小不超过10MB</div>
    <span name="footer" class="dialog-footer">
      <el-button @click="DialogClosed(false)">取消</el-button>
      <el-button type="primary" @click="changeAvatar">确定</el-button>
    </span>
  </el-dialog>
  
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data() {
    return {
      avatarSrc: "",
      form: {
        nickname: "",
        realname: "",
        email: "",
        description: ""
      },
      DialogVisible: false,
      newAvatarSrc: "",
    }
  },
  methods: {
    getInfo() {
      var that=this;
      this.avatarSrc=sessionStorage.getItem("src");
      this.$axios.post('/user/checkUserInfo/',this.$qs.stringify(this.form))
      .then(res =>{
        console.log(res);
        that.form.description=res.data.description;
        that.form.nickname=res.data.nickname;
        that.form.realname=res.data.realname;
      })
    },
    changeInfo() {
      //check data

      //
      var that=this;
      this.$axios.post('/user/changeUserInfo/',this.$qs.stringify(this.form))
      .then(res =>{
        console.log(res);
        that.$message.success("修改信息成功！")
      })
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
      fd.append("email", this.form.email);
      fd.append("avatar", file.file);
      console.log(fd);
      const {data: res} = await this.$axios.post("/user/changeAvatar/", fd);
      console.log(res);
      if (res.result === 0) {
        sessionStorage.setItem('src', 'http://81.70.16.241/SummerTermBack' + res.avatarUrl);
        this.avatarSrc = 'http://81.70.16.241/SummerTermBack' + res.avatarUrl;
        this.newAvatarSrc = '';
        this.$message.success("更改头像成功");
        this.$router.push({name:"userInfo"});
      }
      this.DialogVisible=false;
    },
  },
  created() {
    this.form.email=sessionStorage.getItem("email");
    this.getInfo();
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
    padding: 20px 100px 0 10px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 18px;
  }
  img
  {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    cursor: pointer;
  }
  .change
  {
    float:left;
    margin-left: 20%;
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