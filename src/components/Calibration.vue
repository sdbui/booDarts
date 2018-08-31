<template>
<div class="calibration">
  <button @click="goToHome">Back</button>
  <button @click="startCalibration">Start</button>
  <div class="dartboard" v-html="dartboard"></div>
</div>
</template>
<script>
import { forEach } from 'lodash';
import defaultCalibration from '@/assets/data/calibration/default.json';
export default {
  name: 'Calibration',
  data() {
    return {
      dartboard: require('@/assets/images/dartboard.svg'),
      lastKeypress: null,
      ignoreKeypress: true,
    };
  },
  methods: {
    async startCalibration() {
      const calibrateCopy = JSON.parse(JSON.stringify(defaultCalibration));
      for(let i=0;i<calibrateCopy.length;i+=1)
      {
        console.log('enter key for: '+calibrateCopy[i].name);
        const segment = document.getElementById(calibrateCopy[i].name);
        segment.style.fill = 'yellow';
        const key = await new Promise(res => {
          window.addEventListener('keypress', (e)=>{
            res(e.which);
          }, { once: true }); 
        })
        console.log(calibrateCopy[i].name + ' has been bound to: ' + key)
       segment.style.fill = "";
      }
      console.log('calibration complete!')

    },
    goToHome() {
      this.$router.push('/')
    },
    async getKeypress() {
      window.addEventListener('keypress')
      this.ignoreKeypress = false;
      console.log('please enter a key')
      const p = new Promise((res, rej) => {
        // there should now be a keypress... resolve with it
        // res(this.lastKeypress);
      })

      return p;
    },
    onKeypress(e) {

    },
  },
}
</script>
<style lang="scss">
.calibration {
  height:100vh;
  width: 100vw;

  .dartboard {
    height: 70vh;
    width: 70vh;
    #areas {
      path,circle {
        fill: grey;
      }
    }
  }

}

</style>