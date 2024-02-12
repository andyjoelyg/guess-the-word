<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'

const gameStore = useGameStore()
const KEYBOARD_LETTERS = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M'
]
const keyboardKeyClasses = computed(() => {
  let ret = { ...gameStore.letterStates }
  for (let letter in ret) {
    ret[letter] = setKeyClass(letter)
  }
  return ret
})

function setKeyClass(letter) {
  if (gameStore.letterStates[letter] === gameStore.LETTERS_STATES.GUESSED) {
    return 'keyboard__key--guessed'
  } else if (gameStore.letterStates[letter] === gameStore.LETTERS_STATES.HALF_GUESSED) {
    return 'keyboard__key--half-guessed'
  } else if (gameStore.letterStates[letter] === gameStore.LETTERS_STATES.WRONG) {
    return 'keyboard__key--wrong'
  } else {
    return ''
  }
}
</script>

<template>
  <div class="keyboard-container">
    <div class="keyboard__row">
      <span
        class="keyboard__key"
        v-for="letter in KEYBOARD_LETTERS.slice(0, 10)"
        :key="letter"
        :class="keyboardKeyClasses[letter]"
        @click="$emit('keyboard-pressed', letter)"
      >
        {{ letter }}
      </span>
    </div>
    <div class="keyboard__row">
      <span
        class="keyboard__key"
        v-for="letter in KEYBOARD_LETTERS.slice(10, 19)"
        :key="letter"
        :class="keyboardKeyClasses[letter]"
        @click="$emit('keyboard-pressed', letter)"
      >
        {{ letter }}
      </span>
    </div>
    <div class="keyboard__row">
      <span class="keyboard__key keyboard__key--enter" @click="$emit('keyboard-pressed', 'Enter')"
        >Enter</span
      >
      <span
        class="keyboard__key"
        v-for="letter in KEYBOARD_LETTERS.slice(19, 26)"
        :key="letter"
        :class="keyboardKeyClasses[letter]"
        @click="$emit('keyboard-pressed', letter)"
      >
        {{ letter }}
      </span>
      <span
        class="keyboard__key keyboard__key--backspace"
        @click="$emit('keyboard-pressed', 'Backspace')"
      >
        <img class="keyboard__key__backspace" src="/backspace.svg" />
      </span>
    </div>
  </div>
</template>
