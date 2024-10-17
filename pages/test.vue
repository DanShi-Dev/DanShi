<script setup lang="ts">
const { $client } = useNuxtApp()

const { data: hello } = await $client.test.useQuery({ text: 'client', plain: '666' })
// hello may be undefined, meaning the query is failed.

const { data: all_user } = await $client.test_database.useQuery({})
console.log(all_user.value?.userList)

const { data: env } = await $client.test_environment.useQuery({})
console.log(env.value?.env)
</script>

<template>
  <div>
    <p>{{ hello ? hello.greeting : "undefined" }}</p>
  </div>
</template>
