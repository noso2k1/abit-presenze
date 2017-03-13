<template>
  <div class="notification is-danger">
    <button class="delete" @click="$emit('chiudiNotifica')"></button>
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'notifica',
  props: [ 'msg' ],
  data () {
    return { }
  }
}
</script>

<style scoped>
  .notification {
    position: fixed !important;
    top: 3px;
    right: 3px;
    left: 3px;
    z-index: 100; 
  }
</style>
