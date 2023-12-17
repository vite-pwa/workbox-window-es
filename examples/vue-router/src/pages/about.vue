<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>About route, built at: {{ __DATE__ }}</div>
  <br>
  <button @click="router.push('/')">
    Home
  </button>
</template>
