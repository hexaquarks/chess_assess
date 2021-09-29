<template>
  <div class="input">
    <h1>Enter your username</h1>
    <input
      class="inputField"
      type="text"
      placeholder="User Name"
      v-model="userName"
    />

    <div class="options">
      <!-- left panel game modes -->
      <div class="gameModes">
        <InputItem
          v-for="(value, index) in gameModesNames"
          v-bind:key="index"
          v-bind:name="value"
          v-on:append-gameModes="appendGameModes"
        />
      </div>

      <!-- right panel slider modes -->
      <div class="sliderWrapper">
        <span> Games </span>
        <vue-slider id="slider" v-model="value" v-bind="sliderOptions" />
      </div>
    </div>

    <button class="inputButton" @click="prepareFetchData()">Compute</button>
  </div>
</template>

<script>
// import VueSlider from 'vue-slider-component'
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { fetchData } from "../helpers/Fetch.js";
import InputItem from "./InputItem.vue";
import generateBracket from "../helpers/BracketInformation.js";

export default {
  name: "Inputs",

  components: {
    VueSlider,
    InputItem,
  },
  methods: {
    prepareFetchData: async function (event) {
      const props = {
        userName: this.userName,
        gameModes: this.gameModes,
        max: this.value,
        rated: true,
      };
      generateBracket("hapul071",[1750-1950], "blitz");
      this.$emit("updateTime", await fetchData(props));
    },
    appendGameModes: function (el) {
      this.gameModes.includes(el)
        ? (this.gameModes = this.gameModes.filter((e) => e !== el))
        : this.gameModes.push(el);
    },
  },
  data() {
    return {
      showBlitz: false,
      userName: "",
      gameModes: [],
      value: 50,
      sliderOptions: {
        dotSize: 14,
        width: "5px",
        height: "200px",
        contained: false,
        direction: "btt",
        dataLabel: "label",
        dataValue: "value",
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: "active",
        tooltipPlacement: "right",
        tooltipFormatter: void 0,
      },
      gameModesNames: ["bullet", "blitz", "rapid", "classical"],
    };
  },
};
</script>

<style>
.blitz3mins, .blitz5mins {
    margin: 3% 0 0 15%;
  display:none; 
}
.input h1 { 
   font-size: 40px;
    text-align: center;
    color: #BF7E18;
    font-weight: bolder;
}
.input > input {
  background-color: #BABABA;
    width: 60%;
    height: 40px;
    font-size: 25px;
    margin: 0 auto;
    display:block;
    border-radius: 3px;
}
.input {
  background-color: #262421;
  position: relative;
  border: 0.05em solid rgb(68, 68, 68);
  padding: 5% 5% 5% 5%;
  border-radius: 15px;
  margin: 100px auto 0% auto;
  display: block;
  width:80%;
  box-sizing: border-box;
   max-width: 800px;
}
.input::before {
   content: '';
    opacity: 0.049;
    position: absolute;
    top:0 ; bottom:0; left:0; right:0;
    display: inline-block;
    transform: scale(1.0);
    pointer-events: none;
    
    /* width: 500px; height: 600px; */
    background: linear-gradient(to bottom, rgba(73, 73, 73, 0.6) 20%,
          rgba(255,255,255,1.0)), url("../assets/chessBoard.png");
      background-color: #cccccc; 
      background-position: left;
      background-repeat: no-repeat;
      background-size: cover; 
      /* // background-position-x: 400px; */
      /* // background-position-y: -400px; */
}
.options {
  width: auto;
  display: flex;
  flex-direction: row;
  height: auto;
}
.sliderWrapper {
  display: inline-block;
  justify-items: center;
  text-align: center;
  margin: 0% 2% 0% auto;
  width: 70px;
  margin-top: 10%;
}
.sliderWrapper span {
    height: 50px;
    font-size: 22px;
    font-weight: 600;
    color: #BABABA;
}
#slider {
  margin: 0 auto;
}
.gameModes {
  display: block;
  width: 50%;
  margin-top: 5%;
  font-size: 20px;
  font-weight: 600;
}
.inputButton{
    background-color: #262421;
    border: 1px solid rgb(92, 92, 92);
    color: #BABABA;
    font-size: 22px;
    cursor: pointer;
    width: 40%;
    height: 50px;
    margin: 0 auto;
    display: block;
    margin-top: 10%;
}
.inputButton:hover {
  background-color: rgba(236, 107, 1, 0.2);
    transition: 0.25s;
}
</style>
