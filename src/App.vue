<template>
  <div id="container">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Slackey&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Slackey&display=swap');

  #container{
    color: #008CFF;
    font-family: 'Slackey', sans-serif;
  }
</style>
