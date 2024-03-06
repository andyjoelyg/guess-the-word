<script setup>
import LanguageSelector from './LanguageSelector.vue'
import WordCreator from './WordCreator.vue'
</script>

<template>
  <header class="c-header">
    <h1 class="c-header__title">GUESS THE WORD</h1>
    <div class="c-header__options">
      <div class="c-header__option">
        <LanguageSelector />
      </div>
      <div class="c-header__option">
        <WordCreator />
      </div>
    </div>
  </header>
</template>
