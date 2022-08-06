<template>
  <div></div>
</template>

<script>
export default {
    name: 'emptyPage',
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$router.push({name:'manageMember'})
        })
    },
}
</script>

<style scoped>

</style>
