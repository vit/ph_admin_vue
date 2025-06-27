
<script setup>

  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'

  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)

  import DocPage from '../components/lib/doc/DocPage.vue';
  import Login from './Login.vue';

</script>

<template>
  <div>
    <div>Token: {{ authStore.token }}</div>

    <DocPage v-if="isAuthenticated" :id="$route.params.id" />
    <Login v-else />
  </div>

</template>
