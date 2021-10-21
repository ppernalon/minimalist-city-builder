<template>
    <div id="ScoreBar">
        Score : {{ totalScore }}
    </div>
</template>

<script>
export default {
    name: "ScoreBar.vue",
    props: {
    totalScore: Number,
    }

}
</script>


<style scoped>
#ScoreBar{
  width: 20vw;
  letter-spacing: 0.15em;
  font-size: 2em;
  color: #008CFF;
  text-decoration: none;
  border : solid #008CFF;
  text-align: left;
  padding: 1%;
  float: right;
}
</style>