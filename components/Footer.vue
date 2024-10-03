<template>

  <UFooter :links="links">
    <template #left>
      <NuxtLink to="https://github.com/DanShi-Dev/DanShi" target="_blank" class="text-sm text-gray-500 dark:text-gray-400">
        Published under <span class="text-gray-900 dark:text-white">MIT License</span>
      </NuxtLink>
    </template>

    <template #right>
      <UButton aria-label="Danshi Website" icon="i-simple-icons-nuxtdotjs" to="http://danshi.zecyel.xyz/" target="_blank" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="Nuxt UI on GitHub" icon="i-simple-icons-github" to="https://github.com/DanShi-Dev/DanShi" target="_blank" v-bind="($ui.button.secondary as any)" />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const { $ui } = useNuxtApp()

const links = []
</script>