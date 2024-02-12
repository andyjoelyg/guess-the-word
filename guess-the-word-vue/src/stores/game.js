import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    letterStates: {},
    LETTERS_STATES: {
      GUESSED: 2,
      HALF_GUESSED: 1,
      WRONG: 0
    }
  }),
  actions: {
    updateLetterState(letter, state) {
      if (!this.letterStates[letter]) {
        this.letterStates[letter] = state
      } else if (this.letterStates[letter] < state) {
        this.letterStates[letter] = state
      }
    }
  }
})
