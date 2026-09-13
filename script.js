console.log("HojaClara iniciado");

const filas = 15; 
const columnas = 10;

const hoja = document.getElementById("hoja");



const tabla = document.createElement("table");


const encabezado = document.createElement("tr");

const esquina = document.createElement("th");

esquina.textContent = "";

encabezado.appendChild(esquina);

for (let i = 0 ; i < columnas; i++) {
    const th = document.createElement("th");
    th.textContent = String.fromCharCode(65 + i);
    encabezado.appendChild(th);
}
tabla.appendChild(encabezado);

for (let fila = 1 ; fila <=  filas; fila++) {
    const tr = document.createElement("tr");
    const numeroFila = document.createElement("th");
    numeroFila.textContent = fila;
    tr.appendChild(numeroFila);

    for (let columna = 0; columna < columnas; columna++) {
        const td = document.createElement("td");
        tr.appendChild(td);
    }
           tabla.appendChild(tr);
}

hoja.appendChild(tabla);