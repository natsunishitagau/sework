<template>
  <div class="desk">
    <div class="fileTree">

      <el-tree :data="data" :props="defaultProps" @node-expand="openDir" @node-collapse="closeDir"
      :expand-on-click-node="false">

        <span class="custom-tree-node" slot-scope="{ node, data }" @click="nodeClick(node,data)">
          <span @click="handleClick()" class="fileInfo">
            <span v-if="node.label.charAt(node.label.length-1)=='/'">
              <i class="el-icon-folder" v-if="!data.unfold"></i>
              <i class="el-icon-folder-opened" v-else></i>
              &nbsp;
              <span>{{ node.label.substr(0,node.label.length-1) }}</span>
            </span>
            <span v-else @click="edit(node)">
              <i class="el-icon-document"></i>
              <!--
                <i class="el-icon-edit" v-else></i>
              -->
              &nbsp;
              <span>{{ node.label }}</span>
            </span>
            &nbsp;&nbsp;
          </span>
          <span v-show="showNum==data.$treeNodeId" @mouseenter="isLookOp=true" @mouseleave="isLookOp=false">
            <i class="el-icon-more-outline" @click="preOp(node)" v-if="!isInPro||isInText||isText"></i>
            <div v-show="open" @mouseenter="isOperate=true" @mouseleave="isOperate=false" class="operations">
              
              <div @click="newFile" v-if="node.label.charAt(node.label.length-1)=='/'">
                新建文档
              </div>
              <div @click="newDir" v-if="!isInPro&&node.label.charAt(node.label.length-1)=='/'">
                新建文件夹
              </div>
              <div @click="changeName(data)" v-if="isText||(!isInRoot&&!isInPro)">
                重命名
              </div>
              <div @click="remove" v-if="isText||(!isInRoot&&!isInPro)">
                删除
              </div>

            </div>

          </span>

        </span>
      </el-tree>

      <el-dialog :visible.sync="isNewFile" title="新建文件" width="400px">
        <el-form :model="form">
          <el-form-item label="文件名称">
            <el-input v-model="newFileName" autocomplete="off" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isNewFile = false">取消</el-button>
            <el-button type="primary" @click="appendFile()"
            >确认</el-button>
          </span>
        </template>
      </el-dialog>


      <el-dialog :visible.sync="isNewDir" title="新建文件夹" width="400px">
        <el-form :model="form">
          <el-form-item label="文件夹名称">
            <el-input v-model="newFileName" autocomplete="off" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isNewDir = false">取消</el-button>
            <el-button type="primary" @click="appendDir()"
            >确认</el-button>
          </span>
        </template>
      </el-dialog>


      <el-dialog :visible.sync="isRename" title="重命名" width="400px">
        <el-form :model="form">
          <el-form-item label="新名称">
            <el-input v-model="newFileName" autocomplete="off" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isRename = false">取消</el-button>
            <el-button type="primary" @click="rename()"
            >确认</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
    <div class="vim-place">
      <div v-if="!docName" class="slogan">欢迎来到文档中心</div>
      <edit-doc2 v-else v-bind:url="form.URL"></edit-doc2>
    </div>
  </div>
</template>

<script>
import EditDoc2 from '../EditDoc2.vue';
export default {
  name: 'docCenter',
  data() {
    return {
      form: {
        email: "",
        groupName: "myteam",
        URL: "",
        oldURL: "",
        newURL: "",
        content: ""
      },
      docName: "",
      showNum: -1,
      isLookOp: false,
      isOperate: false,
      open: false,
      isInRoot: false,
      isInPro: false,
      isInText: false,
      isText: false,
      newFileName: "",
      isNewFile:false,
      isNewDir: false,
      symbol: "",
      isRename: false,
      data: [],
      tarNode: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components: {
    EditDoc2
  },
  methods: {
    getInfo() {
      var that=this;
      this.$axios.post('/project/checkFileTree/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              that.data=res.data.fileTree;
              that.data=[ {
                  label: that.form.groupName+'/',
                  children: that.data
                }
              ]
          })
    },
    openDir(data,node) {
      if(!data.unfold)
        this.$set(data, 'unfold', 1);
      else data.unfold=0;
      this.showNum=data.$treeNodeId;
      var i=node;
      if(i.data.label===this.form.groupName+'/')
        this.isInRoot=true;
      var that=this;
      var use=0;
      while(i.data.label)
      {
        if(i.data.label==='项目文件夹/')
        {
          that.isInPro=true;
          if(use==1) that.isInText=true;
          else that.isInText=false;
          if(use==2) that.isText=true;
          else that.isText=false;
          return ;
        }
        i=i.parent;
        use++;
      }
      
      that.isInText=false;
      that.isInPro=false;
    },
    closeDir(data) {
      data.unfold=0;
    },
    nodeClick(node,data) {
      this.showNum=data.$treeNodeId;
      var i=node;
      if(i.data.label===this.form.groupName+'/')
        this.isInRoot=true;
      else this.isInRoot=false;
      var that=this;
      var use=0;
      while(i.data.label)
      {
        if(i.data.label==='项目文件夹/')
        {
          that.isInPro=true;
          if(use==1) that.isInText=true;
          else that.isInText=false;
          if(use==2) that.isText=true;
          else that.isText=false;
          return ;
        }
        i=i.parent;
        use++;
      }
      that.isInText=false;
      that.isInPro=false;
    },
    edit(node) {
      sessionStorage.setItem("document",node.data.label);
      this.docName=sessionStorage.getItem("document");
      this.preOp(node);
    },
    preOp(node) {
      this.open=true;
      this.newFileName=node.data.label;
      if(this.newFileName.charAt(node.label.length-1)=='/')
      {
        this.newFileName=this.newFileName.substr(0,this.newFileName.length-1)
      }
      //获取url
      var url="";
      var parUrl="";
      var i=node;
      var time=1;
      while(i.parent.data.label)
      {
        url=i.data.label+url;
        if(time==1) time=2;
        else parUrl=i.data.label+parUrl;

        i=i.parent;
      }
      url=i.data.label+url;
      this.form.URL=url;
      this.form.oldURL=url;
      if(time==1)
        this.form.newURL=parUrl;
      else 
        this.form.newURL=i.data.label+parUrl;

      this.tarNode=node;

    },
    newFile() {
      this.isNewFile=true;
      this.newFileName="";
    },
    appendFile() {
      this.form.URL=this.form.URL+this.newFileName;
      var that=this;
      this.$axios.post('/project/createDocument/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              if(res.data.result==0)
              {
                //this.getInfo();
                const newChild = { label: that.newFileName, children: [] };
                if (!that.tarNode.data.children) {
                  that.$set(that.tarNode.data, 'children', []);
                }
                that.tarNode.data.children.push(newChild);

                this.newFileName="";
                this.isNewFile=false;
              }
              else that.$message.error(res.data.message);
          })
    },
    newDir() {
      this.isNewDir=true;
      this.newFileName="";
    },
    appendDir() {
      this.form.URL=this.form.URL+this.newFileName+'/';
      var that=this;
      this.$axios.post('/project/createDocument/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              if(res.data.result==0)
              {
                //this.getInfo();
                const newChild = { label: that.newFileName+'/', children: [] };
                if (!that.tarNode.data.children) {
                  that.$set(that.tarNode.data, 'children', []);
                }
                that.tarNode.data.children.unshift(newChild);

                this.newFileName="";
                this.isNewDir=false;
              }
              else that.$message.error(res.data.message);
          })
    },
    changeName(data) {
      var that=this;
      if(data.label.charAt(data.label.length-1)=='/')
        that.symbol="/";
      else that.symbol="";
      that.isRename=true;
    },
    rename() {
      this.form.oldURL=this.form.oldURL+this.symbol;
      this.form.newURL=this.form.newURL+this.newFileName+this.symbol;
      var that=this;
      this.$axios.post('/project/changeDocumentInfo/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              if(res.data.result==0)
              {
                that.$message.success("修改成功!");
                //that.getInfo();
                that.tarNode.data.label=that.newFileName;

                that.isRename=false;
              }
              else that.$message.error(res.data.message);
          })
    },
    remove() {
      var that=this;
      this.$axios.post('/project/removeDocument/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              that.$message.success("删除成功!");
              //that.getInfo();
              const parent=that.tarNode.parent;
              for(var i in parent.data.children)
              {
                if(parent.data.children[i].label==that.tarNode.data.label)
                  break;
              }
              const children = parent.data.children || parent.data;
              children.splice(i, 1);
          })
    },
    handleClick() {
      //save
      if(!this.isOperate)
      {
        this.open = false;
      }

      if(!this.isLookOp)
      {
        this.showNum = -1;
      }
    }
  },
  created() {
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.docName="";
    this.getInfo();
  },
  mounted() {
    window.addEventListener('click',this.handleClick)
  },
  destroyed() {
    window.removeEventListener('click',this.handleClick)
  }
}
</script>


<style scoped>
  .desk
  {
    display: flex;
  }
  .fileTree
  {
    width: 220px;
    min-width: 220px;
    height: 100%;
    margin-right: 20px;
  }
  .custom-tree-node 
  {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
  }
  .fileInfo
  {
    flex: 1;
  }
  .operations
  {
    position: absolute;
    background-color: white;
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    left: 144px;
    width: 120px;
  }
  .operations div
  {
    padding: 8px 30px;
    font-size: 10px;
    text-align: center;
  }
  .operations div:hover
  {
    background-color: rgb(240, 240, 240);
  }
  .slogan
  {
    flex: 1;
    text-align: center;
    font-size: 50px;
  }
  .vim-place
  {
    max-width: 100%;
  }
</style>