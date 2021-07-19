<template>
  <div class="o-github-btn shadow" role="button" @click="go">
    <img class="o-github-text" :src="imgsrc" />
    <span class="ml-3">代码仓库</span>
  </div>
</template>

<script>
export default {
  name: 'GithubButton',
  data () {
    return {
      imgsrc: require('../assets/github.svg')
    }
  },
  methods: {
    go: function () {
      window.open('https://github.com/OrdosX/password-manager')
    }
  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
  .o-github-btn {
    display: none !important;
  }
}

@media only screen and (min-width: 768px) {
  .o-github-btn {
    right: 2em;
  }
}

.o-github-btn {
  align-items: center;
  justify-content: center;
  border-radius: 500px;
  bottom: 2em;
  position: fixed;
  cursor: pointer;
  display: flex;
  height: 3em;
  min-width: 2em;
  width: fit-content;
  padding-left: 1em;
  padding-right: 1em;
  background-color: rgb(255, 255, 255);
}

.o-github-btn:hover {
  background-color: #e8f0fe;
}

.o-github-text {
    height: 1.5em;
    width: 1.5em;
}
</style>