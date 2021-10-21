<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <p> Terminer la partie </p>
        <button type="button" class="btn-close" @click="close"> x </button>
      </header>

      <section class="modal-body">
        <slot name="body">
            <ScoreBar v-bind:totalScore="this.score" />
        </slot>
      </section>
      <section class="modal-body">
        <slot name="body">
          <label for="inputUsername">Username </label>
          <input type="text" id="inputUsername" name="Username" required>
        </slot>
       </section>
      <footer class="modal-footer">
        <button type="button" class="btn" @click="close"> Retour </button>
        <button type="button" class="btn" @click="postRankings"> Terminer la partie</button>
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
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
  }

  .btn {
    color: white;
    background: #008CFF;
    font-family: inherit;
  }
</style>