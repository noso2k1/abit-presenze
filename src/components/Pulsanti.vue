<template>
  <div class="pulsanti">
    <nav class="nav">
      <div class="nav-left">
        <span class="nav-item">
          <img src="../assets/logo_ABIT_completo_medium.png">
        </span>
      </div>

      <div class="nav-center">
        <div class="nav-item">
          <a class="button is-primary is-small" @click="$emit('clickPresenze')">
            <span class="icon">
              <i class="fa fa-download"></i>
            </span>
            <span>Leggi presenze</span>
          </a> 
        </div>
      </div>

      <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
      <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
      <span class="nav-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu" :class="{ 'is-active': navMenu }">
          <div class="nav-item">
          <a class="button is-info" @click="handleAuthClick">
            <span>Autorizza</span>
          </a> 
        </div>
        <div class="nav-item">
          <a class="button is-danger is-outlined" @click="handleSignoutClick">
            <span>Disconnetti</span>
          </a> 
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import gapi from 'gapi'
export default {
  name: 'pulsanti',
  data () {
    return {
      navMenu: ''
    }
  },
  methods: {
    toggleMenu: function () {
      this.navMenu = !this.navMenu
    },
    handleAuthClick: function (event) {
      gapi.auth2.getAuthInstance().signIn()
      this.toggleMenu()
    },
    handleSignoutClick: function (event) {
      gapi.auth2.getAuthInstance().signOut()
      this.toggleMenu()
    }
  }
}
</script>
