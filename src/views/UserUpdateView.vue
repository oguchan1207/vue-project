<script setup lang="ts">
import { ref } from 'vue'
import userUpdateModal from '@/components/modal/UserUpdateModal.vue'
import { useAuth0 } from '@auth0/auth0-vue';
const { isLoading } = useAuth0();


const showUpdateModal = ref(false)

</script>

<template>

<div v-if="!isLoading">
  <button id="show-update-modal" @click="showUpdateModal = true; userUpdateModal.getUser">利用者更新</button>
</div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <userUpdateModal :show="showUpdateModal" @close="showUpdateModal = false">
      <template #header>
        <h3>利用者更新</h3>
      </template>
    </userUpdateModal>
  </Teleport>

</template>