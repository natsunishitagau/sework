/**
 * 一个低代码平台的前端部分，靠拖拉拽生成页面。
 * 功能点如下：
	 1. 编辑器
	 2. 自定义组件（文本、图片、矩形、圆形、直线、星形、三角形、按钮）
	 3. 拖拽
	 4. 删除组件、调整图层层级
	 5. 放大缩小
	 6. 撤消、重做
	 7. 组件属性设置
	 8. 吸附
	 9. 预览、保存代码
	 10. 绑定事件
	 11. 绑定动画
	 12. 拖拽旋转
	 13. 复制粘贴剪切
	 14. 多个组件的组合和拆分
	 15. 锁定组件
	 16. 网格线
 */

/**
 * 对您有帮助的文档（可视化拖拽组件库一些技术要点原理分析）
 * https://github.com/woai3c/Front-end-articles/issues/19
 * https://github.com/woai3c/Front-end-articles/issues/20
 * https://github.com/woai3c/Front-end-articles/issues/21
 */


<template>
    <div class="home">

		<!-- 顶部 -->
        <Toolbar />
		<!-- END -->

        <main>
            <!-- 左侧组件列表 -->
            <section class="left">
                <ComponentList />
            </section>
			<!-- END -->

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
                <el-tabs v-model="activeName">
                    <el-tab-pane label="属性" name="attr">
						<transition name="fade-transform" mode="out-in">
							<component :is="curComponent.component + 'Attr'" v-if="curComponent" />
							<el-empty v-else description="请选择组件" :image-size="80"></el-empty>
						</transition>
                    </el-tab-pane>
                    <el-tab-pane label="动画" name="animation">
						<transition name="fade-transform" mode="out-in">
							<AnimationList v-if="curComponent" />
							<el-empty v-else description="请选择组件" :image-size="80"></el-empty>
						</transition>
                    </el-tab-pane>
                    <el-tab-pane label="事件" name="events">
						<transition name="fade-transform" mode="out-in">
							<EventList v-if="curComponent" />
							<el-empty v-else description="请选择组件" :image-size="80"></el-empty>
						</transition>
                    </el-tab-pane>
                </el-tabs>
            </section>

        </main>
    </div>
</template>

<script>
import Editor from '@/components/Editor/index'
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'

export default {
    components: { Editor, ComponentList, AnimationList, EventList, Toolbar },
    data() {
        return {
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
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
        this.restore()
        // 全局监听按键事件
        listenGlobalKeyDown()
    },
    methods: {
        restore() {
            // 用保存的数据恢复画布
            this.$axios.post('http://81.70.16.241/back/project/loadPrototype/ ', this.$qs.stringify({
                projectID: 2
            })).then(res => {
                console.log(res)
                this.$store.commit('setComponentData', this.resetID(JSON.parse(res.data.canvasData)))
                this.$store.commit('setCanvasStyle', JSON.parse(res.data.canvasStyle))
            })
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
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 262px;
            right: 0;
            top: 0;

            .el-select {
                width: 100%;
            }
        }

        .center {
            margin-left: 200px;
            margin-right: 262px;
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
}

/* 过渡动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.2s;
}
.fade-transform-enter {
	opacity: 0;
	transform: translateX(-30px);
}
.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
