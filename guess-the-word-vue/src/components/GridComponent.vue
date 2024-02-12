<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import GridRow from './GridRow.vue'

const props = defineProps({
  wordToGuess: String,
  attempts: Number
})

const ROW_STATES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  INACTIVE: 'inactive'
}
const currentRow = ref(0)
const wordInput = ref(new Array(props.attempts).fill(''))

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i)
}

function isEnterKey(key) {
  return key === 'Enter'
}

function isBackspaceKey(key) {
  return key === 'Backspace'
}

function wordIsComplete(word) {
  return word.length === props.wordToGuess.length
}

function checkWord() {
  currentRow.value++
}

function handleKeyDown(event) {
  handleKeyInput(event.key)
}

function handleKeyInput(letter) {
  if (isLetter(letter) && !wordIsComplete(wordInput.value[currentRow.value])) {
    // If the key pressed is a letter, append the letter to the current word
    wordInput.value[currentRow.value] += letter.toUpperCase()
  } else if (isEnterKey(letter) && wordIsComplete(wordInput.value[currentRow.value])) {
    // If the key pressed is Enter and the word is complete, check the word
    checkWord()
  } else if (isBackspaceKey(letter)) {
    // If the key pressed is Backspace, remove the last letter from the current word
    wordInput.value[currentRow.value] = wordInput.value[currentRow.value].slice(0, -1)
  }
}

function gridState(rowIndex) {
  if (rowIndex === currentRow.value) {
    return ROW_STATES.ACTIVE
  } else if (rowIndex < currentRow.value) {
    return ROW_STATES.COMPLETED
  } else {
    return ROW_STATES.INACTIVE
  }
}

defineExpose({ handleKeyInput })

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <div class="main-grid">
    <GridRow
      v-for="(row, rowIndex) in attempts"
      :key="rowIndex"
      :wordToGuess="props.wordToGuess"
      :wordInput="wordInput[rowIndex]"
      :gridState="gridState(rowIndex)"
      @completed="checkWord"
    />
  </div>
</template>
