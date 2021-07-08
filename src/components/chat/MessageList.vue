<template>
  <div>
      <p v-for="(msg, idx) in msgs" :key="idx">{{msg.content}}</p>
  </div>
</template>

<script>
export default {
    props: ['msgs']
}
</script>

<style>

</style>