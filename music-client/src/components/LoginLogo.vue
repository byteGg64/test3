<template>
  <div class="login-logo">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="ERJI"></use>
    </svg>
  </div>
</template>

<script>
import { ICON } from '../assets/icon/index'

export default {
  name: 'login-logo',
  data () {
    return {
      ERJI: ICON.ERJI
    }
  }
}
</script>

<style lang="css" scoped>
@import '../assets/css/login-logo.css';
</style>
