<template>
  <div>
      <el-header style="width: 100vw">
          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#FFF"
              style="padding-left: 10%; padding-right: 10%">

              <el-menu-item index="myProject" >项目名称: {{form.proName}}</el-menu-item>
              <el-menu-item index="2">文档名称: {{form.docName}}</el-menu-item>
              <el-menu-item index="3" @click="newDoc">创建文档</el-menu-item>
              <el-menu-item @click="gotoCenter()">个人中心</el-menu-item>
              <el-menu-item index="avatar" style="float: right;">
                  <el-avatar :src="oldAvatar"></el-avatar>
              </el-menu-item>
              <el-menu-item @click="goBack">返回</el-menu-item>
              <el-menu-item @click="gotoProto">项目原型</el-menu-item>
<!--              <el-menu-item >项目文档</el-menu-item>-->
              <el-menu-item >UML图</el-menu-item>
              <el-menu-item @click="logout" style="float: right;margin-left: 300px">退出登录</el-menu-item>
          </el-menu>
      </el-header>
    <header>
        <div class="floatWindow" style="position: absolute; z-index: 5;top: 120px">
            <template v-if="isWindowShow">
                <el-table
                    height="400"
                    :data="docNames"
                    style="width: 200px">
                    <el-table-column
                        label="文档"
                        width="180">
                        <template slot-scope="scope">
                            <span class="tableRow" @click="chooseDoc(scope.row)">{{scope.row}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="sign" @click="closeWindow()"><</div>
            </template>
            <div class="sign2" v-else @click="showWindow()">></div>
        </div>
      <span>文档编辑</span>
      <div>

        <span class="mess" @click="saveText">
          <i class="el-icon-s-order"></i>
          <span>保存文档</span>
        </span>

        <span class="export">
          <el-dropdown trigger="click" @command="exportText">
            <el-button type="text" size="medium">
              <i class="el-icon-printer"></i>&nbsp;导出为
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">word</el-dropdown-item>
              <el-dropdown-item command="b">pdf</el-dropdown-item>
              <el-dropdown-item command="c">markdown</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>

        <span class="mess" @click="back">
          <i class="el-icon-refresh-left"></i>
          <span>返回</span>
        </span>

      </div>
    </header>

    <div style="border: 1px solid #ccc; margin-top: 10px;">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 550px; overflow-y: hidden;"
        :defaultConfig="editorConfig"
        v-model="html"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>
      <el-dialog class="dialog2" title="创建文档" v-if="dialogVisible" :visible.sync="dialogVisible" width="35%" :modal-append-to-body="false" center @close="dialogClosed" style="display: flex;height: 375px">
          <el-form :model="insertData" label-width="120px">
              <el-form-item label="文档名称：">
                  <el-input v-model="insertData.docName" />
              </el-form-item>
          </el-form>
          <div style="text-align: center;">
              <el-button type="danger" @click="dialogClosed" circle style="width: 40px;height: 40px;-webkit-border-radius: 80px;float: left; margin-left: 100px;">取消</el-button>
              <el-button type="primary" @click="createDocument()" style="width: 80px; height: 40px;margin:0 auto;">保存</el-button>
          </div>
      </el-dialog>

    <div v-html="printContent" style="display:none" id="print-pdf">
    </div>

  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';
import htmlPdf from '../utils/pdf.js';

export default {
  name: 'editDoc',
  components: { Editor, Toolbar },
  data() {
    return {
        insertData:{
            protoName: '',
            canvasHeight: 1200,
            canvasWidth: 1200,
        },
        dialogVisible:false,
        isWindowShow:false,
        docNames:[],
        activeIndex: 'myProject',
        oldAvatar: window.sessionStorage.getItem('src'),
      form: {
        email: "",
        groupName: "",
        proName: "",
        docName: "",
        content: "",
      },
      editor: null,
      html: '',
      toolbarConfig: {
          // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
          // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {}
      },
      editTime: null,
      printContent: "",
    }
  },
  methods: {
      newDoc(){
          const that = this
          that.dialogVisible = true
      },
      dialogClosed() {
          const that = this
          that.dialogVisible = false
      },
      createDocument(){
          const that = this
          if(that.insertData.docName.length!==0){
              this.$axios.post('/project/createDocument/',this.$qs.stringify({
                  email: sessionStorage.getItem('email'),
                  URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+that.insertData.docName,
                  content:' '
              })).then(res => {
                  console.log(res)
                  if(res.data.result === 0){
                      that.$message.success("创建成功")
                      this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                          email: sessionStorage.getItem('email'),
                          URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'
                      })).then(res => {
                          console.log(res)
                          if(res.data.result === 0){
                              that.docNames = res.data.docNames
                          }
                      })
                      that.dialogVisible = false
                  }else if(res.data.result === 1){
                      that.$message.error("错误的请求")
                  }else{
                      that.$message.error("文档名称已存在")
                  }
              })
          }
      },
      handleDelete(index, docName){
          const that = this
          this.$axios.post('/project/removeDocument/', this.$qs.stringify({
              email: sessionStorage.getItem("email"),
              URL: sessionStorage.getItem('group') +'/项目文件夹/'+sessionStorage.getItem('project')+'/'+docName,
          })).then(res =>{
              console.log(res)
              if(res.data.result === 0){
                  that.$message.success("删除文档成功")
              }else{
                  that.$message.error("请求错误")
              }
              this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                  email: sessionStorage.getItem('email'),
                  URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'
              })).then(res =>{
                  console.log(res)
                  if(res.data.result === 0){
                      that.docNames = res.data.docNames
                  }
              })
          })
      },
      showWindow(){
          this.isWindowShow=true
      },
      closeWindow(){
          this.isWindowShow=false
      },
      gotoProto(){
          this.$router.push({name:'prototype'})
      },
      logout() {
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$message({
                  type: 'success',
                  message: '已退出登录!'
              });
              window.sessionStorage.clear();
              this.$router.push({path: '/login'});
          }).catch(() => {

          });
      },
      handleSelect(key, keyPath) {
          if (key === '/workSpace/manageMember' || key === '/home' || key === '/workSpace/groupProject'
              || key === '/workSpace') {
              this.$router.push({ path: key })
          }
      },
      goBack() {
          this.$router.push({ path: '/workSpace' })
      },
      gotoCenter(){
          this.$router.push({name:'userInfo'})
      },
      getInfo(){
          this.form.proName=sessionStorage.getItem("project");
          this.form.docName=sessionStorage.getItem("document");
          this.printContent=this.form.content;
          this.$axios.post('/project/checkDocument/',this.$qs.stringify({
              email: sessionStorage.getItem('email'),
              URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+sessionStorage.getItem('document')
          }))
              .then(res =>{
                  this.form.content=res.data.content;
                  this.html=res.data.content;
                  this.printContent=this.form.content;
              })
      },
      onCreated(editor) {
          this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      },
      onChange(editor) {
          console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
      },
      saveText() {
          const that=this;
          const editor = this.editor;
          console.log(editor.getHtml());
          this.form.content=editor.getHtml();
          // alert(that.form.groupName+'/项目文件夹/'+that.form.proName+'/'+that.form.docName)
          console.log(this.form)
          this.$axios.post('/project/saveDocument/',this.$qs.stringify({
              email: that.form.email,
              URL: that.form.groupName+'/项目文件夹/'+that.form.proName+'/'+that.form.docName,
              content: that.form.content
          })).then(res =>{
              that.$message.success("保存成功")
          })
      },
      back() {
          this.$router.push({name:'proInterface'})
      },
      chooseDoc(item){
          const that = this
          that.form.docName = item
          this.$axios.post('/project/checkDocument/',this.$qs.stringify({
              email: sessionStorage.getItem('email'),
              URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+this.form.docName
          }))
              .then(res =>{
                  this.form.content=res.data.content;
                  this.html=res.data.content;
              })
      },
      initWebSocket(){
          this.websock=new WebSocket("ws://81.70.16.241:8001/saveDocument/"+this.form.groupName+"_项目文件夹_"+this.form.proName+'_'+this.form.docName+"/");
          this.websock.onmessage=this.websocketOnMessage;
          this.websock.onopen =this.websocketOnOpen;
          this.websock.onerror=this.websocketOnError;
          this.websock.onclose=this.websocketClose;
      },
      sendWebSocketMessage(msg){
          this.websock.send(JSON.stringify(msg))
      },
      websocketOnMessage(e){
          let msg=JSON.parse(e.data);
          this.html=msg.content;
      },
      websocketOnOpen(e){
          console.log(e);

      },
      websocketOnError(e){
          console.log(e);
      },
      websocketClose(e){
          console.log(e);
      },
      exportText(cmd) {
        switch(cmd) {
          case "a":
            this.printWORD();
            break;
          case "b":
            this.printPDF();
            break;
          case "c": this.printMD();
        }
      },
      printPDF() {
        var Opdf=document.getElementById('print-pdf');
        Opdf.setAttribute('style','display:block');
        htmlPdf.getPdf(sessionStorage.getItem("document"), document.querySelector('#print-pdf'));
        Opdf.setAttribute('style','display:none');
      },
      printWORD() {
        let htmlStr = this.printContent;
        let page = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${htmlStr}
            </body></html>`
        saveAs(
            htmlDocx.asBlob(page, {
                orientation: "landscape"
            }),
            sessionStorage.getItem("document")+".doc"
        )
      },
      printMD() {
        var that=this;
        this.$axios.post('/project/htmlToMarkdowm/',this.$qs.stringify({
            htmlContent: that.printContent
        })).then(res =>{
          console.log(res.data);
          saveAs(
            new Blob([res.data.markdownContent]),
            sessionStorage.getItem("document")+".md"
          )
        })
      }

    },
  mounted() { //ctrl+s保存
    var that=this;
    document.onkeydown = function(e) {
    let key = window.event.keyCode;
    if (key== 83 && e.ctrlKey) {//== 83 && event.ctrlKey
          window.event.preventDefault() //关闭浏览器快捷键
          that.saveText()//;saveProject
        }
    };
    this.initWebSocket();
  },
  created() {
      const that = this
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.form.proName=sessionStorage.getItem("project");
      this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
          email: sessionStorage.getItem('email'),
          URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'
      })).then(res => {
          console.log(res)
          if(res.data.result === 0){
              that.docNames = res.data.docNames
              that.form.docName = res.data.docNames[0]
              this.$axios.post('/project/checkDocument/',this.$qs.stringify({
                  email: sessionStorage.getItem('email'),
                  URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+that.form.docName
              }))
                  .then(res =>{
                      this.form.content=res.data.content;
                      this.html=res.data.content;
                  })
          }
      })
    this.editTime=new Date();
    this.getInfo();
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null)
        return editor.destroy() // 组件销毁时，及时销毁 editor
  },
  watch: {
    html(newValue, oldValue)
    {
      this.form.content=newValue;
      var nowTime=new Date();

      if(this.websock.readyState===1&&(nowTime-this.editTime>=1200))
      {
        this.editTime=nowTime;
        this.sendWebSocketMessage({
          email: this.form.email,
          URL: this.form.groupName+'/项目文件夹/'+this.form.proName+'/'+this.form.docName,
          content: this.form.content
        });
      }
    },
  },
}
</script>

<style scoped>
  i
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
   .export
  {
    margin-left: 20px;
    height: 28.4px;
    line-height: 28.4px;
  }
  ::v-deep .el-button--text{
    font-size: 15px;
    color: black;
  }
  ::v-deep .el-button--medium{
    padding: 0;
  }
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
