<script setup lang="ts">

  import ImportBlock from '@/components/lib/doc/DocChildrenImport.vue'
  import DocDataEdit from '@/components/lib/doc/DocDataEdit.vue'


  import { ref, reactive, watch } from 'vue'

  const { id, children, callback } = defineProps(['id', 'children', 'callback'])

  const showImportBlock = ref(false)
  const hideImportBlock =() => showImportBlock.value = false

  const showAddBlock = ref(false)
  const hideAddBlock =() => showAddBlock.value = false

    const checkedChildren = ref([])
    const checkAll = ref(false)

    watch(
        // () => checkAll,
        checkAll,
        () => {
            // console.log("checkAll changed, ", checkAll.value)
            // if(papers_list.data)
                checkedChildren.value = checkAll.value ? children.map(c => c.id) : []
        },
        { immediate: true }
    )


  // import { callRPC } from '@/ts/api.ts';

  // const getConfsList = () => callRPC( "get_confs_list", {})

  // const confs_list = reactive({data: null, error: null, loading: false})

  const data_callback = {
      ...callback,
      cancel: hideAddBlock
  }

  const data = ref({
    info: {
        title: '',
        subtitle: '',
        abstract: ''
    },
    authors: []
  })
  const cloneObject = (o) => JSON.parse(JSON.stringify(o));



// watch(
//   () => id,
//   () => {
//     fetchConfsList()
//   },
//   { immediate: true }
// )

// async function fetchConfsList() {
//   confs_list.error = confs_list.data = null
//   confs_list.loading = true
  
//   try {
//     confs_list.data = await getConfsList()  
//   } catch (err) {
//     confs_list.error = err.toString()
//   } finally {
//     confs_list.loading = false
//   }
// }



</script>


<template>

<div class="children">

    <h3>Children</h3>

    <!-- <p>id={{id}}</p> -->







    <p>
        <button
            v-if="!showImportBlock && !showAddBlock"
            @click=" () => showAddBlock = true "
        >Add</button>

        <button
            v-if="!showImportBlock && !showAddBlock"
            @click=" () => showImportBlock = true "
        >Import</button>

        <ImportBlock :id="id" v-if="showImportBlock" @onHide="hideImportBlock" >
        </ImportBlock>

        <DocDataEdit
          v-if="showAddBlock"
          :data="cloneObject(data)"
          :callback="data_callback"
        ></DocDataEdit>

    </p>

    <input type="checkbox" v-model="checkAll"> <b>Select/Deselect all</b>
    <ul>
        <li v-for="elm in children" class="elm">
            <input type="checkbox" :value="elm.id" v-model="checkedChildren">
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
