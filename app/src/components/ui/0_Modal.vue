<script setup lang="ts">

    // const { children } = defineProps(['children'])

    const { onCancel } = defineProps(['onCancel'])

    import { ref } from 'vue'

    const modal_container = ref(null)

    const closeBtn = () => onCancel()

</script>


<template>


<div class='modal-container' ref="modal_container">
    <div class='modal'>
        <div class="wrapper">
            <div class="header">
                <div class="title">
                    window title
                </div>
                <div class="close">
                    <button @click="closeBtn">&#x274c;</button>
                    <!-- <a href="#" class="button" @click="closeBtn">&#x274c;</a> -->
                </div>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</div> 


</template>


           

<style scoped>

    .modal-container {

        background-color: rgba(255,255,255,0.7);

        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;

        .modal {
            display: block;

            background-color: white;
            width: 80%;

            min-height: 20%;
            max-height: 80%;

                box-sizing: border-box;

                display: flex;
                flex-direction: column;
                /* overflow: auto; */

            .wrapper {

                box-sizing: border-box;
                /* border: solid thick blue; */
                border: solid thick gray;

                top: 0;
                bottom: 0;

                /* height: 100%; */
                /* overflow: hidden; */

                width: 100%;
                height: 100%;

                display: flex;
                flex-direction: column;
                overflow: auto;

                .header {
                    box-sizing: border-box;
                    padding: 2px 10px;
                    width: 100%;
                    height: 30px;
                    /* background: blue; */
                    /* background: darkslategray; */
                    background: teal;
                    /* display: flex; */

                    display: grid;
                    grid-template-columns: auto 20px;
                    align-items: center;

                    .title {
                        color: white;
                    }
                    .close {
                        button {
                            background-color: transparent;
                            padding: 0px;
                            color: white;
                            border: none;
                            display: block;
                            :hover {
                                box-shadow: 3px;
                                border-right: solid thin black;
                            }
                        }
                    }
                }

                .body {
                    /* background-color: transparent; */

                    /* background-color: #55cccc; */
                    /* background-color: azure; */
                    /* background-color: azure; */

                    /* background-color: aquamarine; */
                    /* background-color: antiquewhite; */
                    /* height: 100%; */
                    /* overflow-y: scroll; */

                    overflow-y: auto;

                    /* overflow: auto; */
                    /* height:auto; */
                    /* height: 100%; */
                }
            }

        }

    }

</style>
