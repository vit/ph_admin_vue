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
        checkAll,
        () => {
            checkedChildren.value = checkAll.value ? children.map(c => c.id) : []
        },
        { immediate: true }
    )

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

    function confirmDelete() {
        // console.log(window)
        if(confirm('Are you sure you want to DELETE selected documents?'))
            callback.remove_docs(checkedChildren.value)
    }
    function doUpdate() {
        // console.log(window)
        alert(checkedChildren.value)
            callback.update_imported_files(id, checkedChildren.value)
    }

</script>


<template>

    <div class="children">

        <h3>Children</h3>

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

        <button
            @click=" () => {
//                if(window.confirm('Are you sure you want to DELETE selected documents?'))
//                    callback.remove_docs(checkedChildren)
                confirmDelete()
            } "
        >Delete checked</button>
        <button
            @click=" () => {
                doUpdate()
            } "
        >Update files for checked</button>


    </div>

    <p>&nbsp;</p>

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
