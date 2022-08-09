<template>
  <div>

    <header>
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

        @onCreated="onCreated"
      />
    </div>

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
  props: {
    url: String
  },
  data() {
    return {
      form: {
        email: "",
        groupName: "",
        content: "",
        URL: "",
      },
      editor: null,
      html: '',
      toolbarConfig: {
          // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
          excludeKeys: [ 'group-video' ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {}
      },
      printContent: "",
      timer: ''
    }
  },
  methods: {
    getInfo() {
      this.form.URL=this.url;
      this.$axios.post('/project/checkDocument/',this.$qs.stringify(this.form))
      .then(res =>{
        this.form.content=res.data.content;
        this.html=res.data.content;
        this.printContent=this.form.content;
      })
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },

    saveText() {
      const that=this;
      const editor = this.editor;
      this.form.content=editor.getHtml();
      this.printContent=this.form.content;
      // alert(that.form.groupName+'/项目文件夹/'+that.form.proName+'/'+that.form.docName)
      this.$axios.post('/project/saveDocument/',this.$qs.stringify({
          email: that.form.email,
          URL: that.url,
          content: that.form.content
      })).then(res =>{
        that.$message.success("保存成功");
      })
    },
    back() {
      this.$router.push({name:'proInterface'})
    },
    /*
    initWebSocket() {
      this.websock=new WebSocket("ws://81.70.16.241:8001/saveDocument/"+this.url.replace(new RegExp('/',"g"),'_')+'/');
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
      //console.log(msg.nickname)
      // msg.location [0],[1]
      
    },
    websocketOnOpen(e){
      console.log(e);
      this.timer=setInterval(this.send, 2000);
    },
    websocketOnError(e){
      console.log(e);
    },
    websocketClose(e){
      console.log(e);
    },
    */

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
    //this.initWebSocket();
  },
  created() {
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.getInfo();
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor
      clearInterval(this.timer)
  },
  watch: {
    url() {
      this.getInfo();
    }
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
    align-items: center;
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
