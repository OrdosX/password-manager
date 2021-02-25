<template>
  <b-img :src="imgsrc" class="logo">
  </b-img>
</template>

<script>
export default {
    name: "Logo",
    data() {
        return {
            imgsrc: require('../assets/logo.webp')
        }
    }
}
</script>

<style>
.logo {
  height: 1em;
}
</style>