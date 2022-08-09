<template>
  <div>

    <header>
      <span>文档编辑</span>
      <div>

        <span class="mess" @click="saveText">
          <i class="el-icon-s-order"></i>
          <span>保存文档</span>
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

  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

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
        URL: ""
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
    }
  },
  methods: {
    getInfo() {
      this.form.URL=this.url;
      this.$axios.post('/project/checkDocument/',this.$qs.stringify(this.form))
      .then(res =>{
        this.form.content=res.data.content;
        this.html=res.data.content;
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
          URL: that.url,
          content: that.form.content
      })).then(res =>{
        that.$message.success("保存成功");
      })
    },
    back() {
      this.$router.push({name:'proInterface'})
    },
    initWebSocket() {
      this.websock=new WebSocket("ws://81.70.16.241:8001/saveDocument/"+this.url.replace('/','_')+'/');
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
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.editTime=new Date();
    this.getInfo();
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor
  },
  watch: {
    html(newValue, oldValue)
    {
      this.form.content=newValue;
      var nowTime=new Date();
      
      if(this.websock.readyState===1&&(nowTime-this.editTime>=1200))
      {
        this.editTime=nowTime;
        this.sendWebSocketMessage(this.form);
      }
    },
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
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
