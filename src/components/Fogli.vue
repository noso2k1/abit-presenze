<template>
  <div class="fogli">
    <div class="tabs is-centered is-boxed">
      <ul>
        <li v-for="foglio in fogli" :class="{'is-active': foglio == foglioSel}">
          <a @click="clickFoglio(foglio)">{{foglio}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gapi from 'gapi'
export default {
  name: 'fogli',
  data () {
    return {
      // SPREADSHEET_ID: '1e3qH5-GrEMRsi0VfirStzc6IDMhFWu8gE1IIsR7x3CM',  // Foglio UFFICIALE
      SPREADSHEET_ID: '1m2mIR89sXViHTNExSHyfTbgi9VxzCCn__KtLO2uCzKI',    // Foglio di TEST
      fogli: Array,
      foglioSel: ''
    }
  },
  methods: {
    clickFoglio: function (nomeFoglio) {
      this.foglioSel = nomeFoglio
      this.$emit('clickFoglio', nomeFoglio)
    }
  },
  created: function () {
    var sheets = []
    gapi.client.sheets.spreadsheets.get({
      spreadsheetId: this.SPREADSHEET_ID,
      includeGridData: false
    }).then(response => {
      var foglioSel = ''
      response.result.sheets.forEach(function (foglio) {
        if (!foglio.properties.hidden) {
          sheets.push(foglio.properties.title)
          if (!foglioSel) {
            foglioSel = foglio.properties.title
          }
        }
      })
      this.foglioSel = foglioSel
    })
    this.fogli = sheets
  }
}
</script>

<style>

</style>
