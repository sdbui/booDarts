<template>
<div class="fight">
  <div class="current-player">
    Current Player: {{currentPlayer + 1}}
    <div class="current-round">Round {{currentRound}} / 10</div>
  </div>

  <div class="grid">
    <div class="grid-column" v-for="(player, i) in players" :key="i">
      <div class="knocked-out" v-if="player.health === 0"></div>
      <div class="hit-labels" v-if="player.health > 0">
        <div class="heal" v-if="player.isCurrent">
          {{player.targets[0]}}
        </div>
        <div v-else class="hit" v-for="target in player.targets">
          {{target}}
        </div>
      </div>
      <div class="player-info" v-if="player.health > 0">
        <div class="player-health">
          <div class="player-health__bar">
            <div v-for="hp in player.health" class="health-point"></div>
          </div>
        </div>
        <div class="player-name">Player: {{i+1}}</div>
        <div class="player-score">Score: {{player.score}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { maxBy, forEach } from 'lodash';
import Fighter from './Fighter';
import defaultCalibration from '@/assets/data/calibration/default.json';

export default {
  name: 'Fight',
  data() {
    return {
      numPlayers: 4,
      players: [],
      currentPlayer: 0,
      dartsThrown: 0,
      currentRound: 1,
      maxRounds: 10,
      calibration: [],
    };
  },
  mounted() {
    this.initPlayers();
    this.calibration = JSON.parse(JSON.stringify(defaultCalibration));

    // listen for keyboard hits... maybe make this into 
    // observable for funsies???
    window.addEventListener('keypress', (e) => {
      // translate the keycode to the proper segment
      const segment = this.calibration.find(seg => {
        return parseInt(seg.keycode) === e.which;
      })
      console.log(`${segment.name} hit!`)
      this.hitPlayers(segment)

    })
  },
  methods: {
    resetGame() {
      location.reload();
    },
    initPlayers() {
      for(let i=0;i < this.numPlayers; i+=1) {
        const fighter = new Fighter(`Player ${i + 1 }`);
        fighter.hello();
        fighter.isCurrent = this.currentPlayer === i;
        this.players.push(fighter);
      };
    },
    nextPlayer() {
      const copy = this.currentPlayer;
      // go to the next player still alive
      for(let i=0;i<this.numPlayers;i+=1) {
        this.currentPlayer = (this.currentPlayer + 1)%this.numPlayers;
        // if currentPlayer is smaller than the copy, that means we started another round
        if(this.currentPlayer < copy) {
          if(this.currentRound === this.maxRounds) {
            // calculate winner and break out of game
            const winner = maxBy(this.players, (p) => {
              return p.score;
            });
            alert(`${winner.name} WINS!!!!!!`)
            this.resetGame();
            break;
          }
          this.currentRound +=1;
        }
        if(this.players[this.currentPlayer].health > 0) {
          break;
        }
      }
    },
    hitPlayers(segment) {
      // find and hit players that include the segment in their targets array
      let affectedPlayers = this.players.filter((p)=> {
        return p.targets.includes(segment.value);
      })
      if(segment.value === 25) {
        affectedPlayers = this.players;
      }
      affectedPlayers.forEach((p) => {
        if(p.isCurrent && p.targets[0] === segment.value) {
          p.heal(segment.multiplier);
        } else {
          if(p.isCurrent) return;
          p.hit(segment.multiplier);
          // give current player points
          this.players[this.currentPlayer].addPoint();
        }
      });
      this.dartsThrown +=1;
    },
  },
  watch: {
    dartsThrown(newVal, oldVal) {
      //check for winner 
      if(this.players.filter(p => p.health > 0).length === 1) {
        alert(`${this.players[this.currentPlayer].name} WINS!!!!!!`)
        this.resetGame();
      }

      if(newVal === 3) {
        // Player has thrown 3 darts, move to next player
        this.nextPlayer();
        this.players.forEach((p,i)=>{
          p.setRandomTargets();
          p.isCurrent = (i === this.currentPlayer);
        })
        this.dartsThrown = 0;
      }
    },
  },

};
</script>
<style lang="scss">

.mock-input {
  display:flex;
  width: 180px;
  flex-wrap: wrap;
  position:absolute;
  top: 50px;
  left: 50px;
  div {
    height: 25px;
    width: 25px;
    border: 1px solid green;
    margin: 2px;
    cursor: pointer;
    &:hover {
      background: rgba(yellow, .5);
    }
  }
}

.current-player {
  background: rgb(122, 247, 122);
  width: 400px;
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

.hit-labels {
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
  .heal, .hit {
    height: 75px;
    width: 75px;
    border: 2px solid black;
    display:flex;
    align-items: center;
    justify-content:center;
  }
  .heal {
    border: 2px solid black;
  }
  .hit {
    border-radius: 50%;
    margin: 5px;
  }
}

.player-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.player-health {
  align-self: flex-start;
  &__bar {
    display:flex;
    .health-point {
      width: 13px;
      height: 30px;
      background: black;
      margin-right: 1px;
    }
  }
}

.player-name {
  font-weight: 600;
  font-size: 2em;
  text-transform: uppercase;
}



</style>