//this function returns an array of strings filled with the selected proprierties(prop) of the provideCurrentRates() function from backend
function currencyList(prop) {
  var output = [];
  provideCurrentRates().forEach(function (eachObj) {

    output.indexOf(eachObj[prop]) === -1 ? output.push(eachObj[prop]) : console.log('some duplicated currencies has been removed');

  });
  return output;
}

function getChangeRate(from, to) {

  for (var i = 0; i < provideCurrentRates().length; i++) {
    if (provideCurrentRates()[i].from_currency === from && provideCurrentRates()[i].to_currency === to) {
      return provideCurrentRates()[i].change_rate;
    } else if (from === to) {
      return 1;
    }
  }
}

new Vue({
  el: '#converter',
  data: {
    front_from_currency: '',
    front_to_currency: '',
    message: '1',
    options: currencyList('from_currency'),
  },
  computed: { // this retrieve data from dom
    conv_result: function () {

      return (this.message * getChangeRate(this.front_from_currency, this.front_to_currency) || "devi mettere un numero, non una lettera pirletta!! :)");
    }
  }
})