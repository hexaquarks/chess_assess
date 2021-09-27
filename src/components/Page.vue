<template>
  <div class="container">
   <Navbar />
    <SideMenu />
      <div class="mainPanel">
        <Inputs @updateTime="updateTimeDifferential($event)" />
        <Results :timeDifferential="timeDifferential" /> 
        <Chart />
     </div>
    </div> 
</template>

<script>
import Inputs from './Inputs.vue'
import Results from './Results.vue';
import Navbar from './Navbar.vue';
import SideMenu from './SideMenu.vue';
import Chart from './Chart.vue';

export default {
  
  name: 'Page',

  components: {
    Inputs,
    Results ,
    Navbar,
    SideMenu,
    Chart
  },
  data() {
    return {
      barChartData: [12, 19, 3, 5, 2, 3],
      timeDifferential: Number,
      timeInformationList: Array
    }
  },
  methods: {
     updateTimeDifferential: function (time) {
       console.log("here")
       console.log(time)
       this.timeDifferential = time[1];
       this.timeInformationList = time[0];
     }
  }
}
</script>

<style>
  .container {
    display: flex;
    width: 100%;
    height: auto;
  }
  .mainPanel{
    width: 70%;
    height: auto;
  }
</style>

