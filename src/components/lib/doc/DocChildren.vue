<script setup lang="ts">

    import ImportBlock from '@/components/lib/doc/DocChildrenImport.vue'
    import { ref, reactive, watch } from 'vue'

    const { id, children } = defineProps(['id', 'children'])

    const showImportBlock = ref(false)
    const hideImportBlock =() => showImportBlock.value = false


    import { callRPC } from '@/ts/api.ts';

    const getConfsList = () => callRPC( "get_confs_list", {})

    const confs_list = reactive({data: null, error: null, loading: false})



watch(
  () => id,
  () => {
    fetchConfsList()
  },
  { immediate: true }
)

async function fetchConfsList() {
  confs_list.error = confs_list.data = null
  confs_list.loading = true
  
  try {
    confs_list.data = await getConfsList()  
  } catch (err) {
    confs_list.error = err.toString()
  } finally {
    confs_list.loading = false
  }
}



</script>


<template>

<div class="children">

    <h3>Children</h3>

    <p>id={{id}}</p>

    <p>
        <button
            v-if="!showImportBlock"
            @click=" () => showImportBlock = true "
        >Import</button>

        <!-- <ImportBlock :id="id" v-if="showImportBlock" :onHide="hideImportBlock" > -->
        <ImportBlock :id="id" v-if="showImportBlock" @onHide="hideImportBlock" >
        </ImportBlock>

    </p>

    <ul>
        <li v-for="elm in children" class="elm">
            <router-link :to="'/lib/' + elm.id">{{ elm.info.title }}</router-link>
            <div class="subtitle">{{ elm.info.subtitle }}</div>
            <div v-if="Array.isArray(elm.authors)" class="authors">{{ elm.authors.map(a => a.fname + " " + a.lname).join(", ") }}</div>
        </li>
    </ul>

</div>

</template>


           

<style scoped>

    .title {
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

    .subtitle {
        font-family: Arial, Helvetica, sans-serif;
        font-style: italic;
    }
    .authors {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 80%;
    }

</style>
