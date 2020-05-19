<template>
<transition name="modal-fade">
  <div class="modal">
    <!-- <div class="modal"> -->
      <slot></slot>
    <!-- </div> -->
  </div>
</transition>
</template>

<script>
export default {
  name: 'Modal',

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #031174;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12rem;
  }

</style>
