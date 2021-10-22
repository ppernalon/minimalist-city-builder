<template>
  <button type="button" id="surrenderButton" @click="showModal"> Terminer la partie </button>

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
  #surrenderButton{
    margin-right: 15px;
  }
</style>