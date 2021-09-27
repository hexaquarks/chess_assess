<template>
  <div class="container">
    <Navbar />
    <SideMenu />
    <div class="mainPanel">
      <Inputs @updateTime="updateTimeDifferential($event)" />
      <Results :timeDifferential="timeDifferential" />
      <div class="chartContainer">
        <Chart
          :chartdata="chartDataProps"
          :chartOption="chartOptionProps"
          :key="chartOptionProps"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Inputs from "./Inputs.vue";
import Results from "./Results.vue";
import Navbar from "./Navbar.vue";
import SideMenu from "./SideMenu.vue";
import Chart from "./Chart.vue";

export default {
  name: "Page",

  components: {
    Inputs,
    Results,
    Navbar,
    SideMenu,
    Chart,
  },
  data() {
    return {
      barChartData: [12, 19, 3, 5, 2, 3],
      timeDifferential: 0,
      timeInformationList: [],
      chartDataProps: {},
      chartOptionProps: {},
    };
  },
  methods: {
    updateTimeDifferential: function (time) {
      console.log("HERE");
      this.timeDifferential = time[1];
      this.timeInformationList = time[0];
      console.log(time[0]);
      this.generateChartDataProps();
      this.generateChartOptionProps();
      console.log(this.chartDataProps);
      console.log(this.chartOptionProps);
    },
    generateDataArray: function (time, handle) {
      const arr = [];
      for (var i = 0; i < time.length; i++) {
        arr.push(time[i][handle]);
      }
      return arr;
    },
    generateChartDataProps: function () {
      this.chartDataProps = {
        labels: Array.from(Array(this.timeInformationList.length).keys()),
        datasets: [
          {
            label: "Your half times",
            data: this.generateDataArray(this.timeInformationList, 1),
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
          },
          {
            label: "Your opponent's half times",
            data: this.generateDataArray(this.timeInformationList, 2),
            backgroundColor: "rgba(71, 183,132,.5)",
            borderColor: "#47b784",
            borderWidth: 3,
          },
        ],
      };
    },
    generateChartOptionProps: function () {
      this.chartOptionProps = {
        responsive: false,
        maintainAspectRatio: true,
        height: "300px",
        plugins: {
          filler: {
            propagate: false,
          },
        },
      };
    },
  },
};
</script>

<style>
.container {
  display: flex;
  width: 100%;
  height: auto;
}
.mainPanel {
  width: 70%;
  height: auto;
}
.chartContainer {
  height: 300px;
  margin: 50px auto 0% auto;
  display: block;
  width: 80%;
  max-width: 825px;
  box-sizing: border-box;
}
</style>

