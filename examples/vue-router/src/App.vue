<script setup lang="ts">
import ReloadPrompt from './ReloadPrompt.vue'

const date = __DATE__
</script>

<template>
  <img src="/favicon.svg" alt="PWA Logo" width="60" height="60">
  <br>
  <div>Built at: {{ date }}</div>
  <br>
  <router-view />
  <br>
  <br>
  <ReloadPrompt />
</template>
