<script setup lang="ts">

const { path } = defineProps(['path'])

</script>

<template>

<div class="path">

    <p>
        <span class="elm">
            <router-link to="/lib/" class="elm">Root</router-link>
        </span>
        <span v-for="elm in path" class="elm">
            <router-link :to="'/lib/' + elm.id" class="elm">{{ elm.info.title }}</router-link>
        </span>
    </p>

</div>

</template>


<style>

.path {
    margin: 5px 0px 25px 0px;

    .elm {
    }
    .elm a {
        font-family: Arial, Helvetica, sans-serif;
    }
    .elm:not(:last-of-type)::after {
        content: " / ";
    }
    .elm:last-of-type {
        a {
            pointer-events: none;
            cursor: default;
            text-decoration: none;
        }
    }

}

</style>
