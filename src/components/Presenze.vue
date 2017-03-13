<template>
  <div class="presenze">
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Attore</th>
          <th v-for="evento in eventi">{{evento.spettacolo}} - {{evento.giorno}}</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Attore</th>
          <th v-for="evento in eventi">{{evento.spettacolo}} - {{evento.giorno}}</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="presenza in presenze">
          <td>{{presenza.attore.nome}}</td>
          <td v-for="dispo in presenza.dispo">
            <p class="control">
              <input type="checkbox" 
                     :checked="dispo.disponibilita"
                     @click="toggleDispo"
                     :id="dispo.cella"
                     :class="{'is-disabled': !loggato}"
              >
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gapi from 'gapi'
export default {
  name: 'presenze',
  data () {
    return {
      presenze: Array,
      attori: Array,
      eventi: Array,
      // SPREADSHEET_ID: '1e3qH5-GrEMRsi0VfirStzc6IDMhFWu8gE1IIsR7x3CM'  // Foglio UFFICIALE
      SPREADSHEET_ID: '1m2mIR89sXViHTNExSHyfTbgi9VxzCCn__KtLO2uCzKI'     // Foglio di TEST
    }
  },
  props: ['foglio', 'loggato'],
  methods: {
    trasformaPresenze: function (tab) {
      // ATTORI
      var i = 0
      var attori = []
      for (i = 3; i <= 13; i++) {
        var attore = []
        attore.nome = tab[i][0]
        attore.riga = i + 1    // Numero riga nel file
        attore.index = i       // Indice dell'array
        attori.push(attore)
      }

      for (i = 17; i <= 21; i++) {
        var musico = []
        musico.nome = tab[i][0]
        musico.riga = i + 1    // Numero riga nel file
        musico.index = i       // Indice dell'array
        attori.push(musico)
      }

      this.attori = attori

      // EVENTI
      var eventi = []
      var rigaEventi = tab[2]
      for (i = 1; i <= rigaEventi.length; i++) {
        var evento = {}
        if (rigaEventi[i]) {
          evento.spettacolo = rigaEventi[i]
          evento.giorno = tab[0][i] + ' ' + tab[1][i]
          evento.colonna = i
          eventi.push(evento)
        }
      }
      this.eventi = eventi

      // PRESENZE
      var presenze = []
      for (i = 0; i < this.attori.length; i++) {
        var presenza = {
          attore: {},
          dispo: []
        }
        presenza.attore.nome = this.attori[i].nome
        presenza.attore.riga = this.attori[i].riga
        presenza.attore.index = this.attori[i].index

        for (var n = 0; n < this.eventi.length; n++) {
          var dispoTmp = {
            spettacolo: '',
            giorno: '',
            colonna: '',
            cella: '',
            disponibilita: ''
          }
          dispoTmp.spettacolo = eventi[n].spettacolo
          dispoTmp.giorno = eventi[n].giorno
          dispoTmp.colonna = eventi[n].colonna
          dispoTmp.cella = this.nomeColonna(dispoTmp.colonna) + presenza.attore.riga
          if (tab[presenza.attore.index][dispoTmp.colonna] === '1') {
            dispoTmp.disponibilita = true
          } else {
            dispoTmp.disponibilita = false
          }
          presenza.dispo.push(dispoTmp)
        }
        presenze.push(presenza)
      }
      this.presenze = presenze
    },

    // Aggiorna il valore nella cella corrispondente per evento/attore
    toggleDispo: function (event) {
      var num = 0
      if (event.target.checked) {
        num = 1
      }

      var cella = this.foglio + '!' + event.target.id.toUpperCase()
      gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: this.SPREADSHEET_ID,
        range: cella,
        values: [ [ num ] ],
        valueInputOption: 'USER_ENTERED'
      }).then(response => { }, reason => {
        this.$emit('erroreScrittura')
      })
    },

    nomeColonna: function (n) {
      // var n = 30
      var ordA = 'a'.charCodeAt(0)
      var ordZ = 'z'.charCodeAt(0)
      var len = ordZ - ordA + 1
      var s = ''
      while (n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s
        n = Math.floor(n / len) - 1
      }
      return s
    }
  },    // End METHODS

  watch: {
    foglio: function (val) {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.SPREADSHEET_ID,
        range: val + '!A1:AF23'
      }).then(response => {
        this.righe = response.result.values
        this.trasformaPresenze(response.result.values)
      })
    },
    loggato: function () {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.SPREADSHEET_ID,
        range: this.foglio + '!A1:AF23'
      }).then(response => {
        this.righe = response.result.values
        this.trasformaPresenze(response.result.values)
      })
    }
  },

  created: function () {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.SPREADSHEET_ID,
      range: this.foglio + '!A1:AF23'
    }).then(response => {
      this.righe = response.result.values
      this.trasformaPresenze(response.result.values)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
