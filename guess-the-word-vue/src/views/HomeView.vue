<script setup>
import { ref } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import GameComponent from '../components/GameComponent.vue'

const dialog = ref(true)
</script>

<template>
  <HeaderComponent />
  <main class="c-main">
    <GameComponent />
  </main>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card class="px-7 py-5">
      <div class="mb-3">
        <h2 class="text-center">Welcome to Guess The Word</h2>
      </div>
      <div class="mb-3">
        <span>You have to guess the secret word in 6 attempts.</span>
        <span>
          After each attempt, the color of the boxes changes to indicate how close you are to
          guessing the word.
        </span>
      </div>
      <div>
        <div class="d-flex align-center ga-3 mb-2">
          <div class="row__cell row__cell--guessed">
            <span class="cell__letter">G</span>
          </div>
          <span style="flex-shrink: 10"
            >GREEN means the letter is in the word and in the CORRECT position.</span
          >
        </div>
      </div>

      <div>
        <div class="d-flex align-center ga-3 mb-2">
          <div class="row__cell row__cell--half-guessed">
            <span class="cell__letter">T</span>
          </div>
          <span style="flex-shrink: 10"
            >YELLOW means the letter is present in the word but in the INCORRECT position.</span
          >
        </div>
      </div>

      <div>
        <div class="d-flex align-center ga-3 mb-5">
          <div class="row__cell row__cell--wrong">
            <span class="cell__letter">W</span>
          </div>
          <span style="flex-shrink: 10">GRAY means the letter is NOT present in the word.</span>
        </div>
      </div>

      <div class="d-flex justify-end">
        <v-btn variant="outlined" color="primary" @click="dialog = false" text="Play"></v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
