<template>
  <div class="results"> 
    <div class="messageContainer">
      <img :src="positiveTimeDifferential ? imageGood : imageNormal">
      <h2>{{ message }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeDifferential: String
  },
  data() {
    return {
      imageNormal: require('@/assets/informationIcon.jpg'), 
      imageGood: require('@/assets/checkMark.png'),
      message: "",
      positiveTimeDifferential: false
    }
  },
  watch: {
    timeDifferential: function(newVal, oldVal) {
      this.formatMessage();
    }
  },
  methods: {
    formatMessage: function() {
      let message= "You are on average ";
      if(this.timeDifferential.charAt(0) === '-'){
        message = message.concat(`behind by ${this.formatNumber()}`)
      } else {
        message = message.concat(
          this.timeDifferential.match('[^1-9]') 
              ? `ahead by ${this.formatNumber()}` 
              : `equal in time `
        )
      }
      this.message = message.concat(" compared to your opponent at half time in the game.");
    },
    formatNumber: function() {
      var time = this.timeDifferential;
      var timeSplit = this.timeDifferential.split(':');
      
      if(timeSplit[0] === "-00" || timeSplit[0] === "00"){
        
        this.positiveTimeDifferential = timeSplit[0] === "-00" ? false : true

        return (timeSplit[0].charAt(0) === "0" 
          ? timeSplit[1].charAt(1)
          : timeSplit[1]
        ).concat(" seconds")
      } else {
        this.positiveTimeDifferential = timeSplit[0].charAt(0) === "-" ? false : true

        return (timeSplit[0].charAt(0) === "-" 
            ? time.substring(2,time.length) 
            : time.substring(1,time.length)
        ).concat(" minutes")
      }
    }
  }
};
</script>

<style lang="css">
  .results{
    width: 80%; /*1200 px at 51%*/
    height:auto;
    /* max-width: 800px; */
    /* max-width: 500px; */
    justify-self: center;
    align-self: center;
    margin: 5% auto;
    box-sizing: border-box;
   max-width: 800px;
    /* margin: 5% 0 0% 0; */

    border: 0.05em solid rgb(68, 68, 68);
    background-color: #262421;
    border-radius: 10px;
  }
  .messageContainer {
    display: flex;
    width: auto;
    height: auto;
    /* padding-left: 4%; */
  }
  h2{
    font-size: clamp(22px, 2vw, 30px);
    margin:20px;
    color: aliceblue;
  }
  img{
    width: 100px;
    height: 100px;
    align-self: center;
    /* height: 100%; */
  }
</style>
