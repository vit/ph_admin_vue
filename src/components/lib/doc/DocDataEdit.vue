<script setup lang="ts">

// const { id, data } = defineProps(['id', 'data'])

// const { data } = defineProps(['data'])
const { data, callback } = defineProps(['data', 'callback'])

import { ref, reactive, watch } from 'vue'

const data_s = reactive(data)
// const data_s = data


const dataToSave = () => {
    const {
        info: {title},
        info: {subtitle},
        info: {abstract},
        authors
    // } = data
    } = data_s
    const rez = {
        info: {title, subtitle, abstract},
        authors
    }
    return rez
}

</script>

<template>

<form>

    <div class="data-edit">
        <label>
            Title:
            <input
                name="title"
                v-model="data_s.info.title"
            />
        </label>
        <label>
            Subtitle:
            <input
                name="subtitle"
                v-model="data_s.info.subtitle"
            />
        </label>
        <label>
            Abstract:
            <textarea
                name="abstract"
                v-model="data_s.info.abstract"
                rows=6
            ></textarea>
        </label>
    </div>
    <div class="authors">
        <h4>Authors</h4>

            <div v-for="(a, i) in data_s.authors" class=author>
                <label>
                    First name
                    <input
                        name="fname"
                        placeholder="First name"
                        v-model="a.fname"
                    />
                </label>
                <label>
                    Last name
                    <input
                        name="lname"
                        placeholder="Last name"
                        v-model="a.lname"
                    />
                </label>
                <label>
                    PIN
                    <input
                        name="pin"
                        placeholder="PIN"
                        v-model="a.pin"
                    />
                </label>
                <label class=delete>
                    <button class=button type=button @click=" () => data_s.authors.splice(i, 1) ">Delete</button>
                </label>
            </div>

            <p>
                <button type=button @click=" () => data_s.authors.push({}) ">Add author</button>
            </p>
    </div>

</form>

<p>
    <!-- <button onclick={ () => console.log($state.snapshot(data_s)) }>Print</button>
    <button onclick={ () => onSave( dataToSave() ) }>Save</button>
    <button onclick={ onCancel }>Cancel</button> -->

    <button @click=" () => console.log( dataToSave() ) ">Print</button>
    <button @click=" () => callback.save( dataToSave() ) ">Save</button>
    <button @click=" callback.cancel ">Cancel</button>


</p>




</template>


<style>

    .data-edit label {
        font-size: 80%;
    }

    .data-edit input,
    .data-edit textarea {
        width: 100%;
    }
    .data-edit .author {
        display: grid;
        grid-template-columns: repeat(3, 1fr) auto;
        gap: 1rem;
        margin: 0 0 1rem 0;
        /* row-gap: 5em; */
        .delete{
            display: flex;
            .button {
                margin-top: auto;
            }
        }
    }

    .data-edit form {
        margin: 0 0 2rem 0;
    }


</style>


