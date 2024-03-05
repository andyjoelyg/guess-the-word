<script setup>
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useConfigStore } from './stores/config'
import router from './router'

const configStore = useConfigStore()
const route = useRoute()

watch(
  () => route.params.lang,
  (lang) => {
    if (!lang) {
      router.push('../en')
    }
    configStore.setLanguage(lang)
  }
)
</script>

<template>
  <RouterView />
</template>
