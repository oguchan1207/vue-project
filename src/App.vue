<script setup lang="ts">
  import MyPractice from "./components/MyPractice.vue"
</script>

<template>
  <main>
    <h1>Vue.jsの練習</h1>
    <MyPractice
      initialMessage="ボタンを押してください。"
      clickedMessage="ボタンが押されました！"
      buttonLabel="ボタン"
    />
    <MyPractice
      initialMessage="スイッチを押して！"
      clickedMessage="スイッチが押された！"
      buttonLabel="スイッチ"
      />
  </main>
</template>

<style scoped>
  h1 {
    color: red;
  }
</style>