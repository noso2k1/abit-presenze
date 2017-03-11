<template>
  <div id="app">
    <pulsanti @clickPresenze="leggiPresenze"></pulsanti>
    <div class="container" id="main">
      <fogli v-if="mostraPresenze" @clickFoglio="clickFoglio($event)"></fogli>
      <presenze v-if="mostraPresenze" :foglio="selFoglio"></presenze>
    </div>
  </div>
</template>

<script>
import gapi from 'gapi'
import Presenze from '@/components/Presenze'
import Fogli from '@/components/Fogli'
import Pulsanti from '@/components/Pulsanti'
export default {
  name: 'app',
  data () {
    return {
      CLIENT_ID: '713000651082-s7h66ra7p3rcdqqamoabhfs7sj0m8jb9.apps.googleusercontent.com',  // Client ID and API key from the Developer Console
      DISCOVERY_DOCS: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],  // Array of API discovery doc URLs for APIs used by the quickstart
      SCOPES: 'https://www.googleapis.com/auth/spreadsheets',    // Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
      mostraPresenze: false,
      selFoglio: '',
      navMenu: false
    }
  },
  components: { Presenze, Fogli, Pulsanti },
  methods: {
    initClient: function () {
      gapi.client.init({
        discoveryDocs: this.DISCOVERY_DOCS,
        clientId: this.CLIENT_ID,
        scope: this.SCOPES
      }).then(function () {
        console.log('Loggato? ' + gapi.auth2.getAuthInstance().isSignedIn.get())
      })
    },
    leggiPresenze: function () {
      this.mostraPresenze = true
    },
    clickFoglio: function (nomeFoglio) {
      this.selFoglio = nomeFoglio
    }
  },
  created: function () {
    gapi.load('client:auth2', this.initClient)
  }
}
</script>

<style>
  .nav {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
  }

  #main {
    margin-top: 50px;
  }

</style>
