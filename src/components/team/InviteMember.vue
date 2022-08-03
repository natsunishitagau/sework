<template>
  <div>
    <header>邀请成员</header>
    <hr/>
    <div class="hint">输入用户邮箱，系统将会对目标邮箱发送邀请</div>
    <div class="info">
      <div>
        <el-form :model="form" label-width="120px">
          <el-form-item v-show="!mailRight"> 
            邮箱格式不正确
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.targetEmail" @keyup="checkMail"/>
          </el-form-item>
          
        </el-form>
      </div>
    </div>
    <span class="sure" @click="invite">确定</span>
  </div>
</template>

<script>
export default {
  name: 'inviteMember',
  data() {
    return {
      form: {
        ownerEmail: "",
        groupName: "",
        targetEmail: ""
      },
      mailRight: true
    }
  },
  methods: {
    checkMail() {
      const pattern = new RegExp("^[\\w-]+@[\\w-]+\\.(com|net|org|edu|mil|tv|biz|info)$")
      this.mailRight=pattern.test(this.form.targetEmail)
    },
    invite() {
      var that=this;
      this.$axios.post('/group/inviteGroupMember/',this.$qs.stringify(this.form))
      .then(res =>{
        console.log(res);
        switch(res.data.result)
        {
          case 0:
            that.$message.success("邀请成功，请耐心等待对方确认!");
            break;
          case 2:
            that.$message.error("对应成员不存在!");
            break;
          case 3:
            that.$message.warning("该成员已在团队中!");
        }

      })
    }
  },
  created() {
    this.form.ownerEmail=sessionStorage.getItem("email");
    this.form.groupName =sessionStorage.getItem("group");
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
  .hint
  {
    margin-top: 20px;
    text-align: left;
    text-indent: 20px;
  }
  .info
  {
    width: 400px;
    margin-top: 30px;
    font-size: 18px;
  }
  .sure
  {
    text-align: center;
    float:left;
    margin-left: 25%;
    height: 36px;
    line-height: 36px;
    width: 120px;
    background-color: #00c3ff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  .sure:active
  {
    background-color: rgb(100, 200, 237);
  }
</style>