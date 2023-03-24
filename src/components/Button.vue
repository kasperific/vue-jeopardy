<template>
    <button @click="$emit('wasClicked')"><slot /></button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>
button {
    border: solid 3px white;
    color: white;
    border-radius: 6px;
    background-color: #004aaa;
    padding: 10px 20px;
    font-weight: bolder;
    font-size: 1rem;
    position: fixed;
    right: 3rem;
    bottom: 3rem;
    cursor: pointer;
}
</style>