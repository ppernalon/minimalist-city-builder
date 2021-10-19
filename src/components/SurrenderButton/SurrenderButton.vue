<template>
  <button type="button" class="btn" @click="showModal"> Terminer la partie </button>

  <Modal v-show="isModalVisible" @close="closeModal" v-bind:score="this.totalScore"/>
</template>


<script>
import Modal from "../Modal/Modal.vue";
export default {
    name: 'App',
    props: {
        totalScore: Number
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
        console.log(this.totalScore)
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  };
</script>