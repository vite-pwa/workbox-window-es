<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>Home route, built at: {{ __DATE__ }}</div>
  <br>
  <br>
  <button type="button" @click="router.push('/about')">
    About
  </button>
</template>
