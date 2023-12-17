<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const date = __DATE__
</script>

<template>
  <div>About route, built at: {{ date }}</div>
  <br>
  <button @click="router.push('/')">
    Home
  </button>
</template>
