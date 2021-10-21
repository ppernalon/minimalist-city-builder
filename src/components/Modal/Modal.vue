<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <button type="button" class="btn-close" @click="close"> x </button>
      </header>

      <section class="modal-body">
        <slot name="body">
            <ScoreBar v-bind:totalScore="this.score" />
        </slot>
      </section>
      <section class="modal-body">
        <slot name="body">
          <div id="username"> Username </div>
          <input type="text" id="inputUsername" name="Username" @change="updateUsername" v-model="userName">
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
        postRankings() {
          const onResolve = () => {
            close()
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
          console
          if (userName === "") {
            btnValider.disabled=true;
          } else {
            btnValider.disabled=false
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
    height: 40vh;
    width: 25vw;
    background: #FFFFFF;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgb(0 0 0 / 50%)
  }


  .modal-header {
    position: relative;
    padding: 5% 0;
      }


  .modal-body {
    position: relative;
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
    padding: 0px 10px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
  }
 #btn-valider:disabled{
   background: grey;
}
  #btn-valider {
    width: 30vh;
    height: 5vh;
    color: white;
    background: #008CCF;
    font-family: 'Slackey';
    font-size: 2em;
    letter-spacing: 0.15em;
    border: none;
    cursor: pointer;
  }

 

  input {
  width: 20vw;
  height: 5vh;
  letter-spacing: 0.1em;
  font-size: 1.5em;
  color: #008CFF;
  text-decoration: none;
  border : solid #008CFF;
  text-align: left;
  padding: 1%;
  float: right;
}

#username {
  font-size: 1em;
  position: absolute;
  background: white;
  top: 10px;
  left: 20px;
  padding: 0px 10px;
}

</style>