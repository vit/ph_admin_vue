<script setup lang="ts">

// const { id, data } = defineProps(['id', 'data'])

// const { data } = defineProps(['data'])
const { data } = defineProps(['data'])
// const { data, callback } = defineProps(['data', 'callback'])



</script>

<template>


<div class="data-view">

    <h4 class="title">{{ data.info.title }}</h4>

    <p class="subtitle">{{ data.info.subtitle }}</p>

    <p class="abstract">
        {{ data.info.abstract }}
    </p>

    <p>
        <span v-for="a in data.authors" class="author">{{a.fname}} {{a.lname}}</span>
    </p>



</div>


</template>


<style>

.data-view .title {
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.data-view .subtitle {
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
}

.data-view .id {
    font-family: 'Courier New', Courier, monospace;
}

.data-view .abstract {
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.data-view .author {
    font-weight: bold;
    font-size: 90%;
    font-family: Arial, Helvetica, sans-serif;
}
.data-view .author:not(:last-of-type)::after {
  content: ", ";
}


</style>


