document.addEventListener('DOMContentLoaded', () => {
  myOnLoad
});

function myOnLoad() {
  options_nivel()
  options_grado()
  options_seccion()
}

function options_nivel() {
  var array = ["Inicial", "Primaria", "Secundaria"]
  addOptions("nivel", array)
}

function options_grado() {
  var array = [1, 2, 3, 4, 5]
  addOptions("grado", array)
}

function options_seccion() {
  var array = ["a", "b", "c"]
  addOptions("seccion", array)
}

function addOptions(domElement, array) {
  var select = document.getElementsByName(domElement)[0];

  for (value in array) {
    var option = document.createElement("option")
    option.value = array[value]
    option.text = array[value]
    select.add(option)
  }
}
