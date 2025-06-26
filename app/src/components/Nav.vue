

<script>
    // import { page, navigating } from '$app/state';
</script>

<template>
    
<nav>

    <router-link to="/">Home</router-link>
    <router-link to="/lib" :class="{'active': $route.name==='lib'}">Library</router-link>
    <router-link to="/about">About</router-link>

</nav>

</template>


<style>
	nav {
		/* background-color: #B3D9D9; */
		background-color: teal;
		/* background-color: aquamarine; */
		/* color: #ffffff; */
		/* color: orangered; */
	}
	nav a {
		box-sizing: border-box;
		display: inline-block;
		padding: 10px;
		text-decoration: none;
		/* color: #000000; */
		/* color: #ffffff; */
		margin: 0;
		border: 0;
		/* color: orangered; */
		color: #ffffff;
	}
    nav a:hover, nav a.router-link-active, .active {
		/* background-color: #D9B2B2; */
		/* background-color: orange; */
		background-color: aquamarine;
		/* background-color: #C70039; */
		/* background-color: #800080; */
		/* background-color: #804040; */
		/* background-color: teal; */
		color: #000000;
		/* color: #ffffff; */
		/* color: orange; */
	}
</style>



