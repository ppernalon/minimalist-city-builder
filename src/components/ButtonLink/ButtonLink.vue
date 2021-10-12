<template>
  <router-link to="/Play" id="ButtonLink"> JOUER </router-link>
</template>

<script>
export default {
  name: "ButtonLink.vue"
}
</script>

<style scoped>
#ButtonLink{
  width: 30vw;
  letter-spacing: 0.15em;
  font-size: 2em;
  color: white;
  text-decoration: none;
  background: #008CFF;
  text-align: center;
  padding: 1vh 0 1vh 0 ;
}

</style>