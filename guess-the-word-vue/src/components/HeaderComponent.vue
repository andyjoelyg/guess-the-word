<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPlusBoxOutline } from '@mdi/js'
import { useConfigStore } from '../stores/config'
import { RouterLink } from 'vue-router'

const configStore = useConfigStore()
</script>

<template>
  <header class="c-header">
    <h1 class="c-header__title">GUESS THE WORD</h1>
    <div class="c-header__options">
      <div class="c-header__option">
        <span :class="`fi fi-${configStore.language.code}`"></span>
        <span>{{ configStore.language.name }}</span>

        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(language, i) in configStore.languages"
              :key="i"
              :value="language.code"
            >
              <router-link :to="`../${language.code}`" class="d-flex ga-2">
                <span :class="`fi fi-${language.code}`"></span>
                <span>{{ language.name }}</span>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="c-header__option">
        <svg-icon type="mdi" :path="mdiPlusBoxOutline"></svg-icon>
        <span>Create your word</span>
      </div>
    </div>
  </header>
</template>
