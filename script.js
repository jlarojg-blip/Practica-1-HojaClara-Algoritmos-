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

    campo.value = datos[td.dataset.fila][td.dataset.columna];

    td.textContent = "";

    campo.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            datos[td.dataset.fila][td.dataset.columna] = campo.value;
            td.textContent = campo.value;
        }

        if (event.key === "Escape") {
    td.textContent = datos[td.dataset.fila][td.dataset.columna];
}

    });

    campo.addEventListener("blur", function () {
    datos[td.dataset.fila][td.dataset.columna] = campo.value;
    td.textContent = campo.value;
});

    td.appendChild(campo);

    campo.focus();
    campo.select();

});

        tr.appendChild(td);
    }

    tabla.appendChild(tr);
}


const datos = [];

for (let fila = 0; fila < filas; fila++) {

    const nuevaFila = [];

    for (let columna = 0; columna < columnas; columna++) {

        nuevaFila.push("");
    }

    datos.push(nuevaFila);
}


hoja.appendChild(tabla);