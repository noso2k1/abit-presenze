<template>
  <div id="app">
    <notifica v-if="errore" @chiudiNotifica="errore=false" :msg="testoMsg"></notifica>
    <pulsanti :loggato="loggato" @login="login"></pulsanti>
    <fogli v-if="mostraPresenze" @clickFoglio="clickFoglio($event)"></fogli>
    <div class="container">
      <div class="container" v-if="!mostraPresenze">Carico...</div>
      <presenze v-if="mostraPresenze" 
                :foglio="selFoglio" 
                @erroreScrittura="erroreScrittura"
                :loggato="loggato"
      ></presenze>
    </div>
  </div>
</template>

<script>
import gapi from 'gapi'
import Presenze from '@/components/Presenze'
import Fogli from '@/components/Fogli'
import Pulsanti from '@/components/Pulsanti'
import Notifica from '@/components/Notifica'

export default {
  name: 'app',
  data () {
    return {
      DISCOVERY_DOCS: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],  // Array of API discovery doc URLs for APIs used by the quickstart
      API_KEY: 'AIzaSyCUnkl2u4O5FNsij6CLsXE6NGPKZVcjXpU',
      SCOPES: 'https://www.googleapis.com/auth/spreadsheets',
      CLIENT_ID: '713000651082-s7h66ra7p3rcdqqamoabhfs7sj0m8jb9.apps.googleusercontent.com',
      mostraPresenze: false,
      selFoglio: '',
      navMenu: false,
      errore: false,
      testoMsg: '',
      loggato: false
    }
  },
  components: { Presenze, Fogli, Pulsanti, Notifica },
  methods: {
    initClient: function () {
      gapi.client.init({
        discoveryDocs: this.DISCOVERY_DOCS,
        apiKey: this.API_KEY,
        scope: this.SCOPES,
        clientId: this.CLIENT_ID
      }).then(function () {
        this.mostraPresenze = true
        this.loggato = gapi.auth2.getAuthInstance().isSignedIn.get()
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
      }, reason => {
        this.testoMsg = 'C\'è stato un errore. Se ci capisci qualcosa, è questo: ' +
                        reason.details + ' (' + reason.error + ')'
        this.errore = true
      }, this)
    },
    clickFoglio: function (nomeFoglio) {
      this.selFoglio = nomeFoglio
    },
    erroreScrittura: function () {
      this.testoMsg = `Qualcosa è andato storto quando ho provato a scrivere sul file. 
                       Sei sicuro di avere premuto il tasto "Modifica"?`
      this.errore = true
    },
    logout: function () {
      this.mostraPresenze = false
    },
    login: function () {
      this.mostraPresenze = true
    },
    updateSigninStatus: function (val) {
      this.loggato = val
    }
  },
  created: function () {
    gapi.load('client:auth2', this.initClient)
  }
}
</script>

<style>

</style>
