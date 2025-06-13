<script setup lang="ts">

const {id} = defineProps(['id'])

import { ref, reactive, watch } from 'vue'

import DocPath from './DocPath.vue'
import DocData from './DocData.vue'
import DocChildren from './DocChildren.vue'


// import { callRPC } from '../../../ts/api.ts';
import { callRPC } from '@/ts/api.ts';


const getDocChildren = ( id: string ) => callRPC( "get_doc_children", {id: id ? id : null})
const getDocPath = ( id: string ) => callRPC( "get_doc_path", {id: id ? id : null})

const getDocData = ( id: string ) => callRPC( "get_doc_data", {id: id})
const setDocData = ( id: string, data:any ) => callRPC( "set_doc_data", {
    id,
    data,
})

// const getConfsList = () => callRPC( "get_confs_list", {})


const doc_path = reactive({data: null, error: null, loading: false})
const doc_data = reactive({data: null, error: null, loading: false})
const doc_children = reactive({data: null, error: null, loading: false})

watch(
  () => id,
  () => {
    fetchPathData( id )
    fetchDocData( id )
    fetchChildrenData( id )
  },
  { immediate: true }
)

const page_callback = {
  save: async ( data:any ) => {
    const rez = await setDocData(id, data);
    fetchPathData( id )
    fetchDocData( id )
  }
}

async function fetchChildrenData(id : string) {
  doc_children.error = doc_children.data = null
  doc_children.loading = true
  
  try {
    doc_children.data = await getDocChildren(id)  
  } catch (err) {
    doc_children.error = err.toString()
  } finally {
    doc_children.loading = false
  }
}

async function fetchDocData(id : string) {
  doc_data.error = doc_data.data = null
  doc_data.loading = true
  
  try {
    doc_data.data = await getDocData(id)  
  } catch (err) {
    doc_data.error = err.toString()
  } finally {
    doc_data.loading = false
  }
}

async function fetchPathData(id : string) {
  doc_path.error = doc_path.data = null
  doc_path.loading = true
  
  try {
    doc_path.data = await getDocPath(id)  
  } catch (err) {
    doc_path.error = err.toString()
  } finally {
    doc_path.loading = false
  }
}

</script>


<template>
  
<h2>Lib/Doc </h2>


<div class="path">
  <h3 v-if="doc_path.loading" class="loading">Loading breadcrumbs...</h3>
  <h3 v-if="doc_path.error" class="error" style="color: red">Breadcrumbs loading error: {{ doc_path.error }}</h3>
  <div v-if="doc_path.data" >
    <DocPath :path="doc_path.data" />
  </div>
</div>


<div class="data">
  <h3 v-if="doc_data.loading" class="loading">Loading document data...</h3>
  <h3 v-if="doc_data.error" class="error" style="color: red">Document data loading error: {{ doc_data.error }}</h3>
  <div v-if="doc_data.data" >
    <DocData :data="doc_data.data" :callback="page_callback" />
  </div>
</div>


<div class="children">
  <h3 v-if="doc_children.loading" class="loading">Loading children...</h3>
  <h3 v-if="doc_children.error" class="error" style="color: red">Children loading error: {{ doc_children.error }}</h3>
  <div v-if="doc_children.data" >
    <DocChildren :id="id" :children="doc_children.data" />
  </div>
</div>


</template>





<style>

</style>

