<template>
    <div>
        <header>
            <span>成员管理</span>
            <div>

              <span class="mess" v-if="pos==0" @click="releaseTeam">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"></path></svg>
                <span>解散团队</span>
              </span>

              <span class="mess" v-else @click="leaveTeam">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632V96zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0V141.248z"></path></svg>
                <span>退出团队</span>
              </span>

            </div>

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
            const that = this;
            this.$confirm("是否确认该操作","提示",{
              iconClass: "el-icon-question",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                showClose: true,
                type: "warning",
            }).then(function(){
                that.$axios.post('/group/deleteGroup/',that.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group')
                })).then(res =>{
                    console.log(res)
                    if(res.data.result==0){
                        that.$message.success("解散成功")
                        sessionStorage.setItem('destination',"userinfo")
                        that.$router.push({name: 'emptyPage'});
                    }else{
                        that.$message.error("请求错误")
                    }
                })
            }).then((data) => {
              
            })
            .catch(function (err) {
              //捕获异常
            });
            
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
    margin-right: 7px;
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
    margin-bottom: 20px;
    font-family: Mulish;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

header>span
{
    font-size: 30px;
    font-weight: 700;
}
.mess
{
    display: flex;
    float: left;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    padding: 5px 6px;
    border-radius: 5px;
}
.mess:hover
{
    background-color: rgb(240, 240, 240);
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
</style>
