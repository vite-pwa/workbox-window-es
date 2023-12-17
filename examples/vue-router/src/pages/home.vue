<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const date = __DATE__
</script>

<template>
  <div>Home route, built at: {{ date }}</div>
  <br>
  <br>
  <button type="button" @click="router.push('/about')">
    About
  </button>
</template>
