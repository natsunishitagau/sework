<template>
  
  <div class="naviBar">
    <div class="flex-grow"></div>
    <ul>
      <li v-for="v of items.length" :key="v">
        <span>{{items[v-1]}}</span>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'NaviBar',
  data() {
    return {
      links: {
        1:"message",
        2:"collect",
        3:"history"
      },
      items:["消息","收藏","历史"]
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>
  .naviBar
  {
    position: fixed;
    top: 0px;
    display: flex;
    height: 70px;
    align-items: center;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    width: 100%;
  }
  .flex-grow
  {
    flex-grow: 0.98;
  }
  li
  {
    float: left;
    padding:0 20px;
    text-align: center;
    height: 70px;
    line-height: 70px;
    cursor: pointer;
  }
  li:hover
  {
    background-color: rgb(222, 222, 222);
  }
</style>
