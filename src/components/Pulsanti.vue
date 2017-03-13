<template>
  <div class="pulsanti">
    <nav class="nav">
      <div class="nav-left">
        <span class="nav-item">
          <img src="../assets/logo_ABIT_completo_medium.png">
        </span>
      </div>

      <!--<div class="nav-center">
        <div class="nav-item">
          <a class="button is-primary" @click="$emit('clickPresenze')">
            <span class="icon">
              <i class="fa fa-download"></i>
            </span>
            <span>Leggi presenze</span>
          </a> 
        </div>
      </div>-->

      <div class="nav-center">
          <div class="nav-item" :class="{hidden: auth}">
          <a class="button is-success" @click="handleAuthClick">
            <span class="icon"><i class="fa fa-edit"></i></span>
            <span>Modifica</span>
          </a>
        </div>
        <div class="nav-item" :class="{hidden: !auth}">
          <a class="button is-danger is-outlined" @click="handleSignoutClick">
            <span class="icon"><i class="fa fa-eye"></i></span>
            <span>Visualizza</span>
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
      auth: false
    }
  },
  props: ['loggato'],
  created: function () {
    this.auth = this.loggato
  },
  watch: {
    loggato: function (val) {
      this.auth = val
    }
  },
  methods: {
    handleAuthClick: function (event) {
      gapi.auth2.getAuthInstance().signIn()
        .then(function () {
          this.auth = gapi.auth2.getAuthInstance().isSignedIn.get()
          this.$emit('login')
        }, function () { }, this)
    },
    handleSignoutClick: function (event) {
      gapi.auth2.getAuthInstance().signOut()
        .then(function () {
          this.auth = gapi.auth2.getAuthInstance().isSignedIn.get()
          this.$emit('logout')
        }, function () { }, this)
    }
  }
}
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>
