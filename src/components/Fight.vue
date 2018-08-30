<template>
<div class="fight">
  <div class="grid">
    <div class="grid-column" v-for="(player, i) in players" :key="i">
      <div class="hit-labels">
        <div class=""></div>
      </div>
      <div class="player-info">
        <div class="player-health"></div>
        <div class="player-name">Player: {{i+1}}</div>
        <div class="player-score"></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import Fighter from './Fighter';

export default {
  name: 'Fight',
  data() {
    return {
      players: 4,
    };
  },
  mounted() {
    const p1 = new Fighter('bui');
    p1.hello();
  }

};
</script>
<style lang="scss">
  
.grid {
  width: 100vw;
  height: 100vh;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  &-column {
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: flex-end;
    &:not(:last-child) {
      border-right: 1px solid red;
    }
  }
}



</style>