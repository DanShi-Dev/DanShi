<script setup lang="ts">
const { $client } = useNuxtApp()

const { data: hello } = await $client.test.useQuery({ text: 'client', plain: '666' })
// hello may be undefined, meaning the query is failed.

const { data: all_user } = await $client.test_database.useQuery({})
console.log(all_user.value?.userList[0])
</script>

<template>
  <div>
    <p>{{ hello ? hello.greeting : "undefined" }}</p>
  </div>
</template>
