<template>
    <div>
        <header>修改密码</header>
        <hr/>
        <div class="info">
            <div>
                <el-form :model="form" label-width="120px">
                    <el-form-item label="原密码：">
                        <el-input v-model="form.oldPassword" type="password"/>
                    </el-form-item>
                    <div  v-show="!pwdRight" style="color: red;font-size: 12px;margin-left: 150px">
                        密码应为6~20位且包含字母与数字
                    </div>
                    <el-form-item label="新密码：">
                        <el-input v-model="password1" @keyup.native="checkPassword1(password1)" type="password"/>
                    </el-form-item>
                    <div  v-show="!same" style="color: red;font-size: 12px;margin-left: 150px">
                        两次密码不一致
                    </div>
                    <el-form-item label="确认密码：">
                        <el-input v-model="password2" @keyup.native="checkPassword2(password2)" type="password"/>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span class="change" @click="changePwd" style="padding-left: 25px">提交修改</span>
    </div>

</template>

<script>
export default {
    name: "changePwd",
    data() {
        return {
            form: {
                email: "",
                oldPassword: "",
                newPassword: ""
            },

            password1: "",
            password2: "",
            pwdRight: true,
            same: false
        }
    },
    methods: {
        checkPassword1(password) {
            const pattern = new RegExp( /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,20}$/)
            this.pwdRight = pattern.test(password)
            this.same = (this.password2===password)
        },
        checkPassword2(password) {
            this.same = (this.password1===password)
        },
        changePwd() {
            if(this.pwdRight&&this.same)
            {
                var that=this;
                this.form.email=sessionStorage.getItem("email");
                this.form.newPassword=this.password1;
                console.log(this.form)
                this.$axios.post('/user/changePassword/',this.$qs.stringify(this.form))
                    .then(res =>{
                        console.log(res);
                        if(res.data.result==0)
                        {
                            that.$message.success("修改密码成功！请重新登录。")
                            sessionStorage.setItem("isLogin","")
                            that.$router.push("/login")
                        }
                        else if(res.data.result==2) that.$message.error("密码错误！")
                        else that.$message.error("新密码不能与旧密码相同！")
                    })
            }
            else this.$message.warning("请检查新密码格式！")
        }
    },
    created() {
        if(!sessionStorage.getItem("isLogin"))
            this.$router.push({name:"login"});
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
.info
{
    width: 400px;
    margin-top: 50px;
    font-size: 18px;
}
.change
{
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
.change:active
{
    background-color: rgb(100, 200, 237);
}
</style>
