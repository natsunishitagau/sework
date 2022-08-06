<template>
    <div>
        <header>
            <span>团队项目</span>
            <div>
        <span class="newpro" @click="preCreate">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"></path></svg>
          <span>新建项目</span>
        </span>
            </div>
        </header>
        <hr/>

        <div>
            <el-table :data="tableData" height="550" borderstyle="width:100%">
                <el-table-column label="项目名" width="300">
                    <template #default="scope">
                        <div @mouseenter="show(scope)" @mouseleave="leave">
                          <a :title="scope.row.name"
                            @click="lookInfo(scope.row)">
                              {{scope.row.name}}
                          </a>
                          &nbsp;&nbsp;
                          <span v-show="showCollect==scope.$index">
                            <i class="el-icon-star-on" v-if="scope.row.isCollect" @click="cancelCollect"></i>
                            <i class="el-icon-star-off" v-else @click="Collect"></i>
                          </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="创建时间" width="300"></el-table-column>

                <el-table-column prop="status" label="项目状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status==='进行中'">{{scope.row.status}}</el-tag>
                        <el-tag style="info" v-else-if="scope.row.status==='未开始'">{{scope.row.status}}</el-tag>
                        <el-tag style="success" v-else>{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" width="180" label="操作">
                    <template #default="scope">
                        <div @mouseenter="op(scope.row.name)">
                            <span class="op" @click="isRename=true">重命名</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="op" @click="del">删除  </span>
                        </div>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <el-dialog v-model="isCreate" :visible.sync="isCreate" title="新建项目" width="400px">
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.proName" autocomplete="off" />
                </el-form-item>
            </el-form>

            <template #footer>
        <span class="dialog-footer">
          <el-button @click="isCreate=false">取消</el-button>
          <el-button type="primary" @click="newPro"
          >确认</el-button>
        </span>
            </template>
        </el-dialog>

        <el-dialog v-if="isRename" :visible.sync="isRename" title="项目重命名" width="400px">
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.newProName" autocomplete="off" />
                </el-form-item>
            </el-form>

            <template #footer>
        <span class="dialog-footer">
          <el-button @click="isRename = false">取消</el-button>
          <el-button type="primary" @click="reName"
          >确认</el-button>
        </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "groupProject",
    data() {
        return {
            form: {
                email: "",
                groupName: "",
                proName: "",
                oldProName: "",
                newProName: ""
            },
            tableData: [],
            isCreate: false,
            isRename: false,
            showCollect: -1
        }
    },
    methods: {
        getInfo() {
            var that=this;
            this.tableData=[];
            console.log(this.form)
            this.$axios.post('/group/checkGroupProject/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    var i;
                    for(i=0;i<res.data.status.length;i++)
                    {
                        var pro={name:"",time:"",status:"",isCollect:""};
                        pro.name=res.data.proNames[i];
                        pro.time=res.data.createTimes[i];
                        pro.status=res.data.status[i];
                        pro.isCollect=res.data.isCollect[i];
                        that.tableData.push(pro);
                    }
                })
        },
        lookInfo(item) {
            sessionStorage.setItem("project",item.name);
            this.$router.push({name:'proInterface'});
        },
        preCreate() {
            this.isCreate=true;
            this.proName="";
        },
        newPro() {
            var that=this;
            this.$axios.post('/group/createProject/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    if(res.data.result==0)
                    {
                        that.$message.success("创建成功！");
                        that.isCreate=false;
                        that.form.proName="";
                        that.getInfo();
                    }
                    else that.$message.error("项目名称已存在！");
                })
        },
        op(name) {
            this.form.proName=name;
            this.form.oldProName=name;
            this.form.newProName=name;
        },
        show(item) {
          this.showCollect=item.$index;
          this.form.proName=item.row.name;
          sessionStorage.setItem("project",item.row.name);
        },
        leave() {
          this.showCollect=-1;
        },
        cancelCollect() {
          var that=this;
            this.$axios.post('/group/cancelCollection/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("取消收藏成功！");
                    that.getInfo();
                })
        },
        Collect() {
          var that=this;
          console.log(this.form)
            this.$axios.post('/group/collectProject/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("收藏成功！");
                    that.getInfo();
                })
        },
        reName() {
            var that=this;
            this.$axios.post('/group/renameProject/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    if(res.data.result==0)
                    {
                        that.$message.success("重命名成功！");
                        this.isRename=false;
                        that.getInfo();
                    }
                    else that.$message.error("项目名称已存在！");
                })
        },
        del() {
            var that=this;
            this.$axios.post('/group/deleteProject/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("删除成功！项目进入回收站。")
                    that.getInfo();
                })
        }
    },
    created() {
        this.form.email=sessionStorage.getItem("email");
        this.form.groupName=sessionStorage.getItem("group");
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
.newpro
{
    display: flex;
    float: left;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    padding: 5px 6px;
    border-radius: 5px;
}
.newpro:hover
{
    background-color: rgb(240, 240, 240);
}
.op
{
    font-size: 13px;
    cursor: pointer;
}
.op:hover
{
    color: rgb(0, 162, 255);
    text-underline-offset: 1px;
    text-decoration: underline;
}
a{cursor: pointer;}
a:hover{text-underline-offset: 1px;text-decoration: underline;}
i
{
  cursor:pointer;
}
</style>
