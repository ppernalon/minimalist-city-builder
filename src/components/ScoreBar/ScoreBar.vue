<template>
    <div id="ScoreBar">
        Score : {{ totalScore }}
    </div>
    <div id="scoreChange" :class="[ {'visible': this.isScoreChangeVisible}, {'hidden': !this.isScoreChangeVisible || this.endGame}, {'positive': this.scoreChange >= 0}, {'negative': this.scoreChange < 0} ]">
        {{ this.scoreChange }}
    </div>
</template>

<script>
export default {
    name: "ScoreBar.vue",
    props: {
    totalScore: Number,
    endGame: Boolean
    },
    data() {
        return{
            scoreChange: 0,
            isScoreChangeVisible : false
        }
    },
    watch:{ 
        totalScore: function(newVal, oldVal) { 
            console.log(this.endGame)
            this.scoreChange = newVal - oldVal
            this.isScoreChangeVisible = true;
            setTimeout( () => {
                this.isScoreChangeVisible = false
            }, 2000)
            },
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

#scoreChange{
    font-size: 1.5em;
    position: relative;
    top: -10px;
    right: -5px; 
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 2s linear, transform 1s ease-in-out ;
  transform: translate(0, 10px);
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear, transform 1s ease-in-out;
  transform: translate(0, -10px);
}

.positive{
    color: green;
}

.negative{
    color: red;
}
</style>