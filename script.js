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

const celdasCalculando = [];
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

                    const filaActual = Number(td.dataset.fila);
const columnaActual = Number(td.dataset.columna);

const siguienteFila = filaActual + 1;

if (siguienteFila < filas) {

    const siguienteCelda = tabla.querySelector(
        `td[data-fila="${siguienteFila}"][data-columna="${columnaActual}"]`
    );

    siguienteCelda.click();
}

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



function obtenerPosicion(referencia) {

    const letra = referencia[0];
    const numeroFila = Number(referencia.slice(1));

    const columna = letra.charCodeAt(0) - 65;
    const fila = numeroFila - 1;

    return [fila, columna];
}



function sumarRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let suma = 0;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {
            suma = suma + Number(valores[i]);
        }

    }

    return suma;
}

function promedioRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let suma = 0;
    let cantidad = 0;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {
            suma = suma + Number(valores[i]);
            cantidad++;
        }

    }

    return suma / cantidad;
}

function maximoRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let maximo = null;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {

            const numero = Number(valores[i]);

            if (maximo === null || numero > maximo) {
                maximo = numero;
            }

        }
    }

    return maximo;
}

function minimoRango(inicio, fin) {

    const valores = obtenerRango(inicio, fin);

    let minimo = null;

    for (let i = 0; i < valores.length; i++) {

        if (valores[i] !== "") {

            const numero = Number(valores[i]);

            if (minimo === null || numero < minimo) {
                minimo = numero;
            }

        }
    }

    return minimo;
}

// EVALUADOR DE EXPRESIONES
function evaluarExpresion(expresion) {

     if (
        expresion.startsWith("SUMA(") &&
        expresion.endsWith(")")
    ) {
        const contenido = expresion.slice(5, -1);
        const partes = contenido.split(":");

        const inicio = partes[0];
        const fin = partes[1];

        return sumarRango(inicio, fin);
    }

    if (
    expresion.startsWith("PROMEDIO(") &&
    expresion.endsWith(")")
) {
    const contenido = expresion.slice(9, -1);
    const partes = contenido.split(":");

    const inicio = partes[0];
    const fin = partes[1];

    return promedioRango(inicio, fin);
}

if (
    expresion.startsWith("MAX(") &&
    expresion.endsWith(")")
) {
    const contenido = expresion.slice(4, -1);
    const partes = contenido.split(":");

    const inicio = partes[0];
    const fin = partes[1];

    return maximoRango(inicio, fin);
}

if (
    expresion.startsWith("MIN(") &&
    expresion.endsWith(")")
) {
    const contenido = expresion.slice(4, -1);
    const partes = contenido.split(":");

    const inicio = partes[0];
    const fin = partes[1];

    return minimoRango(inicio, fin);
}

    const tokens = tokenizar(expresion);

    let posicion = 0;

    if (
    tokens.length === 0 ||
    tokens[0] === "+" ||
    tokens[0] === "-" ||
    tokens[0] === "*" ||
    tokens[0] === "/" ||
    tokens[tokens.length - 1] === "+" ||
    tokens[tokens.length - 1] === "-" ||
    tokens[tokens.length - 1] === "*" ||
    tokens[tokens.length - 1] === "/"
) {
    return "#ERROR!";
}

for (let i = 0; i < tokens.length - 1; i++) {

    const actual = tokens[i];
    const siguiente = tokens[i + 1];

    const actualEsOperador =
        actual === "+" ||
        actual === "-" ||
        actual === "*" ||
        actual === "/";

    const siguienteEsOperador =
        siguiente === "+" ||
        siguiente === "-" ||
        siguiente === "*" ||
        siguiente === "/";

    if (actualEsOperador && siguienteEsOperador) {
        return "#ERROR!";
    }
}

let parentesis = 0;

for (let i = 0; i < tokens.length; i++) {

    if (tokens[i] === "(") {
        parentesis++;
    }

    if (tokens[i] === ")") {
        parentesis--;

        if (parentesis < 0) {
            return "#ERROR!";
        }
    }
}

if (parentesis !== 0) {
    return "#ERROR!";
}



function obtenerValorCelda(fila, columna) {

    if (
        fila < 0 ||
        fila >= filas ||
        columna < 0 ||
        columna >= columnas
    ) {
        return "#REF!";
    }

    const nombreCelda =
        String.fromCharCode(65 + columna) + (fila + 1);

    if (celdasCalculando.includes(nombreCelda)) {
        return "#CIRC!";
    }

    const valor = datos[fila][columna];

if (valor === "") {
    return "#REF!";
}

    if (valor[0] === "=") {

        celdasCalculando.push(nombreCelda);

        const expresion = valor.slice(1);
        const resultado = evaluarExpresion(expresion);

        celdasCalculando.pop();

        return resultado;
    }

    return Number(valor);
}

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

        return obtenerValorCelda(fila, columna);
    }

    posicion++;

    return token;
}

function termino() {

    let resultado = factor();

    if (
        typeof resultado === "string" &&
        resultado[0] === "#"
    ) {
        return resultado;
    }

    while (
        tokens[posicion] === "*" ||
        tokens[posicion] === "/"
    ) {
        const operador = tokens[posicion];
        posicion++;

        const siguiente = factor();

        if (
            typeof siguiente === "string" &&
            siguiente[0] === "#"
        ) {
            return siguiente;
        }

        if (operador === "*") {
            resultado = resultado * siguiente;
        }

        if (operador === "/") {

            if (siguiente === 0) {
                return "#DIV/0!";
            }

            resultado = resultado / siguiente;
        }
    }

    return resultado;
}


function sumaResta() {
    let resultado = termino();

    if (typeof resultado === "string" && resultado[0] === "#") {
        return resultado;
    }

    while (
        tokens[posicion] === "+" ||
        tokens[posicion] === "-"
    ) {
        const operador = tokens[posicion];
        posicion++;

        const siguiente = termino();

        if (typeof siguiente === "string" && siguiente[0] === "#") {
            return siguiente;
        }

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

        const nombreCelda =
            String.fromCharCode(
                65 + Number(td.dataset.columna)
            ) +
            (Number(td.dataset.fila) + 1);

        celdasCalculando.push(nombreCelda);

        const expresion = valor.slice(1);
        const resultado = evaluarExpresion(expresion);

        celdasCalculando.pop();

        td.textContent = resultado;

    } else {

        td.textContent = valor;
    }

    recalcularTodo();
    guardarHoja();
}


function aplicarEstiloCelda(td, valor) {

    td.classList.remove(
        "positivo",
        "negativo",
        "error"
    );

    if (
        typeof valor === "string" &&
        valor[0] === "#"
    ) {
        td.classList.add("error");
        return;
    }

    const numero = Number(valor);

    if (valor !== "" && numero > 0) {
        td.classList.add("positivo");
    }

    if (valor !== "" && numero < 0) {
        td.classList.add("negativo");
    }
}

function recalcularTodo() {

    const celdas = tabla.querySelectorAll("td");

    celdas.forEach(function (td) {

        const fila = td.dataset.fila;
        const columna = td.dataset.columna;

        const valor = datos[fila][columna];

        if (valor && valor[0] === "=") {

            const expresion = valor.slice(1);
            const resultado = evaluarExpresion(expresion);

            td.textContent = resultado;
                aplicarEstiloCelda(td, resultado);


        } else {

            td.textContent = valor;
            aplicarEstiloCelda(td, valor);
        }
    });
}





document
    .getElementById("exportarCSV")
    .addEventListener("click", exportarCSV);

cargarHoja();

hoja.appendChild(tabla);

recalcularTodo();