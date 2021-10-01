<template>
  <div class="container">
    <Navbar />
    <SideMenu />
    <div class="mainPanel">
      <Inputs 
        @updateTime="updateTimeDifferential($event)"
        @updateLoading="updateLoadingLocal($event)"  />
      <Results :timeDifferential="timeDifferential" />
      <div class="chartContainer">
        <div v-if="loadingState" class="loader"/> 
        <Chart
          v-if="displayChart && !loadingState"
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
      displayChart: false,
      loadingState: false,
      barChartData: [12, 19, 3, 5, 2, 3],
      timeDifferential: 0,
      timeInformationList: [],
      chartDataProps: {},
      chartOptionProps: {},
      newArrLength: 0,
      arrStep: 0,
    };
  },
  methods: {
    updateLoadingLocal: function (data) {
      this.loadingState = data;
    },
    updateTimeDifferential: function (time) {
      this.timeDifferential = time[1];
      this.timeInformationList = time[0];
      this.generateChartDataProps();
      this.generateChartOptionProps();

      this.displayChart=true;
    },
    reformatArray: function (time) {
      let arrLength = time.length;
      var step = 1;

      if (arrLength > 20) {
        // reduce the array to 20
        if (arrLength % 20 === 0) {
          step = arrLength / 20;
        } else {
          var found = 0;
          for (var i = 15; i < 25; ++i) {
            if (arrLength % i === 0) {
              step = arrLength / i;
              found = 1;
              break;
            }
          }
          if (found !== 1) {
            arrLength -= arrLength % 20;
            step = arrLength / 20;
          }
        }
      }
      this.newArrLength = arrLength;
      this.arrStep = step;
    },
    generateDataArray: function (time, handle) {
      const arr = [];
      for (var j = 0; j < this.newArrLength; j += this.arrStep) {
        arr.push(time[j][handle]);
      }
      return arr;
    },
    generateChartDataProps: function () {
      this.reformatArray(this.timeInformationList);

      this.chartDataProps = {
        labels: [
          ...Array(Math.floor(this.newArrLength / this.arrStep) + 1).keys(),
        ].map((i) => i * this.arrStep),
        datasets: [
          {
            label: "Your half times",
            data: this.generateDataArray(this.timeInformationList, 1),
            // backgroundColor: "rgba(54,73,93,.5)",
            // fill: false,
            borderColor: "green",
            borderWidth: 3,
          },
          {
            label: "Your opponent's half times",
            data: this.generateDataArray(this.timeInformationList, 2),
            // backgroundColor: "rgba(71, 183,132,.5)",
            // fill: "-1",
            borderColor: "red",
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
          scales: {
            xaxis: {
              fontSize: 30,
            },
            label: {
              fontSize: 30,
            },
            scaleLabel: {
              fontSize: 30,
            },
          },
          filler: {
            propagate: false,
          },
          legend: {
            labels: {
              font: {
                size: 24,
              },
            },
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
  margin: 50px auto 0% auto;
  display: block;
  width: 80%;
  max-width: 825px;
  box-sizing: border-box;
}

/* loading animation */
.chartContainer .loader {
  margin: 0 auto;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

