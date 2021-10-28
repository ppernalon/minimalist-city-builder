<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <button type="button" class="btn-close" @click="close"> x </button>
      </header>

      <section class="modal-body">
        <slot name="body">
            <ScoreBar v-bind:totalScore="this.score" v-bind:endGame="this.endGame" />
        </slot>
      </section>
      <section class="modal-body">
        <slot name="body">
          <div id="username"> Username </div>
          <input type="text" id="inputUsername" name="Username" @keyup="updateUsername" v-model="userName">
        </slot>
       </section>
      <footer class="modal-body">
        <button type="button" id="btn-valider" @click="postRankings"> Valider </button>
      </footer>
    </div>
  </div>
</template>

<script>
import RankingHttpServices from '../../http/RankingHttpServices';
    import ScoreBar from "../ScoreBar/ScoreBar.vue"
export default {
  name: 'Modal',
  props: {
      score: Number,
      endGame: Boolean
  },
  components:{
      'ScoreBar' : ScoreBar,
  },
  mounted(){
    document.getElementById("btn-valider").disabled=true
  },
  methods: {
    close() {
        this.$emit('close');
    },

    postRankings(submitEvent) {
      submitEvent.preventDefault() // to avoid closing

      const onResolve = () => {
        this.close()
        location.pathname = '/'
      }
      const onError = (err) => {
        console.log(err)
      }
      let username = document.getElementById("inputUsername").value
      RankingHttpServices.postRankingData(username, this.score, onResolve, onError)
    },

    updateUsername() {
      let userName = document.getElementById("inputUsername").value
      let btnValider = document.getElementById("btn-valider")
      if (userName === "") {
        btnValider.disabled = true;
      } else {
        btnValider.disabled = false
      }
    }
  },
};
</script>

<style>
  .modal-backdrop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }

  .modal {
    height: 400px;
    width: fit-content;
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgb(0 0 0)
  }

  .modal-header {
    position: relative;
    padding: 5% 0;
  }

  .modal-body {
    position: relative;
    height: 80px;
    padding: 20px 15px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    color: #008CFF;
    font-size: 20px;
    padding: 15px 20px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
  }

  #btn-valider:disabled{
    background: grey;
  }

  #btn-valider {
    box-sizing: border-box;
    width: 20vw;
    height: 60px;
    padding: 10px;
    color: white;
    background-color: #008CFF;
    font-family: 'Slackey';
    font-size: 2em;
    letter-spacing: 0.15em;
    border: none;
    cursor: pointer;
  }

  input {
    box-sizing: border-box;
    width: 20vw;
    height: 70px;
    margin: 10px 10px 30px;
    padding: 11px;
    letter-spacing: 0.1em;
    font-size: 1.5em;
    color: #008CFF;
    text-decoration: none;
    border : solid #008CFF;
    text-align: left;
    float: right;
  }

  input:focus{
    outline: none;
  }

  #username {
    font-size: 1em;
    position: absolute;
    background: white;
    top: 20px;
    left: 40px;
    padding: 0 10px;
  }

</style>
