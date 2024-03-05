<script setup>
import { ref, watch, computed } from 'vue'
import { useGameStore } from '../stores/game'

const props = defineProps({
  wordToGuess: String,
  wordInput: String,
  gridState: String
})
const emits = defineEmits(['row-completed'])
const LETTERS_STATES = {
  GUESSED: 2,
  HALF_GUESSED: 1,
  WRONG: 0
}
const gameStore = useGameStore()
const cellClasses = ref(Array(props.wordToGuess.length).fill(''))
const letterDictionary = computed(() => {
  let ret = {}
  for (let letter of props.wordToGuess) {
    if (ret[letter]) {
      ret[letter]++
    } else {
      ret[letter] = 1
    }
  }
  return ret
})
const letterStates = computed(() => {
  let ret = []
  for (let letterIndex in props.wordInput) {
    ret[letterIndex] = -1
  }
  return ret
})

watch(
  () => [props.wordInput, props.gridState],
  () => {
    if (props.gridState === 'completed') {
      checkLetters()
    }
    updateAllCellClasses()
  },
  { immediate: true }
)

function updateAllCellClasses() {
  for (let letterIndex = 0; letterIndex < props.wordToGuess.length; letterIndex++) {
    cellClasses.value[letterIndex] = updateCellClass(letterIndex)
  }
}

function updateCellClass(letterIndex) {
  if (props.gridState === 'inactive') {
    return
  }

  if (props.gridState === 'active') {
    if (props.wordInput.length === letterIndex) {
      return 'row__cell--selected'
    } else {
      return
    }
  }

  if (props.gridState === 'completed') {
    setTimeout(() => {
      updateCellClassCompleted(letterIndex)
    }, letterIndex * 150)
  }
}

function updateCellClassCompleted(letterIndex) {
  if (letterStates.value[letterIndex] === LETTERS_STATES.GUESSED) {
    cellClasses.value[letterIndex] = 'row__cell--guessed'
  } else if (letterStates.value[letterIndex] === LETTERS_STATES.HALF_GUESSED) {
    cellClasses.value[letterIndex] = 'row__cell--half-guessed'
  } else {
    cellClasses.value[letterIndex] = 'row__cell--wrong'
  }

  if (letterIndex === props.wordToGuess.length - 1) {
    let wordGuessed = letterStates.value.every((letterState) => letterState === 2)
    emits('row-completed', wordGuessed)
  }
}

function checkLetters() {
  checkGuessedLetters()
  checkHalfGuessedLetters()
}

function checkGuessedLetters() {
  for (let letterIndex = 0; letterIndex < props.wordToGuess.length; letterIndex++) {
    if (props.wordInput[letterIndex] === props.wordToGuess[letterIndex]) {
      letterStates.value[letterIndex] = LETTERS_STATES.GUESSED
      gameStore.updateLetterState(props.wordInput[letterIndex], gameStore.LETTERS_STATES.GUESSED)
      letterDictionary.value[props.wordInput[letterIndex]]--
    }
  }
}

function checkHalfGuessedLetters() {
  for (let letterIndex = 0; letterIndex < props.wordToGuess.length; letterIndex++) {
    if (letterStates.value[letterIndex] !== LETTERS_STATES.GUESSED) {
      if (
        props.wordToGuess.includes(props.wordInput[letterIndex]) &&
        letterDictionary.value[props.wordInput[letterIndex]] > 0
      ) {
        letterStates.value[letterIndex] = LETTERS_STATES.HALF_GUESSED
        gameStore.updateLetterState(
          props.wordInput[letterIndex],
          gameStore.LETTERS_STATES.HALF_GUESSED
        )
        letterDictionary.value[props.wordInput[letterIndex]]--
      } else {
        letterStates.value[letterIndex] = LETTERS_STATES.WRONG
        gameStore.updateLetterState(props.wordInput[letterIndex], gameStore.LETTERS_STATES.WRONG)
      }
    }
  }
}
</script>

<template>
  <div class="grid__row">
    <div
      class="row__cell"
      v-for="(letter, letterIndex) in wordToGuess.length"
      :key="letterIndex"
      :class="cellClasses[letterIndex]"
    >
      <span class="cell__letter">
        {{ wordInput[letterIndex] || '' }}
      </span>
    </div>
  </div>
</template>
