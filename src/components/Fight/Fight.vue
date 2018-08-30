<template>
<div class="fight">
  <div class="current-player">Current Player: {{currentPlayer + 1}}</div>
  <div class="grid">
    <div class="grid-column" v-for="(player, i) in players" :key="i">
      <div class="hit-labels">
        <div class="heal" v-if="currentPlayer === i">
          <button 
            @click="healPlayer(player)">heal</button>
        </div>
        <div v-else>
          <div class="hit" @click="hitPlayer(player,1)">
            <button>hit 1</button>
          </div>
          <div class="hit" @click="hitPlayer(player,2)">
            <button>hit 2</button>
          </div>
          <div class="hit" @click="hitPlayer(player,3)">
            <button>hit 3</button>
          </div>
        </div>
      </div>
      <div class="player-info">
        <div class="player-health">Health: {{player.health}}</div>
        <div class="player-name">Player: {{i+1}}</div>
        <div class="player-score">Score: {{player.score}}</div>
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
      numPlayers: 4,
      players: [],
      currentPlayer: 0,
    };
  },
  mounted() {
    for(let i=0;i < this.numPlayers; i+=1) {
      const fighter = new Fighter(`Player ${i}`);
      fighter.hello();
      this.players.push(fighter);
    };
  },
  methods: {
    nextPlayer() {
      this.currentPlayer = 
        (this.currentPlayer + 1)%this.player.length
    },
    healPlayer(player) {
      player.heal(1);
    },
    hitPlayer(player, multi) {
      player.hit(multi)
    }
  }

};
</script>
<style lang="scss">

.current-player {
  position:absolute;
  margin-left:auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align:center;
  font-size: 40px;
  font-weight: 500;
  color: green;
}
  
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