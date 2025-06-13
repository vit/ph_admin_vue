<script setup lang="ts">

    // import Modal from '@/components/ui/Modal.vue'
    import { ref, reactive, watch } from 'vue'

    // const { id, onHide } = defineProps(['id', 'onHide'])
    const { id, contid } = defineProps(['id', 'contid'])

    // const showImportBlock = ref(false)
    // const hideImportBlock =() => showImportBlock.value = false

    import { callRPC } from '@/ts/api.ts';

    const getPapersList = () => callRPC( "get_papers_list", {contid})

    const onImport = () => {
        // console.log("context: ", contid)
        // console.log("checkAll papers: ", checkedPapers.value.map(v => v))
        callRPC( "import_docs_from_coms", {id, list: checkedPapers.value.map(papnum => ({context: contid, papnum}))})
    }

    const papers_list = reactive({data: null, error: null, loading: false})

    const checkedPapers = ref([])
    const checkAll = ref(false)


    watch(
        () => contid,
        () => {
            fetchPapersList()
        },
        { immediate: true }
    )

    watch(
        // () => checkAll,
        checkAll,
        () => {
            // console.log("checkAll changed, ", checkAll.value)
            // if(papers_list.data)
                checkedPapers.value = checkAll.value ? papers_list.data.map(p => p.papnum) : []
        },
        { immediate: true }
    )

    async function fetchPapersList() {
        // console.log("fetchPapersList(", contid, ")")
        papers_list.error = papers_list.data = null
        papers_list.loading = true

        try {
            // papers_list.data = (await getPapersList()).map(p => ({...p, checked: false}))
            papers_list.data = await getPapersList()
            checkedPapers.value = []
            checkAll.value = false
        } catch (err) {
            papers_list.error = err.toString()
        } finally {
            papers_list.loading = false
        }
    }

</script>


<template>

    <div class="import">

        {{$route.query.contid}}
        <br>
        {{checkedPapers}}
        <br>
        {{checkAll}}
        <br>

        <div>
            <div class="papers">
                <h3 v-if="papers_list.loading" class="loading">Loading papers list...</h3>
                <h3 v-if="papers_list.error" class="error" style="color: red">Papers list loading error: {{ papers_list.error }}</h3>

                <div v-if="papers_list.data" style="overflow: scroll; max-height: 80vh;" sstyle="overflow-y: auto;">
                    <button
                        @click="onImport"
                    >Import Marked</button>
                    <br>

                    <input type="checkbox" v-model="checkAll">
                    <div style="overflow: scroll; max-height: 80vh;" sstyle="display: flex;">
                        <b>Select/Deselect all</b>
                        <ul>
                            <li v-for="c in papers_list.data">
                                <input type="checkbox" :value="c.papnum" v-model="checkedPapers">
                                    {{c.papnum}} | {{c.authors}} | {{c.title}}
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

        </div>

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

</style>
