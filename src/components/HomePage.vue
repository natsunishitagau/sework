<template>
  <NaviBar></NaviBar>
  <p>This is the Home Page a</p>
</template>

<script>
import NaviBar from "./NaviBar.vue";
export default {
  name: 'HomePage',
  data() {
    return {
      email: "",
    }
  },
  components: {
    NaviBar
  },
  methods: {

  },
  created() {
    this.email=this.$store.getters.getUser;
  }
}
</script>

<style scoped>
p
{
  padding-top: 80px;
  font-size: 50px;
}
</style>