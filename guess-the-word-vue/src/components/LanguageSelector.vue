<script setup>
import { useConfigStore } from '../stores/config'
import { RouterLink } from 'vue-router'

const configStore = useConfigStore()
</script>

<template>
  <span :class="`fi fi-${configStore.language.code}`"></span>
  <span>{{ configStore.language.name }}</span>

  <v-menu activator="parent">
    <v-list>
      <v-list-item v-for="(language, i) in configStore.languages" :key="i" :value="language.code">
        <router-link :to="`../${language.code}`" class="d-flex ga-2">
          <span :class="`fi fi-${language.code}`"></span>
          <span>{{ language.name }}</span>
        </router-link>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
