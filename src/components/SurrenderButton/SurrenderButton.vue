<template>
  <button type="button" class="containerButton" @click="showModal">
    <img class="surrenderButton"
         :src="`icons/surrender.png`"
         alt="Building">
  </button>

  <Modal v-show="isModalVisible" @close="closeModal" v-bind:score="this.totalScore" v-bind:end-game="this.endGame" />
</template>


<script>
import Modal from "../Modal/Modal.vue";
export default {
    name: 'App',
    props: {
      totalScore: Number,
      endGame: Boolean
    },
    components: {
      Modal,
    },
    data() {
      return {
        isModalVisible: false,
        score: this.totalScore      
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
    watch:{
      endGame: function (){
        if (this.endGame===true){
          this.showModal()
        }
      }
      }
  };
</script>

<style scoped>
  .containerButton{
    color:inherit;
    background-color: inherit;
    border: none;
    margin: 10px 10px 30px;
    height: 70px
  }

  .containerButton:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 330ms ease-in-out;
  }

  .containerButton:hover .surrenderButton{
    border: #ff7300 3px solid;
    padding: 2px;
    background-color: #ff7300;
    background-clip: content-box;
    filter: invert(100%);
  }
  .containerButton:disabled{
    cursor: not-allowed;
  }

  .containerButtonSelected .surrenderButton{
    border: #ff7300 3px solid;
    padding: 2px;
    background-color: #ff7300;
    background-clip: content-box;
    filter: invert(100%);
  }

  .surrenderButton{
    height: 60px;
    background-color: white;
    background-clip: content-box;
    padding: 2px;
    border: #008CFF 3px solid;
  }
</style>