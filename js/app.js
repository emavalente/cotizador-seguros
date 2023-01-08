// Constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Utilizo function porque debo acceder a las propiedades del objeto.
Seguro.prototype.cotizarSeguro = function () {
  /*
    1= Americano 1.15
    2= Asiatico 1.05
    3= Europeo 1.35
  */

  let cantidad;
  const base = 2000;

  // Incremento por marca
  switch (this.marca) {
    case "1": {
      cantidad = base * 1.15;
      break;
    }
    case "2": {
      cantidad = base * 1.05;
      break;
    }
    case "3": {
      cantidad = base * 1.35;
      break;
    }
    default: {
      break;
    }
  }

  // Descuento por cantidad total de años
  let antiguedad = new Date().getFullYear() - this.year;

  // Rega de 3 simple para sacar el descuento.
  cantidad -= (antiguedad * 3 * cantidad) / 100;

  // Incremento por tipo
  /*
    Si es basico incrementa un 30%.
    Si es completo incrementa un 50%
  */

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function UI() {}

// utilizo arrow-function porque no necesito acceder al ojeto.
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("OPTION");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("DIV");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (seguro, total) => {
  const { marca, year, tipo } = seguro;

  let textoMarca;

  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;

    case "2":
      textoMarca = "Asiatico";
      break;

    case "3":
      textoMarca = "Europeo";
      break;

    default:
      break;
  }

  const div = document.createElement("DIV");
  div.classList.add("mt-10");
  div.innerHTML = `
  <p class="header">Resumen</p>
  <p class="font-bold">Marca:<span class="font-nomal"> ${textoMarca}</span></p>
  <p class="font-bold">Año:<span class="font-nomal"> ${year}</span></p>
  <p class="font-bold">Tipo:<span class="font-nomal capitalize"> ${tipo}</span></p>
  <p class="font-bold text-xl mt-10">Total:<span class="font-nomal"> $${total}</span></p>
  `;

  const resultado = document.querySelector("#resultado");

  // Mostrar Spinner
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultado.appendChild(div);
  }, 3020);
};
// Instancia de UI
const ui = new UI();

// EvenListeners
document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", generarCotizacion);
}

// Funciones
function generarCotizacion(e) {
  e.preventDefault();

  LimpiarHTML();

  // Leer marca seleccionada
  const marca = document.querySelector("#marca").value;

  // Leer año seleccionado
  const year = document.querySelector("#year").value;

  // Leer tipo seleccionado
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  // Validacion de datos
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando...", "exito");

  // Instancia de Seguro
  const seguro = new Seguro(marca, year, tipo);

  // Caculo de Cotizacion
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(seguro, total);
}

function LimpiarHTML() {
  const resultado = document.querySelector("#resultado");
  while (resultado.children.length) {
    resultado.removeChild(resultado.firstChild);
  }
}
