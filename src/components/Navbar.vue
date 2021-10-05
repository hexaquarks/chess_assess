<template>
  <div class="navbar">
    <span class="home"> <a> home </a></span>
    <div class="push"> 
      <span> <a>about</a> </span> 
    </div> 
    <img :src="informationIcon" />
    <span><a href="https://github.com/hexaquarks/chess_assess" target="_blank"> github</a>  </span>
    <img :src="githubIcon" />
    <span> <a href="https://www.linkedin.com/in/mihail-anghelici-85196a20a" target="_blank"> linkedIn</a>  </span>
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
   .navbar .home {
     margin-left: 2%;
   }
   span { 
     font-size: 24px;
     width: fit-content;
     color: aliceblue;
     margin-right: 1%;
   }
   .navbar img{
     margin-top: 5px;
     width: 35px; height:35px;
     margin-right: 2%;
   }
   a{
     color: aliceblue;
     text-decoration: none;
     
   }
</style>
