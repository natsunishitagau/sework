<template>
    <div>
        <header>
            <span>消息通知</span>
            <div>

        <span class="mess" @click="renewMessage()">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>
          <span>刷新消息</span>
        </span>

                <span class="mess" @click="clearMessage()">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path></svg>
          <span>清空消息</span>
        </span>

            </div>
        </header>
        <hr/>
        <div v-if="tableData.length == 0">
            <el-empty description="暂无消息通知"></el-empty>
        </div>

        <div v-else>
            <el-table :data="tableData" height="500" borderstyle="width:100%">
                <el-table-column label="主题" width="360">
                    <template #default="scope">
                        <span class="red" v-if="scope.row.read==0"></span>
                        <a :title="scope.row.title"
                           @click="lookInfo(scope.row.ids)">
                            {{scope.row.title}}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="sender" label="发送者" width="180"></el-table-column>
                <el-table-column prop="time" label="发送时间" sortable sort-by="time"></el-table-column>
                <el-table-column fixed="right" width="100">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="del(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>

</template>

<script>
export default {
    name: "messageCheck",
    data() {
        return {
            form: {
                email: "",
                time: "",
                ID: ""
            },
            tableData: [],
        }
    },
    methods: {
        getInfo() {
            var that=this;
            this.tableData=[];
            this.$axios.post('/message/checkMessages/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    var i;
                    for(i=0;i<res.data.titles.length;i++)
                    {
                        var mes={title:"",time:"",read:"",sender:"",ids:""};
                        mes.title=res.data.titles[i];
                        mes.time =res.data.times[i];
                        mes.read =res.data.isRead[i];
                        mes.sender=res.data.senders[i];
                        mes.ids=res.data.IDs[i];
                        that.tableData.push(mes);
                    }
                })
        },
        renewMessage() {
            this.$message.success("刷新成功");
            this.getInfo();
        },
        clearMessage() {
            var that=this;
            this.$axios.post('/message/deleteMessages/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("清空成功");
                    that.getInfo();
                })
        },
        lookInfo(ids) {
            this.$router.push({name: 'messageContent',params: {ID:ids} });
        },
        del(i) {
            this.form.time=i.time;
            this.form.ID=i.ids;
            var that=this;
            this.$axios.post('/message/deleteMessage/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("删除成功");
                    that.getInfo();
                })
        }
    },
    created() {
        if(!sessionStorage.getItem("isLogin"))
            this.$router.push({name:"login"});
        this.form.email=sessionStorage.getItem("email");
        this.getInfo();
    }
}
</script>

<style scoped>
svg
{
    height: 18px;
    margin-right: 4px;
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
.red::before
{
    content: "";
    position: absolute;
    left: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: red;
    top: 16px;
}
a{color: black; cursor: pointer}
a:hover{text-decoration:underline;text-underline-offset: 1px;}
</style>
