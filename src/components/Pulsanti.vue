<template>
  <div class="pulsanti">
    <nav class="navbar navbar-inverted">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img alt="ABIT" src="../assets/logo_ABIT_1.png" style="width:30px">
          </a>
        </div>
        <ul class="nav navbar-nav">
          <li :class="{hidden: auth}">
            <button type="button" class="btn btn-success navbar-btn" @click="handleAuthClick">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              Modifica
            </button>
          </li>
          <li :class="{hidden: !auth}">
            <button type ="button" class="btn btn-danger navbar-btn" @click="handleSignoutClick">
              <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
              Visualizza
            </button>
          </li>
        </ul>
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
