<script setup lang="ts">

    import DocChildrenImportPapers from '@/components/lib/doc/DocChildrenImportPapers.vue'
    import { ref, reactive, watch } from 'vue'

    // const { id, onHide } = defineProps(['id', 'onHide'])
    const { id } = defineProps(['id'])

    // const showImportBlock = ref(false)
    // const hideImportBlock =() => showImportBlock.value = false

    import { callRPC } from '@/ts/api.ts';

    const getConfsList = () => callRPC( "get_confs_list", {})

    const confs_list = reactive({data: null, error: null, loading: false})

    // const paperid = $route.params;

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

    <div class="import">

        !{{$route.query.contid}}!

        <div>

            <button
                @click1="onHide"
                @click="$emit('onHide')"
            >Hide import panel</button>

            <div class="wrap">
                <div class="confs left">
                    <h3 v-if="confs_list.loading" class="loading">Loading conferences list...</h3>
                    <h3 v-if="confs_list.error" class="error" style="color: red">Conferences list loading error: {{ confs_list.error }}</h3>
                    <div style="display: flex;">

                        <div v-if="confs_list.data" style="overflow-y: auto;">
                            <ul>
                                <li v-for="c in confs_list.data">
                                    <router-link :to="'?contid=' + c.contid">{{ c.title }}</router-link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <DocChildrenImportPapers @imported="$emit('imported')" class="right" :contid="$route.query.contid" :id="id" />

            </div>


            <!-- <button
                @click1="onHide"
                @click="$emit('onHide')"
            >Hide import panel</button> -->

        </div>

    </div>

</template>


           

<style scoped>

    .wrap {
    display: flex;
    justify-content: space-between;
    }

    .left  {
    flex: 1;
    }

    .right {
    flex: 2;
    }

    .title {
        font-family: Georgia, 'Times New Roman', Times, serif;
    }

    .subtitle {
        font-family: Arial, Helvetica, sans-serif;
        font-style: italic;
    }

</style>
