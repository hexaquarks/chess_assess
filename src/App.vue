<template>
  <body>
      <Page/>
  </body>
</template>

<script>
import Page from './components/Page.vue'

export default {
  name: 'App',

  components: {
    Page
  },

  data: () => ({
    //
  }),
}
</script>

<style>
  body, html{
    background-color: #161512;
    margin: 0;
  }
</style>
