console.log("HojaClara PRUEBA NUEVA");

const filas = 15;
const columnas = 10;

const hoja = document.getElementById("hoja");

const tabla = document.createElement("table");


// ========================================
// CREACIÓN DE ENCABEZADOS
// ========================================

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


// ========================================
// VARIABLES PARA LOS CÁLCULOS
// ========================================

const celdasCalculando = [];

// Guarda la celda seleccionada para la barra de fórmulas
let celdaSeleccionada = null;


// ========================================
// CREACIÓN DE LA MATRIZ DE DATOS
// ========================================

const datos = [];

for (let fila = 0; fila < filas; fila++) {

    const nuevaFila = [];

    for (let columna = 0; columna < columnas; columna++) {

        nuevaFila.push("");

    }

    datos.push(nuevaFila);
}


// ========================================
// CREACIÓN DE LAS CELDAS
// ========================================

for (let fila = 1; fila <= filas; fila++) {

    const tr = document.createElement("tr");

    const numeroFila = document.createElement("th");

    numeroFila.textContent = fila;

    tr.appendChild(numeroFila);


    for (let columna = 0; columna < columnas; columna++) {

        const td = document.createElement("td");

        td.dataset.fila = fila - 1;

        td.dataset.columna = columna;


        // ========================================
        // CLICK EN UNA CELDA
        // ========================================

        td.addEventListener("click", function () {

            // Guardamos la celda seleccionada
            celdaSeleccionada = td;


            // ========================================
            // ACTUALIZAR BARRA DE FÓRMULAS
            // ========================================

            const nombreCelda =
                document.getElementById("nombreCelda");

            const barraFormula =
                document.getElementById("barraFormula");

            const letraColumna =
                String.fromCharCode(
                    65 + Number(td.dataset.columna)
                );

            const numeroFila =
                Number(td.dataset.fila) + 1;

            nombreCelda.textContent =
                letraColumna + numeroFila;

            barraFormula.value =
                datos[td.dataset.fila][td.dataset.columna];


            // Evita crear otro input si ya estamos editando
            if (td.querySelector("input")) {

                return;

            }


            // ========================================
            // EDITAR DIRECTAMENTE EN LA CELDA
            // ========================================

            const campo = document.createElement("input");

            let cancelado = false;

            campo.value =
                datos[td.dataset.fila][td.dataset.columna];

            td.textContent = "";


            // ========================================
            // TECLAS ENTER Y ESCAPE
            // ========================================

            campo.addEventListener("keydown", function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    cancelado = true;

                    const filaActual =
                        Number(td.dataset.fila);

                    const columnaActual =
                        Number(td.dataset.columna);

                    guardarCelda(td, campo);

                    const siguienteFila =
                        filaActual + 1;

                    if (siguienteFila < filas) {

                        const siguienteCelda =
                            tabla.querySelector(
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

                        const expresion =
                            valorAnterior.slice(1);

                        td.textContent =
                            evaluarExpresion(expresion);

                    } else {

                        td.textContent =
                            valorAnterior;

                    }

                }

            });


            // ========================================
            // GUARDAR AL SALIR DE LA CELDA
            // ========================================

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


// ========================================
// GUARDAR UNA CELDA
// ========================================

function guardarCelda(td, campo) {

    const valor = campo.value;

    datos[td.dataset.fila][td.dataset.columna] =
        valor;


    if (valor[0] === "=") {

        const nombreCelda =
            String.fromCharCode(
                65 + Number(td.dataset.columna)
            ) +
            (Number(td.dataset.fila) + 1);


        celdasCalculando.push(nombreCelda);


        const expresion =
            valor.slice(1);

        const resultado =
            evaluarExpresion(expresion);


        celdasCalculando.pop();


        td.textContent =
            resultado;

        aplicarEstiloCelda(
            td,
            resultado
        );

    } else {

        td.textContent =
            valor;

        aplicarEstiloCelda(
            td,
            valor
        );

    }

    
    recalcularTodo();
        guardarHoja();


}


// ========================================
// ESTILOS DE LAS CELDAS
// ========================================

function aplicarEstiloCelda(td, valor) {

    td.classList.remove(
        "positivo",
        "negativo",
        "error"
    );


    // Error
    if (
        typeof valor === "string" &&
        valor[0] === "#"
    ) {

        td.classList.add("error");

        return;

    }


    const numero =
        Number(valor);


    // Número positivo
    if (
        valor !== "" &&
        numero > 0
    ) {

        td.classList.add("positivo");

    }


    // Número negativo
    if (
        valor !== "" &&
        numero < 0
    ) {

        td.classList.add("negativo");

    }

}


// ========================================
// RECALCULAR TODAS LAS FÓRMULAS
// ========================================

function recalcularTodo() {

    const celdas =
        tabla.querySelectorAll("td");


    celdas.forEach(function (td) {

        const fila =
            td.dataset.fila;

        const columna =
            td.dataset.columna;

        const valor =
            datos[fila][columna];


        if (
            valor &&
            valor[0] === "="
        ) {

            const expresion =
                valor.slice(1);

            const resultado =
                evaluarExpresion(expresion);

            td.textContent =
                resultado;

            aplicarEstiloCelda(
                td,
                resultado
            );

        } else {

            td.textContent =
                valor;

            aplicarEstiloCelda(
                td,
                valor
            );

        }

    });

}


// ========================================
// LIMPIAR HOJA
// ========================================

document
    .getElementById("limpiarHoja")
    .addEventListener("click", function () {

        const confirmar = confirm(
            "¿Seguro que deseas borrar toda la hoja?"
        );


        if (!confirmar) {

            return;

        }


        for (let fila = 0; fila < filas; fila++) {

            for (
                let columna = 0;
                columna < columnas;
                columna++
            ) {

                datos[fila][columna] = "";

            }

        }


        // Elimina también los datos guardados
        localStorage.removeItem("hojaClara");


        recalcularTodo();


        // Limpiamos también la barra de fórmulas
        document.getElementById("nombreCelda").textContent =
            "A1";

        document.getElementById("barraFormula").value =
            "";

        celdaSeleccionada = null;

    });


// ========================================
// BOTÓN GUARDAR
// ========================================

document
    .getElementById("guardarHoja")
    .addEventListener(
        "click",
        guardarHoja
    );


// ========================================
// BOTÓN EXPORTAR CSV
// ========================================

document
    .getElementById("exportarCSV")
    .addEventListener(
        "click",
        exportarCSV
    );


// ========================================
// BARRA DE FÓRMULAS
// ========================================

const barraFormula =
    document.getElementById("barraFormula");


barraFormula.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            celdaSeleccionada !== null
        ) {

            event.preventDefault();

            const fila =
                celdaSeleccionada.dataset.fila;

            const columna =
                celdaSeleccionada.dataset.columna;


            // Guardamos lo escrito en la matriz
            datos[fila][columna] =
                barraFormula.value;


            // Recalculamos la hoja
            recalcularTodo();

        }

    }
);


// ========================================
// INICIAR HOJACLARA
// ========================================

cargarHoja();

hoja.appendChild(tabla);

recalcularTodo();