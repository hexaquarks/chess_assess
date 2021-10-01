<template>
  <div class="navbar">
    <span> home</span>
    <div class="push"> 
      <span> about </span> 
    </div> 
    <img :src="informationIcon" />
    <span> github </span>
    <img :src="githubIcon" />
    <span> linkedIn </span>
    <img :src="linkedinIcon" />
    <!-- about, github linkedin  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      githubIcon: require("@/assets/githubOrange.png"),
      linkedinIcon: require("@/assets/linkedinIcon.png"),
      informationIcon: require("@/assets/informationIcon.jpg"),
    };
  },
};
</script>

<style lang="css">
   .navbar {
       display: flex;
       flex-direction: row;
       position: absolute;
       top: 0;
       height: 60px;
       background-color: black;
       width: 100%;
       align-items: center;
   }
   .navbar .push {
     margin-left: auto;
     margin-right: 1%;
   }
   span { 
     font-size: 18px;
     width: fit-content;
     color: aliceblue;
     margin-right: 1%;
   }
   .navbar img{
     margin-top: 5px;
     width: 35px; height:35px;
     margin-right: 2%;
   }
</style>
