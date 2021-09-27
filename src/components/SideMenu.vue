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
    <div class="resultsHandles">
      <h1>Results</h1>
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
  padding: 150px 25px 0px 50px;
  width: 30%;
  height: 100vh;
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
  font-size: 50px;
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
   top: calc(50%);
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
   top: calc(50% - 4px);
   left: -30px;
   transform: translateY(-50%) rotate(-45deg);
}
li {
  margin-left: 5%;
  font-size: 30px;
  color: black;
  font-weight: bolder;
  line-height: 80px;
}
</style>
