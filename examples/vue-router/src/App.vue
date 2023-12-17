<script setup lang="ts">
import ReloadPrompt from './ReloadPrompt.vue'
</script>

<template>
  <img src="/favicon.svg" alt="PWA Logo" width="60" height="60">
  <br>
  <div>Built at: {{ __DATE__ }}</div>
  <br>
  <router-view />
  <br>
  <br>
  <ReloadPrompt />
</template>
