<template>
  <button type="button" class="containerButton" @click="showModal">
    <div class="containerImage">
      <img class="surrenderButton"
           :src="`icons/surrender.png`"
           alt="Building">
    </div>
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
    margin: 30px 10px 10px 10px;
    height: 70px
  }

  .containerButton:hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 330ms ease-in-out;
  }

  .containerButton:hover .containerImage{
    border: #008CFF 3px solid;
    background-color: #008CFF;
    padding: 2px;
    background-clip: content-box;
  }

  .containerButton:hover .surrenderButton{
    background-clip: content-box;
    filter: brightness(0) invert(1);
  }

  .containerButton:disabled{
    cursor: not-allowed;
  }

  .containerImage{
    padding: 2px;
    border: #008CFF 3px solid;
  }

  .surrenderButton{
    height: 60px;
  }
</style>