<template>
    <div class="home">
        <el-header>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#FFF"
                style="padding-left: 10%; padding-right: 10%">

                <el-menu-item index="myProject" >项目名称: {{projectName}}</el-menu-item>
                <el-menu-item index="2">页面名称: {{prototypeName}}</el-menu-item>
                <el-menu-item @click="gotoCenter()">个人中心</el-menu-item>
                <el-menu-item index="avatar" style="float: right">
                    <el-avatar :src="oldAvatar"></el-avatar>
                </el-menu-item>
                <el-menu-item @click="goBack">返回</el-menu-item>
                <el-menu-item index="Document" @click="gotoDoc">项目文档</el-menu-item>
                <el-menu-item index="UML">UML图</el-menu-item>
                <el-menu-item @click="logout" style="float: right">退出登录</el-menu-item>
            </el-menu>
        </el-header>
        <Toolbar style="position: absolute;z-index: 1"/>
        <div class="floatWindow" style="position: absolute; z-index: 5;top: 120px">
            <template v-if="isWindowShow">
                <el-table
                    height="400"
                    :data="protoNames"
                    style="width: 200px">
                    <el-table-column
                        label="页面"
                        width="180">
                        <template slot-scope="scope">
                            <span class="tableRow" @click="choosePro(scope.row)">{{scope.row}}</span>
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
                <div class="sign" @click="closeWindow()">&lt;</div>
            </template>
            <div class="sign2" v-else @click="showWindow()">></div>
        </div>
        <main>

            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList />
                <RealTimeComponentList />
            </section>
            <!-- 中间画布 -->
            <section class="center">
                <div
                    class="content"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @mousedown="handleMouseDown"
                    @mouseup="deselectCurComponent"
                >
                    <Editor />
                </div>
            </section>
            <!-- 右侧属性列表 -->
            <section class="right">
                <el-tabs v-if="curComponent" v-model="activeName">
                    <el-tab-pane label="属性" name="attr">
                        <component :is="curComponent.component + 'Attr'" />
                    </el-tab-pane>
                    <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
                        <AnimationList />
                    </el-tab-pane>
                    <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
                        <EventList />
                    </el-tab-pane>
                </el-tabs>
                <CanvasAttr v-else></CanvasAttr>
            </section>
        </main>
    </div>
</template>

<script>
import Editor from '@/components/Editor'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import RealTimeComponentList from '@/components/RealTimeComponentList'
import CanvasAttr from '@/components/CanvasAttr'

export default {
    components: { Editor, ComponentList, AnimationList, EventList, Toolbar, RealTimeComponentList, CanvasAttr },
    data() {
        return {
            activeIndex: 'myProject',
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            oldAvatar: window.sessionStorage.getItem('src'),
            projectName: ' ',
            prototypeName:' ',
            protoNames:[],
            isWindowShow:false
        }
    },
    computed: mapState([
        'componentData',
        'curComponent',
        'isClickComponent',
        'canvasStyleData',
        'editor',
    ]),
    created() {
        const that = this
        this.projectName = sessionStorage.getItem('project')
        this.prototypeName = sessionStorage.getItem('protoName')
        this.$axios.post('/project/checkPrototypes/',this.$qs.stringify({
            email: sessionStorage.getItem('email'),
            groupName: sessionStorage.getItem('group'),
            proName: sessionStorage.getItem('project')
        })).then(res => {
            console.log(res)
            if(res.data.result === 0){
                that.protoNames = res.data.protoNames
            }
        })
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        showWindow(){
            this.isWindowShow=true
        },
        closeWindow(){
            this.isWindowShow=false
        },
        handleDelete(){

        },
        gotoDoc(){
            this.$router.push({name:'document'})
        },
        choosePro(item){
            const that = this
            that.prototypeName=item
            sessionStorage.setItem('protoName',item)
            this.$axios.post('project/checkPrototype/', this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group'),
                proName: sessionStorage.getItem('project'),
                protoName: item
            })).then(res => {
                console.log(res)
                if(res.data.result === 0){
                    this.$store.commit('setComponentData', this.resetID(JSON.parse(res.data.canvasData)))
                    this.$store.commit('setCanvasStyle', JSON.parse(res.data.canvasStyle))

                }
            })
        },
        gotoCenter(){
            this.$router.push({name:'userInfo'})
        },
        handleSelect(key, keyPath) {
            if (key === '/workSpace/manageMember' || key === '/home' || key === '/workSpace/groupProject'
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
                this.$router.push({path: '/login'});
            }).catch(() => {

            });
        },
        restore() {
        },

        goBack() {
            this.$router.push({ path: '/proInterface' })
        },

        resetID(data) {
            data.forEach(item => {
                item.id = generateID()
                if (item.component === 'Group') {
                    this.resetID(item.propValue)
                }
            })

            return data
        },

        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            const index = e.dataTransfer.getData('index')
            const rectInfo = this.editor.getBoundingClientRect()
            if (index) {
                const component = deepCopy(componentList[index])
                component.style.top = e.clientY - rectInfo.y
                component.style.left = e.clientX - rectInfo.x
                component.id = generateID()
                this.$store.commit('addComponent', { component })
                this.$store.commit('recordSnapshot')
            }
        },

        handleDragOver(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },

        handleMouseDown(e) {
            e.stopPropagation()
            this.$store.commit('setClickComponentStatus', false)
            this.$store.commit('setInEditorStatus', true)
        },

        deselectCurComponent(e) {
            if (!this.isClickComponent) {
                this.$store.commit('setCurComponent', { component: null, index: null })
            }

            // 0 左击 1 滚轮 2 右击
            if (e.button != 2) {
                this.$store.commit('hideContextMenu')
            }
        },
    },
}
</script>

<style lang="scss">
.home {
    height: 100vh;
    background: #FFE;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;

            & > div {
                overflow: auto;

                &:first-child {
                    border-bottom: 1px solid #ddd;
                }
            }
        }

        .right {
            position: absolute;
            height: 100%;
            width: 288px;
            right: 0;
            top: 0;

            .el-select {
                width: 100%;
            }
        }

        .center {
            margin-left: 200px;
            margin-right: 288px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }

    .global-attr {
        padding: 10px;
    }
}
.tableRow:hover{
    color:deepskyblue;
    cursor: pointer;
}
.sign{
    position: absolute;
    top: 0px;
    left: 200px;
    width: 12px;
    height: 20px;
    background: gray;
}
.sign:hover{
    cursor: pointer;
}
.sign2{
    position: absolute;
    top: 0px;
    width: 12px;
    height: 20px;
    background: gray;
}
.sign2:hover{
    cursor: pointer;
}
</style>
