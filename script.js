console.log("HojaClara iniciado");

const filas = 15;
const columnas = 10;



const hoja = document.getElementById("hoja");



const tabla = document.createElement("table");



const encabezado = document.createElement("tr");


const esquina = document.createElement("th");


esquina.textContent = "";

encabezado.appendChild(esquina);


for (let i = 0; i < columnas; i++) {

    const th = document.createElement("th");

    th.textContent = String.fromCharCode(65 + i);

    encabezado.appendChild(th);
}

tabla.appendChild(encabezado);


// CREACIÓN DE LA MATRIZ DE DATOS
const datos = [];

for (let fila = 0; fila < filas; fila++) {

    const nuevaFila = [];

    for (let columna = 0; columna < columnas; columna++) {
        nuevaFila.push("");
    }

    datos.push(nuevaFila);
}


// CREACIÓN DE LAS CELDAS
for (let fila = 1; fila <= filas; fila++) {

    const tr = document.createElement("tr");

    const numeroFila = document.createElement("th");
    numeroFila.textContent = fila;

    tr.appendChild(numeroFila);

    for (let columna = 0; columna < columnas; columna++) {

        const td = document.createElement("td");

        td.dataset.fila = fila - 1;
        td.dataset.columna = columna;

        td.addEventListener("click", function () {

            if (td.querySelector("input")) {
                return;
            }

            const campo = document.createElement("input");
            let cancelado = false;

            campo.value =
                datos[td.dataset.fila][td.dataset.columna];

            td.textContent = "";

            campo.addEventListener("keydown", function (event) {

                if (event.key === "Enter") {
                    guardarCelda(td, campo);
                }

if (event.key === "Escape") {

    cancelado = true;

    const valorAnterior =
        datos[td.dataset.fila][td.dataset.columna];

    if (valorAnterior[0] === "=") {

        const expresion = valorAnterior.slice(1);
        td.textContent = evaluarExpresion(expresion);

    } else {

        td.textContent = valorAnterior;
    }
}
            });

campo.addEventListener("blur", function () {

    if (!cancelado) {
        guardarCelda(td, campo);
    }

});

            td.appendChild(campo);

            campo.focus();
            campo.select();

        });

        tr.appendChild(td);
    }

    tabla.appendChild(tr);
}



function tokenizar(expresion) {

    const tokens = [];
    let numero = "";
    let referencia = "";

    for (let i = 0; i < expresion.length; i++) {

        const caracter = expresion[i];

        if (
            (caracter >= "0" && caracter <= "9") ||
            caracter === "."
        ) {

            if (referencia !== "") {
                referencia += caracter;
            } else {
                numero += caracter;
            }

        } else if (
            caracter >= "A" &&
            caracter <= "Z"
        ) {

            if (numero !== "") {
                tokens.push(Number(numero));
                numero = "";
            }

            referencia += caracter;

        } else {

            if (numero !== "") {
                tokens.push(Number(numero));
                numero = "";
            }

            if (referencia !== "") {
                tokens.push(referencia);
                referencia = "";
            }

            tokens.push(caracter);
        }
    }

    if (numero !== "") {
        tokens.push(Number(numero));
    }

    if (referencia !== "") {
        tokens.push(referencia);
    }

    return tokens;
}

console.log(tokenizar("A1+B1"));

function obtenerPosicion(referencia) {

    const letra = referencia[0];
    const numeroFila = Number(referencia.slice(1));

    const columna = letra.charCodeAt(0) - 65;
    const fila = numeroFila - 1;

    return [fila, columna];
}



// EVALUADOR DE EXPRESIONES
function evaluarExpresion(expresion) {

    const tokens = tokenizar(expresion);

    let posicion = 0;


function factor() {

    const token = tokens[posicion];

    if (token === "(") {

        posicion++;

        const resultado = sumaResta();

        posicion++;

        return resultado;
    }

    // Si el token es una referencia como A1, B2, C3...
    if (typeof token === "string" && /^[A-Z][0-9]+$/.test(token)) {

        const posicionCelda = obtenerPosicion(token);

        const fila = posicionCelda[0];
        const columna = posicionCelda[1];

        posicion++;

        return Number(datos[fila][columna]);
    }

    posicion++;

    return token;
}


    function termino() {

        let resultado = factor();

        while (
            tokens[posicion] === "*" ||
            tokens[posicion] === "/"
        ) {

            const operador = tokens[posicion];

            posicion++;

            const siguiente = factor();

            if (operador === "*") {
                resultado = resultado * siguiente;
            }

            if (operador === "/") {
                resultado = resultado / siguiente;
            }
        }

        return resultado;
    }


    function sumaResta() {

        let resultado = termino();

        while (
            tokens[posicion] === "+" ||
            tokens[posicion] === "-"
        ) {

            const operador = tokens[posicion];

            posicion++;

            const siguiente = termino();

            if (operador === "+") {
                resultado = resultado + siguiente;
            }

            if (operador === "-") {
                resultado = resultado - siguiente;
            }
        }

        return resultado;
    }


    return sumaResta();
}


// GUARDAR UNA CELDA
function guardarCelda(td, campo) {

    const valor = campo.value;

    datos[td.dataset.fila][td.dataset.columna] = valor;

    if (valor[0] === "=") {

        const expresion = valor.slice(1);

        const resultado =
            evaluarExpresion(expresion);

        td.textContent = resultado;

    } else {

        td.textContent = valor;
    }
}


hoja.appendChild(tabla);