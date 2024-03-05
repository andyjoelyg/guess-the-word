<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import GridRow from './GridRow.vue'
import { useGameStore } from '../stores/game'

const props = defineProps({
  wordToGuess: String,
  attempts: Number
})
const emits = defineEmits(['play-again'])
const ROW_STATES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  INACTIVE: 'inactive'
}
const gameStore = useGameStore()
const currentRow = ref(0)
const wordInput = ref(new Array(props.attempts).fill(''))
const showFeedbackDialog = ref(false)
const dialogState = ref(null)

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
  if (currentRow.value >= props.attempts) return

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

function handleRowCompleted(isGuessed) {
  setTimeout(() => {
    if (isGuessed) {
      showFeedbackDialog.value = true
      dialogState.value = 1
    } else if (currentRow.value === props.attempts) {
      showFeedbackDialog.value = true
      dialogState.value = 0
    }
  }, 300)
}

function playAgain() {
  currentRow.value = 0
  wordInput.value = new Array(props.attempts).fill('')
  showFeedbackDialog.value = false
  dialogState.value = null
  gameStore.letterStates = {}
  emits('play-again')
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
      @row-completed="handleRowCompleted"
    />
  </div>

  <v-dialog v-model="showFeedbackDialog" max-width="400px" persistent>
    <v-card class="px-7 py-5">
      <template v-if="dialogState == 1">
        <div class="mb-3">
          <h2 class="text-center">¡You won!</h2>
        </div>
      </template>

      <template v-if="dialogState == 0">
        <div class="mb-3">
          <h2 class="text-center">¡You lost!</h2>
        </div>
        <div class="mb-3">
          The correct word was <strong>{{ props.wordToGuess }}</strong>
        </div>
      </template>

      <div class="d-flex flex-column ga-3">
        <v-btn variant="outlined" color="primary" @click="playAgain">Play again</v-btn>
        <v-btn variant="outlined" color="primary">Copy word link</v-btn>
        <v-btn variant="outlined" color="primary">Create your own word</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
