<script setup>
import { ref } from 'vue'
import { faker } from '@faker-js/faker'
import GridComponent from '../components/GridComponent.vue'
import KeyboardComponent from '../components/KeyboardComponent.vue'

const MAX_WORD_LENGTH = 7
const MIN_WORD_LENGTH = 4
const ATTEMPTS = 5
const WORD_TO_GUESS = faker.word
  .noun({ length: { min: MIN_WORD_LENGTH, max: MAX_WORD_LENGTH } })
  .toUpperCase()
const grid = ref(null)

console.log(WORD_TO_GUESS)

function emitKey(letter) {
  grid.value.handleKeyInput(letter)
}
</script>

<template>
  <GridComponent :wordToGuess="WORD_TO_GUESS" :attempts="ATTEMPTS" ref="grid" />
  <KeyboardComponent @keyboard-pressed="emitKey" />
</template>
