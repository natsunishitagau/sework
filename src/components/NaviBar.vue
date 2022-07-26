<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="change(1)"
  >
    <div class="flex-grow"></div>
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>

</template>

<script>
export default {
  name: 'NaviBar',
  data() {
    return {
      links: {
        1:"home",
        2:"collect",
        3:"history"
      },
      names:["主页","收藏","历史"]
    }
  },
  components: {

  },
  methods: {
    change(v) {
      this.$router.push(this.links[v]);
    }
  }
}
</script>

<style scoped>
  .flex-grow 
  {
    flex-grow: 1;
  }
</style>
