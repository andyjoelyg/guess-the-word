<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPlusBoxOutline } from '@mdi/js'

import { ref } from 'vue'

const snackbar = ref(false)
const timeout = 2000

function getLink() {
  snackbar.value = true
  navigator.clipboard.writeText('test')
}
</script>

<template>
  <svg-icon type="mdi" :path="mdiPlusBoxOutline"></svg-icon>
  <span>Create your word</span>

  <v-dialog activator="parent" max-width="340">
    <template v-slot:default="{ isActive }">
      <v-card class="px-7 py-5">
        <div class="mb-3">
          <h2 class="text-center">Create your word</h2>
        </div>
        <div class="mb-3">Introduce your own word and send the link to your friends</div>
        <div>
          <v-text-field @keydown.stop variant="outlined" class="create-word-input"></v-text-field>
        </div>
        <v-btn
          variant="outlined"
          color="primary"
          @click="(isActive.value = false), getLink()"
          text="Get link"
        ></v-btn>
      </v-card>
    </template>
  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="timeout">
    <span>Link copied to clipboard</span>
  </v-snackbar>
</template>
