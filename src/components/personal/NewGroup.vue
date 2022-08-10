<template>
    <div>
        <header>新建团队</header>
        <hr/>
        <div class="info">
            <div>
                <el-form :model="form" label-width="120px">
                    <el-form-item v-show="form.groupName.length===0" style="color: red">
                        *团队名不能为空
                    </el-form-item>

                    <el-form-item label="团队名称：">
                        <el-input v-model="form.groupName" show-word-limit maxlength="15"/>
                    </el-form-item>

                    
                </el-form>
            </div>
        </div>
        <div class="sure" @click="create">确定</div>
    </div>
</template>

<script>
export default {
    name: 'newGroup',
    data() {
        return {
            form: {
                email: "",
                groupName: ""
            }
        }
    },
    methods: {
        create() {
            var that=this;
            this.$axios.post('/group/createGroup/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    if(res.data.result==0)
                        that.$message.success("创建团队成功！")
                    else that.$message.error("团队名称已存在!")
                })
        }
    },
    created() {
        this.form.email=sessionStorage.getItem("email");
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
    margin-top: 30px;
    font-size: 18px;
    height: 300px;
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
