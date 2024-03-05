<script setup>
import { ref } from 'vue'
import { getRandomWord } from '../core/randomWord'
import GridComponent from './GridComponent.vue'
import KeyboardComponent from './KeyboardComponent.vue'

const MAX_WORD_LENGTH = 7
const MIN_WORD_LENGTH = 4
const wordLength =
  Math.floor(Math.random() * (MAX_WORD_LENGTH - MIN_WORD_LENGTH + 1)) + MIN_WORD_LENGTH
const ATTEMPTS = 6
let WORD_TO_GUESS
const loading = ref(true)
getRandomWord(wordLength, 'es').then((word) => {
  WORD_TO_GUESS = word
  loading.value = false
})

const grid = ref(null)

function emitKey(letter) {
  grid.value.handleKeyInput(letter)
}

function playAgain() {
  loading.value = true
  getRandomWord(wordLength, 'es').then((word) => {
    WORD_TO_GUESS = word
    loading.value = false
  })
}
</script>

<template>
  <template v-if="loading"
    ><v-progress-circular
      :size="100"
      :width="10"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </template>
  <template v-else>
    <GridComponent
      :wordToGuess="WORD_TO_GUESS"
      :attempts="ATTEMPTS"
      ref="grid"
      @play-again="playAgain"
    />
    <KeyboardComponent @keyboard-pressed="emitKey" />
  </template>
</template>
