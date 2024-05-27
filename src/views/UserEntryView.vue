<script setup lang="ts">
import { ref } from 'vue'
import userEntryModal from '@/components/modal/UserEntryModal.vue'
import { useAuth0 } from '@auth0/auth0-vue';
const { isLoading } = useAuth0();


const showEntryModal = ref(false)

</script>

<template>
  <div v-if="!isLoading">
  <button id="show-entry-modal" @click="showEntryModal = true">利用者登録</button>
</div>

  <Teleport to="body">
    <userEntryModal :show="showEntryModal" @close="showEntryModal = false">
      <template #header>
        <h3>利用者登録</h3>
      </template>
    </userEntryModal>
  </Teleport>

</template>