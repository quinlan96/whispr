<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
@import "~buefy/src/scss/buefy-build";
@import "assets/scss/_variables";

body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $light;
	background-color: $dark;
	margin: 0;
	padding: 0;
}

html, #app {
	margin: 0;
	padding: 0;
}
</style>
