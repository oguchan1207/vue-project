<script setup lang="ts">
  import { ref } from "vue";

  const props = defineProps<{
    initialMessage: string
    clickedMessage: string
    buttonLabel: string
  }>();

  const message = ref(props.initialMessage);

  function handleClick() {
    message.value = props.clickedMessage;
  }
</script>

<template>
  <p>{{ message }}</p>
  <button @click="handleClick">{{ props.buttonLabel }}</button>
</template>

<style scoped>
</style>