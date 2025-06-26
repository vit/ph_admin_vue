<script setup lang="ts">

const { data, callback } = defineProps(['data', 'callback'])

    import DocDataView from './DocDataView.vue'
    import DocDataEdit from './DocDataEdit.vue'

    import { ref, reactive, watch } from 'vue'

    enum Mode{ View, Edit }
    const mode : Mode = ref(Mode.View)

    const data_callback = {
        ...callback,
        cancel: () => mode.value = Mode.View
    }

    const cloneObject = (o) => JSON.parse(JSON.stringify(o));

</script>

<template>

    <div class="data">

        <h3>Info</h3>

        <div v-if="mode==Mode.View">
            <DocDataView
                :data=data
            ></DocDataView>
            <p>
                <button
                    @click=" () => mode = Mode.Edit "
                >Edit</button>
            </p>
        </div>

        <div v-if="mode==Mode.Edit">
            <DocDataEdit
                :data="cloneObject(data)"
                :callback="data_callback"
            ></DocDataEdit>
        </div>

    </div>

</template>


<style>

.data {
    margin: 5px 0px 25px 0px;
}

</style>

