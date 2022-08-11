<template>
    <div>
        <header>
            <span>团队项目</span>
            <div>
              <el-input v-model="search" size="mini" prefix-icon="el-icon-search" placeholder="输入项目名搜索"/>
              <span class="newpro" @click="preCreate">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"></path></svg>
                <span>新建项目</span>
              </span>
            </div>
        </header>
        <hr/>

        <div>
          <div v-if="searchData.length!=0">
            <el-table :data="searchData" height="550" borderstyle="width:100%">
                <el-table-column label="项目名" width="280">
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

                <el-table-column prop="status" label="项目状态" width="250">
                    <template #default="scope">
                        <el-dropdown trigger="click">
                            <el-tag type="info" v-if="scope.row.status=='未开始'" style="cursor:pointer;">{{scope.row.status}}</el-tag>
                            <el-tag type="warning" v-else-if="scope.row.status=='进行中'" style="cursor:pointer;">{{scope.row.status}}</el-tag>
                            <el-tag type="success" v-else style="cursor:pointer;">{{scope.row.status}}</el-tag>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="scope.row.status!=='未开始'" @click.native="changeStatus(scope.row.name,'未开始')">未开始</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status!=='进行中'" @click.native="changeStatus(scope.row.name,'进行中')">进行中</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status!=='已完成'" @click.native="changeStatus(scope.row.name,'已完成')">已完成</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>

                <el-table-column prop="time" label="创建时间" width="300" sortable sort-by="time"></el-table-column>

                <el-table-column fixed="right" width="200" label="操作">
                    <template #default="scope">
                        <div @mouseenter="op(scope.row.name)">
                            <span class="op" @click="copy(scope.row.name)">复制</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="op" @click="isRename=true">重命名</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="op" @click="del(scope.row.name)">删除</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="op" @click="shareLink(scope.row.name)" >分享  </span>
                        </div>
                    </template>
                </el-table-column>

            </el-table>
          </div>

          <div v-else>
            <el-empty description="无搜索结果"></el-empty>
          </div>

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
                    <el-input v-model="form.newProName" autocomplete="off"/>
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
        <el-dialog v-if="isShared" :visible.sync="isShared" title="链接" width="550px">
            <el-card>
                项目名称: {{ this.selectProName }}
                <hr/>
                链接: {{ this.link.linkURL }}
                <hr/>
                <el-button type="text" size="small" @click="copyUrl">复制链接</el-button>
                <el-button type="text" size="small" @click="cancel" style="margin-left:20px;">取消分享</el-button>
            </el-card>
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
            search: "",
            searchData:[],
            isCreate: false,
            isRename: false,
            showCollect: -1,
            isShared: false,
            link: {
                linkURL: '',
            },
            selectProName: '',
            urlMap: [],
        }
    },
    methods: {
        changeStatus(name,state){
            const that = this
            this.$axios.post('/group/changeProState/',this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group'),
                proName: name,
                state: state
            })).then(res =>{
                console.log(res)
                if(res.data.result==0){
                    this.$message.success('修改状态成功')
                    that.getInfo()
                }
            })
        },
        copy(proName){
            const that = this
            // alert(proName)
            this.$axios.post('/group/copyProject/',this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group'),
                proName: proName
            })).then(res =>{
                console.log(res)
                if(res.data.result==0){
                    this.$message.success('复制成功!')
                    this.getInfo()
                }else if(res.data.result==1){
                    this.$message.error('请求方式错误')
                }else{
                    this.$message.error('项目名称已存在')
                }
            })
        },
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
                    that.search="";
                    that.searchData=that.tableData;
                })
        },
        lookInfo(item) {
            sessionStorage.setItem("project",item.name);
            this.$router.push({name:'prototype'});
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
            this.form.oldProName=name;
            this.form.newProName=name;
        },
        show(item) {
          this.showCollect=item.$index;
          this.form.proName=item.row.name;
          sessionStorage.setItem("project",item.row.name);
        },
        leave() {
          this.form.proName="";
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
        del(proName) {
            var that=this;
            this.form.proName=proName
            this.$axios.post('/group/deleteProject/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("删除成功！项目进入回收站。")
                    that.getInfo();
                })
        },
        shareLink(proName) {
            const that = this
            this.isShared = true
            this.selectProName = proName
            if(this.urlMap.has(proName)) {
                this.link.linkURL = this.urlMap.get(proName)
            }
            else {
                console.log(this.form)
                this.$axios.post('/project/sharePrototype/',this.$qs.stringify({
                    email: this.form.email,
                    groupName: this.form.groupName,
                    proName: proName
                })).then(res => {
                    console.log(res);
                    if(res.data.result === 0) {
                        this.link.linkURL = res.data.URL
                        this.urlMap.set(proName, this.link.linkURL)
                        this.$message({
                            type: 'success',
                            message: '生成新链接成功！',
                        });
                    }
                    else that.$message.error("团队或项目名称有误！")
                })
            }
        },
        copyUrl () {
            let data = this.link.linkURL
            const inputTag = document.createElement('input');
            document.body.appendChild(inputTag);
            inputTag.setAttribute('value', data);
            inputTag.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$message({
                    type: 'success',
                    message: 'URL已复制到剪切板',
                });
            }
            document.body.removeChild(inputTag);
        },
        cancel() {
            const that = this
            this.$axios.post('/project/cancelSharePrototype/', this.$qs.stringify({
                email: this.form.email,
                groupName: this.form.groupName,
                proName: this.selectProName
            })).then(res=>{
                if(res.data.result === 0) {
                    this.isShared = false
                    this.urlMap.delete(this.selectProName)
                    this.$message({
                        type: 'success',
                        message: '删除链接成功！',
                    });

                } else {
                    this.$message.error("团队或项目名称有误！")
                }
            })
        }
    },
    created() {
        this.form.email=sessionStorage.getItem("email");
        this.form.groupName=sessionStorage.getItem("group");
        this.urlMap = new Map()
        this.urlMap.set('proName', 'shareLink')
        this.getInfo();
    },
    watch: {
      search() {
        if(this.search.length!=0) {
          this.searchData=[];
          for(const item of this.tableData) {
            if(item.name.includes(this.search)) {
              this.searchData.push(item)
            }
          }
        }
        else this.searchData=this.tableData;
      }
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
.el-input
{
  display: inline-flex;
  width: 180px;
  border-radius: 3px;
  margin-left: 20px;
  align-items: center;
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
