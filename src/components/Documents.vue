<template>
    <div class="sidebar">
        <div class="ui-layout-pane ui-layout-pane-west">

            <el-form id="searchForm">
                <el-form-item>
                    <el-input
                        v-model="filterText"
                        placeholder="搜索目录..."
                        class="input-with-select"
                    >

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <h3>知识目录</h3>
                    <hr />
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
                            <el-tree
                                ref="tree"
                                :data="data"
                                :props="defaultProps"
                                :default-expand-all="true"
                                :filter-node-method="filterNode"
                                @node-click="handleNodeClick"
                            >
                            </el-tree>
                        </el-scrollbar>
                    </div>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filterText: '',
            // mock数据
            data: [{
                id: '1',
                label: 'WA',
                icon: 'el-icon-success',
                children: [{
                    id: '1.1',
                    label: '1.1 SQR相关',
                    children: [
                        {
                            id: '1.1.1',
                            label: 'QFD'
                        },
                        {
                            id: '1.1.2',
                            label: '产品开发要求规格'
                        },
                        {
                            id: '1.1.3',
                            label: '测试清单'
                        }

                    ]

                },
                    {
                        id: '1.2',
                        label: '1.2 项目计划',
                        children: [
                            {
                                id: '1.2.1',
                                label: '项目开发计划'
                            },
                            {
                                id: '1.2.2',
                                label: '问题解决计划'
                            },
                            {
                                id: '1.2.3',
                                label: '送样计划 '
                            }
                        ]
                    },
                    {
                        id: '1.3',
                        label: '1.3 立项任务书'
                    },
                    {
                        id: '1.4',
                        label: '1.4 成本/BOM',
                        children: [
                            {
                                id: '1.4.1',
                                label: '项目成本要求'
                            },
                            {
                                id: '1.4.2',
                                label: '项目预算'
                            },
                            {
                                id: '1.4.3',
                                label: '项目实际花费'
                            },
                            {
                                id: '1.4.4',
                                label: 'BOM'
                            }
                        ]
                    },
                    {
                        id: '1.5',
                        label: '1.5 每阶段设计构想',
                        children: [
                            {
                                id: '1.5.1',
                                label: '设计构想书'
                            },
                            {
                                id: '1.5.2',
                                label: 'DOE方案'
                            }
                        ]
                    },
                    {
                        id: '1.6',
                        label: '1.6 试验/试产总结',
                        children: [
                            {
                                id: '1.6.1',
                                label: '试验总结'
                            },
                            {
                                id: '1.6.2',
                                label: '试产总结'
                            }
                        ]
                    },
                    {
                        id: '1.7',
                        label: '1.7 问题清单及问题解决报告',
                        children: [
                            {
                                id: '1.7.1',
                                label: '问题清单'
                            },
                            {
                                id: '1.7.2',
                                label: '问题解决报告'
                            }
                        ]
                    },
                    {
                        id: '1.8',
                        label: '1.8 FMEA',
                        children: [
                            {
                                id: '1.8.1',
                                label: 'DFMEA'
                            },
                            {
                                id: '1.8.2',
                                label: 'PFMEA'
                            }
                        ]
                    },
                    {
                        id: '1.9',
                        label: '1.9 CC/SC; PFD; CP',
                        children: [
                            {
                                id: '1.9.1',
                                label: 'CC/SC'
                            },
                            {
                                id: '1.9.2',
                                label: 'PFD'
                            },
                            {
                                id: '1.9.3',
                                label: 'CP'
                            }
                        ]
                    },
                    {
                        id: '2.0',
                        label: '2.0 生产工艺文件相关'
                    },
                    {
                        id: '2.0',
                        label: '2.0 生产工艺文件相关',
                        children: [
                            {
                                id: '2.0.1',
                                label: '生产规格书'
                            },
                            {
                                id: '2.0.2',
                                label: '测试清单'
                            }
                        ]
                    },
                    {
                        id: '2.1',
                        label: '2.1 图纸'
                    },
                    {
                        id: '2.2',
                        label: '2.2 各阶段评审报告'
                    },
                    {
                        id: '2.3',
                        label: '2.3 原材料规格书'
                    }
                ]
            }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }

        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data)
        },
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        }
    }
}
</script>
<style lang="scss" scoped>

.scrollbar-wrapper {
    overflow-x: hidden !important;
}

/**
 * layout
 */
.sidebar{
    position: fixed;
    z-index: 4;
    margin-top: 64px;
}
/* pane */
.ui-layout-pane {
    //   border: 1px solid #bbb;
    height: 100%;
    //   width : 230px;
}
/* main-left pane */
.ui-layout-pane-west {
    padding: 8px 10px;
    background-color: #f5f5f5 !important;
}

.el-tree {
    background-color: #f5f5f5 !important;
    min-height: 200px;
    max-height: 410px

}

</style>

