<template>
  <div id="homeContainer">
      <ButtonLink/>
    <div id="rankingContainer">
      <Ranking/>
    </div>
  </div>
</template>


<script>
import ButtonLink from "../components/ButtonLink/ButtonLink";
import Ranking from "../components/Ranking/Ranking";
export default {
  name: 'Home',
  components: {
    "Ranking" : Ranking,
    "ButtonLink" : ButtonLink
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#homeContainer{
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-items: center;
  padding-top: 10vh;
  margin-left: auto;
  margin-right: auto;
}
#rankingContainer{
  margin-top: 4vh;
}
</style>
