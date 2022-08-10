<template>
    <div>
        <header>分享链接</header>
        <hr/>
        <div class="info">
            <el-col :span="12">
                <el-card style="height:500px; margin-right:30px; box-shadow: 0 4px 4px rgb(0,0,0,0,1.5) !important;">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="搜索团队:">
                            <el-input placeholder="请输入团队名称" v-model="form.groupName" clearable/>
                        </el-form-item>
                        <hr/>
                        <el-form-item label="搜索项目:" style="margin-top:20px">
                            <el-input placeholder="请输入项目名称" v-model="form.proName" clearable/>
                        </el-form-item>
                    </el-form>
                    <el-button type="info" plain @click="confirm" style="margin-left:370px !important; margin-top:20px;">确 认</el-button>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card style="height:500px; margin-left:30px; box-shadow: 0 4px 4px rgb(0,0,0,0,1.5) !important;" v-show="show">
                    <el-form :model="link" label-width="50px">
                        <el-form-item label="链接:">
                            {{ this.link.linkURL }}
                        </el-form-item>
                    </el-form>
                    <hr/>
                    <el-button type="info" plain @click="jump" style="margin-left:50px !important; margin-top:20px;">点击跳转</el-button>
                    <el-button type="info" plain @click="cancel" style="margin-left:50px !important; margin-top:20px;">取 消</el-button>
                </el-card>
            </el-col>
        </div>
    </div>

</template>

<script>
export default {
    name: "shareLink",
    data() {
        return {
            form: {
                email: "",
                groupName: "",
                proName: ""
            },
            show: true,
            groupName: '',
            proName: '',
            link: {
                linkURL: ''
            },
            code: {
                code: '',
            },
            targetURL: ''
        }
    },
    methods: {
        confirm() {
            const that = this
            this.form.email=sessionStorage.getItem("email")
            this.$axios.post('/project/sharePrototype/',this.$qs.stringify(this.form)).then(res => {
                console.log(res);
                if(res.data.result === 0) {
                    this.show = true
                    this.link.linkURL = res.data.URL
                    this.groupName = this.form.groupName
                    this.proName = this.form.proName
                    sessionStorage.setItem('group', this.groupName)
                    sessionStorage.setItem('project', this.proName)
                }
                else that.$message.error("团队或项目名称有误！")
            })
        },
        jump() {
            //window.location.href = "http://localhost:8080/#/getPreviews/?email=2041341499@qq.com&groupName=sxc&proName=p1"
            this.code.code = this.link.linkURL.split('=')[1]
            this.$axios.post('/project/checkSharedPrototype/', this.$qs.stringify(this.code)).then(res => {
                if(res.data.result === 0) {
                    this.targetURL = ''
                    this.targetURL += 'http://localhost:8080/#/getPreviews/?email='
                    this.targetURL += this.form.email
                    this.targetURL += '&groupName='
                    this.targetURL += this.groupName
                    this.targetURL += '&proName='
                    this.targetURL += this.proName
                    console.log(this.targetURL)
                    sessionStorage.setItem('email', this.form.email)
                    sessionStorage.setItem('group', this.groupName)
                    sessionStorage.setItem('project', this.proName)
                    window.location.href = this.targetURL
                }
                else this.$message.error("团队或项目名称有误！")
            })
        },
        cancel() {
            this.$axios.post('/project/cancelSharePrototype/', this.$qs.stringify(this.form)).then(res=>{
                if(res.data.result === 0) {
                    this.show = false
                } else {
                    this.$message.error("团队或项目名称有误！")
                }
            })
        }
    },
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
    width: 1000px;
    margin-top: 50px;
    font-size: 18px;
}
</style>
