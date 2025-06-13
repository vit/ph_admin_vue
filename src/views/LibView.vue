

<script setup>

  import DocPage from '../components/lib/doc/DocPage.vue';

</script>


<template>

  <DocPage :id="$route.params.id" />

</template>




<!-- <script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script> -->


