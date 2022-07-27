<template>
    <NaviBar></NaviBar>
    <p>This is the Home Page</p>
</template>

<script>
import NaviBar from "./NaviBar.vue";

export default {
  name: 'HomePage',
  data() {
    return {

    }
  },
  components: {
    NaviBar
  },
  methods: {
    
  }
}
</script>

<style scoped>
  p
  {
    padding-top: 70px;
    font-size: 50px;
  }
</style>
