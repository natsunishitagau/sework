<template>
    <div>
        <header>
            <div style="float:left">成员管理</div>
            <div class="release" v-if="pos==0" @click="releaseTeam">解散团队</div>
            <div class="release" v-else @click="leaveTeam">退出团队</div>
            <div class="clear"></div>
        </header>

        <hr/>

        <div class="table">
            <el-table :data="tableData" height="550" borderstyle="width:100%">
                <el-table-column label="昵称" width="250">
                    <template #default="scope">
                        <div class="head">
                            <img :src="scope.row.src"/>
                            &nbsp;&nbsp;
                            <a :title="scope.row.nick"
                               @click="lookInfo(scope.row)">
                                {{scope.row.nick}}
                            </a>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column prop="real" label="真实姓名" width="250"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
                <el-table-column prop="pos" label="身份">
                    <template #default="scope">
                        {{posName[scope.row.pos]}}
                    </template>
                </el-table-column>

                <el-table-column width="200" label="操作" v-if="pos!==2">

                    <template #default="scope">
                            <div @mouseenter="operate(scope)">
                                <div v-if="pos<scope.row.pos">
                                    <span class="button1" v-if="scope.row.pos==1" @click="cancel"> 取消管理员 </span>
                                    <span class="button1" v-else @click="set"> 设置管理员 </span>
                                    <span class="button1" @click="kick"> 移出团队 </span>
                                </div>
                            </div>
<!--                        <svg v-if="pos<scope.row.pos" @click="operate(scope)" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z"></path></svg>-->
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="100" v-else></el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'manageMember',
    data() {
        return {
            form: {
                email: "",
                groupName: "",
                ownerEmail: "",
                targetEmail: ""
            },
            tableData: [

            ],
            posName: ["创建者","管理员","成员"],
            pos: 0,
            isOperate: -1
        }
    },
    methods: {
        releaseTeam(){
            const that = this
            this.$axios.post('/group/deleteGroup/',this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group')
            })).then(res =>{
                console.log(res)
                if(res.data.result==0){
                    this.$message.success("解散成功")
                    sessionStorage.setItem('destination',"userinfo")
                    this.$router.push({name: 'emptyPage'});
                }else{
                    this.$message.error("请求错误")
                }
            })
        },
        leaveTeam(){
            const that = this
            this.$axios.post('/group/quitGroup/',this.$qs.stringify({
                email: sessionStorage.getItem("email"),
                groupName: sessionStorage.getItem("group")
            })).then(res =>{
                console.log(res)
                if(res.data.result===0){
                    this.$message.success("退出成功")
                    sessionStorage.setItem('destination',"userinfo")
                    this.$router.push({name: 'emptyPage'});
                }else{
                    this.$message.error("请求错误")
                }
            })
        },
        getInfo() {
            var that=this;
            this.tableData=[];
            this.form.groupName=sessionStorage.getItem("group");
            this.form.email=sessionStorage.getItem('email')
            this.$axios.post('/group/checkGroupMember/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.pos=res.data.selfPosition;
                    var i;
                    for(i=0;i<res.data.emails.length;i++)
                    {
                        var mem={nick:"",real:"",pos:"",email:"",src:""};
                        mem.nick=res.data.members[i];
                        mem.real=res.data.realnames[i];
                        mem.pos =res.data.positions[i];
                        mem.email=res.data.emails[i];
                        mem.src ='http://81.70.16.241/SummerTermBack'+res.data.avatarUrls[i];
                        that.tableData.push(mem);
                    }
                })
        },
        operate(tar) {
            this.form.targetEmail=tar.row.email;
            this.isOperate=tar.$index;
            console.log(this.pos);
            console.log(tar.row)
            // document.addEventListener("click",(e)=>{
            //     if(e.target.className!="op"&&e.target.nodeName!="svg")
            //     {
            //         this.isOperate=-1;
            //     }
            // });
        },
        cancel() {
            var that=this;
            this.$axios.post('/group/cancelAdmin/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("修改权限成功！");
                    that.isOperate=false;
                    that.getInfo();
                })
        },
        set() {
            var that=this;
            this.$axios.post('/group/appointAdmin/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("设置权限成功！");
                    that.isOperate=false;
                    that.getInfo();
                })
        },
        kick() {
            var that=this;
            this.$axios.post('/group/deleteGroupMember/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("移出成员成功！");
                    that.isOperate=false
                    that.getInfo();
                })
        }
    },
    created() {
        this.form.email=sessionStorage.getItem("email");
        this.form.ownerEmail=this.form.email;
        // this.getInfo();
    },
    // beforeRouteUpdate (to, from, next) {
    //     next()
    //     this.getInfo()
    // },


    watch: {
        $route: {
            immediate: true, // 一旦监听到路由的变化立即执行
            handler (to, from) {
                this.getInfo()
            }
        }
    },

}
</script>

<style scoped>
svg
{
    height: 13px;
    margin-left: 7px;
    cursor: pointer;
}
img
{
    width: 28px;
    height: 28px;
    cursor: pointer;
    border-radius: 50%;
}
.head
{
    display: flex;
    align-items: center;
}
header
{
    text-align: left;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    font-family: Mulish;
}
.op
{
    position: absolute;
    display: block;
    padding: 10px 0;
    width: 120px;
    font-size: 12px;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 15%);
    background-color: white;
    border-radius: 6px;
}
.button1:hover{
    cursor: pointer;
}
.op div
{
    cursor: pointer;
    text-align: center;
    padding: 3px 0;
}
.op div:hover
{
    background-color: rgb(240,240,240);
}
.clear{
    clear: both;
}
.release{
    float: right;

}
.release:hover{
    cursor: pointer;
    background: gray;
}
</style>
