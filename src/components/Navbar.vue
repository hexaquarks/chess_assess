<template>
  <div class="navbar">
    <div class="home" >
        <!-- home Icon here -->
    </div> 
    <div class="handles" >
      <span> about </span>
      <img :src="informationIcon" /> 
      <span> github </span>
      <img :src="githubIcon" /> 
      <span> linkedIn </span>
      <img :src="linkedinIcon" /> 
      <!-- about, github linkedin  -->
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      githubIcon: require('@/assets/githubOrange.png'), 
      linkedinIcon: require('@/assets/linkedinIcon.png'),
      informationIcon: require('@/assets/informationIcon.jpg'),
    }
  },
};
</script>

<style lang="css">
   .navbar {
       display: flex;
       justify-content: flex-end;
       position: absolute;
       top: 0;
       height: 60px;
       background-color: black;
       width: 100%;
       align-content: center;
   }
   .handles{
     width: auto;
     /* justify-content: center;
     align-content: center; */
   }
   span { 
     width: fit-content;
     color: aliceblue;
   }
   .navbar .handles img{
     margin-top: 5px;
     width: 35px; height:35px;
   }
</style>
