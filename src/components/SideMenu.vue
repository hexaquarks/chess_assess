<template>
  <div class="sideMenu">
    <div class="informationHandles">
      <h1>Enter your user infomration</h1>
      <ul>
        <li>Enter your username</li>
        <li>Select a game mode</li>
        <li>Select the number of games <i>(most recent)</i> </li>
        <li>Hit <i>Compute</i></li>
      </ul>
    </div>
    <br>
    <div class="resultsHandles">
      <h1>Results</h1>
      <ul>
        <li>User's half time assessment</li>
        <li>Evolution compared to opponents </li>
        <li>Evolution compared elo bracket </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
};
</script>

<style lang="css" scoped>
.sideMenu {
  padding: 150px 25px 0px 75px;
  width: 30%;
  height: auto;
  background-color: aliceblue;
  border: 0.05em solid rgb(68, 68, 68);
  background-color: #bababa;
}
.informationHandles,
.resultsHandles {
  width: 100%;
  height: auto;
}
.resultsHandles {
    padding-top: 25%;
}
h1 {
    position: relative;
  font-size: clamp(20px,4vw, 45px);
  text-align: left;
  color: #bf7e18;
  font-weight: bolder;
}
h1:before{
   content: '';
   position: absolute;
   border-right:6px solid #bf7e18;
   border-bottom:6px solid #bf7e18;
   width:20px;
   height:20px;
   top: 30px;
   left: -40px;
   transform: translateY(-50%) rotate(-45deg);
}
ul {
  list-style: none;
}
ul li {
  position: relative;
	padding-bottom: 10px;
}
ul li:before{
   content: '';
   position: absolute;
   border-right:4px solid black;
   border-bottom:4px solid black;
   width:14px;
   height:14px;
   top: 40px;
   left: -30px;
   transform: translateY(-50%) rotate(-45deg);
}
li {
  margin-left: 3%;
    font-size: clamp(18px,3vw, 25px);
  color: black;
  font-weight: bolder;
  line-height: 80px;
}
.sideMenu br { 
  color: black;
  width: 100px; 
  height: 2px;
}
</style>
