<template>
  <UContainer :ui="{
      left: 'min-w-0'
    }">
    We do not provide any guarantee for the accuracy of the information provided by the AI. Please consult a professional for any medical or legal advice.
  </UContainer>
  <UContainer :ui="{
      left: 'min-w-0'
    }">
    <template #left>
    </template>
  </UContainer>
  

</template>
<script lang="js">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default{
  data(){
    return {
    }
  },
  methods:{
    getAvailableModels(){
      return ['model1', 'model2', 'model3'];
    },
    getAllSessions(){

    },
    switchSession(sessionId){

    },
    createSession(){

    },
    fetchChatHistory(sessionId){

    },
    deleteSession(sessionId){

    },
    sendChatMessage(sessionId, message){

    }
  }
}

</script>
<style lang="css" scoped>


</style>