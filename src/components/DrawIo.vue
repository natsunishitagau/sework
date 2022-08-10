<template>
  <div>
    <div>
        <el-header>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#FFF"
                style="padding-left: 10%; padding-right: 10%">
                <el-menu-item @click="goBack"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></svg></el-menu-item>
                <el-menu-item index="myProject" >项目名称: {{projectName}}</el-menu-item>
                <el-menu-item index="avatar" style="float: right;margin-right: -60px">
                    <el-avatar :src="oldAvatar"></el-avatar>
                </el-menu-item>
                <el-menu-item @click="gotoProto" style="margin-left: 400px">项目原型</el-menu-item>
                <el-menu-item index="Document" @click="gotoDoc">项目文档</el-menu-item>
                <el-menu-item>UML图</el-menu-item>
                <el-menu-item @click="logout" style="float: right">退出登录</el-menu-item>
            </el-menu>
        </el-header>
        <svg class="icon1" style="width: 15px;height: 15px;position: absolute; top:22px;left:30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></svg>
    </div>
    <div style="margin-left:3%">
      <el-button small color="primary" @click="save" icon="el-icon-delete-solid">保存</el-button>
      <el-button small color="primary" @click="clear" icon="el-icon-s-claim">清空</el-button>
    </div>
    <div ref="container" class="custom-container" />

    <div ref="dragDiv" class="float-drag-button" @click="drawer = true">
        <span>菜单栏</span>
    </div>
    <el-drawer class="content"
                :title="nickname"
                :visible.sync="drawer"
                :direction="direction"
                :size="drawer_size">
        <div class="avatarWrapper" @click="gotoPersonalCenter">
            <el-avatar :src="oldAvatar" :size="avatarSize"></el-avatar>
        </div>
        <hr/>
        <div class="right-aside">
            <div @click="recent" style="margin-left:20px; margin-top: 60px; cursor:pointer">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8="" style="width:16px;height:16px;margin-left:10px;">
                    <path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z">
                    </path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z">
                </path>
                    <path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z">
                    </path>
                </svg>
                最近浏览
            </div>
            <div @click="collect" style="margin-left:20px; margin-top: 60px; cursor:pointer">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8="" style="width:16px;height:16px;margin-left:10px;">
                    <path fill="currentColor" d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z">
                    </path>
                </svg>
                我的消息
            </div>
        </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from 'axios'
import mxgraph from '@/utils/mxgraph'
const { mxGraph, mxGraphModel, mxUtils, mxCell, mxToolbar, mxGeometry, mxEvent, mxCodec } = mxgraph
const MxGraph = mxGraph
const MxGraphModel = mxGraphModel
const MxUtils = mxUtils
const MxCell = mxCell
const MxToolbar = mxToolbar
const MxGeometry = mxGeometry
const MxEvent = mxEvent
const MxCodec = mxCodec

export default {
    name: 'MxgraphEdit',
    data() {
        return {
            model: null,
            graph: null,
            activeIndex: 'myProject',
            oldAvatar: window.sessionStorage.getItem('src'),
            projectName: sessionStorage.getItem('project'),
            nickname: window.sessionStorage.getItem("nickname"),
            drawer: false,
            direction: 'rtl',
            drawer_size: '200px',
            avatarSize: 80,
            jsonData: {}
        }
    },
    created() {
        this.getURLData()
    },
    mounted() {
        // 延迟300ms,使mounted取到created获得的值
        setTimeout(() => {
            const json = this.jsonData
            const xml = this.$x2js.js2xml(json)
            console.log(xml)
            console.log(json)
            console.log('MxgraphEdit')
            // 创建一个div作为toolbar的容器
            const tbContainer = document.createElement('div')
            tbContainer.style.position = 'absolute'
            tbContainer.style.overflow = 'hidden'
            tbContainer.style.padding = '2px'
            tbContainer.style.left = '0px'
            tbContainer.style.top = '0px'
            tbContainer.style.width = '24px'
            tbContainer.style.bottom = '0px'
            this.$refs.container.appendChild(tbContainer)
            // 创建一个mxToolbar
            const toolbar = new MxToolbar(tbContainer)
            toolbar.enabled = false
            // 创建一个div作为graph的容器
            const container = document.createElement('div')
            container.style.position = 'absolute'
            container.style.overflow = 'hidden'
            container.style.left = '24px'
            container.style.top = '0px'
            container.style.right = '0px'
            container.style.bottom = '0px'
            container.style.background = 'url("./mxgraph/images/grid.gif")'

            this.$refs.container.appendChild(container)
            this.model = new MxGraphModel()
            this.graph = new MxGraph(container, this.model)
            this.graph.setConnectable(true)
            this.graph.setMultigraph(false)

            const addVertex = (icon, w, h, style) => {
                const vertex = new MxCell(null, new MxGeometry(0, 0, w, h), style)
                vertex.setVertex(true)
                const img = this.addToolbarItem(this.graph, toolbar, vertex, icon)
                img.enabled = true
                this.graph.getSelectionModel().addListener(MxEvent.CHANGE, () => {
                    const tmp = this.graph.isSelectionEmpty()
                    MxUtils.setOpacity(img, (tmp) ? 100 : 20)
                    img.enabled = tmp
                })
            }
            addVertex('./mxgraph/images/actor.gif', 30, 40, 'shape=actor')
            addVertex('./mxgraph/images/text.gif', 30, 40, 'shape=text')
            addVertex('./mxgraph/images/rectangle.gif', 50, 40, 'shape=text')
            addVertex('./mxgraph/images/rounded.gif', 100, 40, 'shape=rounded')
            addVertex('./mxgraph/images/ellipse.gif', 40, 40, 'shape=ellipse')
            addVertex('./mxgraph/images/rhombus.gif', 40, 40, 'shape=rhombus')
            addVertex('./mxgraph/images/triangle.gif', 40, 40, 'shape=triangle')
            addVertex('./mxgraph/images/cylinder.gif', 40, 40, 'shape=cylinder')

            let doc = MxUtils.parseXml(xml)
            let codec = new MxCodec(doc)
            codec.decode(doc.documentElement, this.graph.getModel())
        }, 300);

        this.$nextTick(() => {
            let dragDiv = this.$refs.dragDiv;
            let clientOffset = {};
            // 绑定鼠标按下事件
            dragDiv.addEventListener("mousedown", (event) => {
                let offsetX = dragDiv.getBoundingClientRect().left;
                let offsetY = dragDiv.getBoundingClientRect().top;
                let innerX = event.clientX - offsetX;
                let innerY = event.clientY - offsetY;
                console.log(offsetX, offsetY, innerX, innerY);
                clientOffset.clientX = event.clientX;
                clientOffset.clientY = event.clientY;
                document.onmousemove = function(event) {
                    dragDiv.style.left = event.clientX - innerX + "px";
                    dragDiv.style.top = event.clientY - innerY + "px";
                    let dragDivTop = window.innerHeight - dragDiv.getBoundingClientRect().height;
                    let dragDivLeft = window.innerWidth - dragDiv.getBoundingClientRect().width;
                    dragDiv.style.left = dragDivLeft + "px";
                    if (dragDiv.getBoundingClientRect().top <= 0) {
                        dragDiv.style.top = "0px";
                    }
                    if (dragDiv.getBoundingClientRect().top >= dragDivTop) {
                        dragDiv.style.top = dragDivTop + "px";
                    }
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }, false);
            // 绑定鼠标松开事件
            dragDiv.addEventListener('mouseup', (event) => {
                let clientX = event.clientX;
                let clientY = event.clientY;
            })
        });
    },

    methods: {
        gotoProto(){
            this.$router.push({name:'prototype'})
        },
        async getURLData() {
            try {
                const res = await axios.post('/project/checkUML/', this.$qs.stringify({
                    email: sessionStorage.getItem('email'),
                    groupName: sessionStorage.getItem('group'),
                    proName: sessionStorage.getItem('project')
                }))
                console.log(res)
                if(res.data.result === 0) {
                    this.jsonData = JSON.parse(res.data.content)
                }
                else {
                    this.$message.error('该图已失效，请重新绘制')
                }
            } catch(err) {
                console.log(err);
            }
        },
        gotoCenter(){
            this.$router.push({name:'userInfo'})
        },
        handleSelect(key, keyPath) {
            if (key === '/workSpace/groupProject' || key === '/home'
                || key === '/workSpace') {
                this.$router.push({ path: key })
            }
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
                this.$router.push({path: '/login'})
            }).catch(() => {

            });
        },
        gotoPersonalCenter() {
            this.$router.push({name: 'userInfo'})
        },
        goBack() {
            this.$router.push({ name: 'workSpace' })
        },
        gotoDoc(){
            this.$router.push({name:'document'})
        },
        // 最近浏览
        recent() {
            this.$router.push({name: 'recentLook'});
        },
        //创建团队
        newGroup() {
            this.$router.push({name: 'newGroup'});
        },
        //收藏夹
        collect() {
            sessionStorage.setItem('destination', 'message')
            this.$router.push({name: 'collectProject'});
        },
        addToolbarItem(graph, toolbar, prototype, image) {
            const funct = function(graph, evt, cell, x, y) {
                graph.stopEditing(false)
                const vertex = graph.getModel().cloneCell(prototype)
                vertex.geometry.x = x
                vertex.geometry.y = y
                graph.addCell(vertex)
                graph.setSelectionCell(vertex)
            }
            const img = toolbar.addMode(null, image, function(evt, cell) {
                const pt = this.graph.getPointForEvent(evt)
                funct(graph, evt, cell, pt.x, pt.y)
            })
            MxEvent.addListener(img, 'mousedown', function(evt) {
                if (img.enabled === false) {
                MxEvent.consume(evt)
                }
            })
            MxUtils.makeDraggable(img, graph, funct)
            return img
        },
        save() {
            const codec = new MxCodec()
            const encodedModel = codec.encode(this.graph.getModel())
            const xml = mxUtils.getXml(encodedModel)
            const json = this.$x2js.xml2js(xml)
            localStorage.setItem('mxgraphxml', xml)
            localStorage.setItem('mxgraphjson', JSON.stringify(json))

            this.$axios.post('/project/saveUML/', this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group'),
                proName: sessionStorage.getItem('project'),
                content: JSON.stringify(json)
            })).then(res=>{
                console.log(res)
                if(res.data.result===0){
                    this.$message.success('保存成功')
                }
            })

            console.log(xml)
            console.log(json)
        },

        clear() {
            localStorage.removeItem('mxgraphxml')
            localStorage.removeItem('mxgraphjson')
            const json = localStorage.getItem('mxgraphjson') ? JSON.parse(localStorage.getItem('mxgraphjson')) : {}
            const xml = this.$x2js.js2xml(json)
            console.log(xml)
            console.log(json)
            this.graph.removeCells(this.graph.getChildVertices(this.graph.getDefaultParent()))
        }
    }
}
</script>
<style lang="scss" scoped>
//.icon1:hover{
//    cursor: pointer;
//}
.custom-container {
  position: absolute;
  height: 100%;
  width: 95%;
  background-color: #ffffff;
}

.float-drag-button {
    position: absolute;
    right: 0;
    top: 40%;
    z-index: 6666;
    padding: 13px;
    width: 42px;
    opacity: 1;
    background: linear-gradient(#cee9ee, #8d9ea2);
    border-radius: 8px 0px 0px 8px;
    box-shadow: 0px 2px 15px 0px rgba(9,41,77,0.15);
    cursor: move;
    span {
        font-size: 16px;
        color: #333333;
        line-height: 24px;
        user-select: none;
    }
}

.content {
    padding-left: 90px;
    height: 100%;
    display: flex;
    flex: 1;
}

.right-aside {
    width: 200px;
    font-size: 15px;
    height: 100%;
    flex-direction: column;
    border-right: 1px solid silver;
}

.avatarWrapper {
    padding-left: 65px;
}
</style>
