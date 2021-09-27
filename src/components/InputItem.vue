<template>
  <div class="test"> 
    <input type="checkbox" :id="name" :value="name" 
      v-on:click="$emit('append-gameModes', $event.target.value)"/>
    <label :for="name">{{name}}</label>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data() {},
};
</script>

<style lang="css">
   .test {
      display: flex;
      margin-top: 13%;
  }
  label {
        margin-left: 5px;
        margin-right: 25px;
        color: #BABABA;
        font-size: clamp(20px, 3vw,30px);
      }
    input {
      cursor: pointer;
    }
</style>
