<template>
    <div>
        <el-container>
            <el-aside class="aside">
                <el-table
                    :data="prototypeNames" stripe style="width: 160px;">
                    <el-table-column prop="name" label="名称" align="center">
                        <template #default="scope">
                            <el-button icon="el-icon-document">
                                <a @click="prototypePreview(scope.row)">{{scope.row}}</a>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-aside>
            <el-main class="main">
                <div>
                    <el-breadcrumb separator=">" style="padding-bottom: 10px">
                        <el-breadcrumb-item>项目 {{ projectName }} 原型</el-breadcrumb-item>
                        <el-breadcrumb-item>原型页 {{ prototypeName }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-col :span="24">
                        <el-card class="body">
                            <div ref="container" class="bg">
                                <div class="canvas-container">
                                    <div class="canvas"
                                         :style="{
                                ...getCanvasStyle(canvasStyleData),
                                width: changeStyleWithScale(canvasStyleData.width) + 'px',
                                height: changeStyleWithScale(canvasStyleData.height) + 'px',
                            }">
                                        <ComponentWrapper
                                            v-for="(item, index) in componentData"
                                            :key="index" :config="item"
                                        />
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
import { getStyle, getCanvasStyle } from '@/utils/style'
import ComponentWrapper from '../components/Editor/ComponentWrapper'
import { changeStyleWithScale } from '@/utils/translate'

export default {
    components: { ComponentWrapper },
    data() {
        return {
            activeIndex: 'myProject',
            oldAvatar: window.sessionStorage.getItem('src'),
            avatarSize: 80,
            nickname: window.sessionStorage.getItem("nickname"),
            projectName: '',
            groupName: '',
            email: '',
            prototypeNames: [], // 当前项目所有原型名称
            prototypeName: '', //当前选择原型页
            componentData: [],
            canvasStyleData: { // 页面全局数据
                width: 1200,
                height: 1200,
                scale: 100,
                color: '#000',
                opacity: 1,
                background: '#fff',
                fontSize: 14,
            },
            drawer: false,
            direction: 'rtl',
            drawer_size: '200px'
        }
    },

    created() {
        this.getPrototypes();
    },

    mounted() {
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
            this.$router.push({ name: 'proInterface' })
        },
        // 获取原型名称
        async getPrototypes() {
            let curURL = window.location.href
            console.log(curURL)
            let code = curURL.split('=')[1]
            try {
                const res = await axios.post('/project/checkSharedPrototype/', this.$qs.stringify({
                    'code': code
                }))
                if(res.data.result === 0) {
                    this.projectName = res.data.proName
                    this.groupName = res.data.groupName
                    this.prototypeNames = res.data.protoNames
                    this.email = res.data.email
                    this.oldAvatar = res.data.avatar
                    this.prototypeName = this.prototypeNames[0]
                    this.prototypePreview(this.prototypeName)
                }
                else if(res.data.result === 2) {
                    this.$message.error('该链接已失效，请重新获取')
                }
            } catch(err) {
                console.log(err);
            }
        },
        // 获取原型页
        async prototypePreview(name) {
            this.prototypeName = name
            try {
                const res = await axios.post('/project/checkPrototype/', this.$qs.stringify({
                    email: this.email,
                    groupName: this.groupName,
                    proName: this.projectName,
                    protoName: name
                }))
                if(res.data.result === 0) {
                    this.componentData = JSON.parse(res.data.canvasData)
                    this.canvasStyleData = JSON.parse(res.data.canvasStyle)
                }
            } catch(err) {
                console.log(err);
            }
        },
        getStyle,
        getCanvasStyle,
        changeStyleWithScale,
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
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
            this.$router.push({name: 'collectProject'});
        },
    }
}
</script>

<style lang="scss" scoped>
.body {
    background-color: rgb(153, 154, 153) !important;
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.15) !important;
    // width: 89%;
    display: flex;
}

.aside {
    width: 160px !important;
    background-color: rgb(245, 244, 246) !important;
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.15) !important;
}

.bg {
    width: 100%;
    height: 55%;
    position: float;
    background: rgb(0, 0, 0, .5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 40px;
    .canvas-container {
        width: calc(100%);
        height: calc(100%);
        overflow: auto;
        .canvas {
            background: #fff;
            position: relative;
            margin: auto;
        }
    }
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
