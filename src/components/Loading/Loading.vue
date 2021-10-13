<template>
  <div class="item">
    <i class="loader --7"></i>
  </div>
</template>

<script>
export default {
  name: "Loading.vue"
}
</script>

<style scoped>

.loader {
  display: block;
  position: relative;
  width: 50%;
}

.loader::before,
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
}

.loader.--7::before,
.loader.--7::after {
  width: 50px;
  height: 50px;
  background-color: #008CFF;
}



.loader.--7::before {
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

.loader.--7::after {
  top: -50%;
  left: 50%;
  animation: loader-7 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
  0%, 100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}

@keyframes loader-7 {
  0%, 100% {
    transform: none;
  }

  25% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-100%) translateY(-100%);
  }

  75% {
    transform: translateY(-100%);
  }
}



</style>