Proyecto Hoja Clara 

# HojaClara

HojaClara es una aplicación web tipo hoja de cálculo desarrollada como proyecto del curso de **Algoritmos**.

El proyecto fue realizado utilizando **HTML, CSS y JavaScript**, con el objetivo de aplicar conceptos de algoritmia mediante la creación de una hoja de cálculo sencilla capaz de trabajar con datos, fórmulas y referencias entre celdas.

## Funcionalidades

HojaClara permite:

- Ingresar y editar valores dentro de las celdas.
- Utilizar fórmulas que comienzan con `=`.
- Realizar operaciones de suma, resta, multiplicación y división.
- Utilizar paréntesis respetando la precedencia de operaciones.
- Utilizar referencias entre celdas, por ejemplo:

  `=A1+B1`

- Recalcular automáticamente las fórmulas cuando cambian los datos.
- Utilizar funciones sobre rangos:
  - `SUMA()`
  - `PROMEDIO()`
  - `MAX()`
  - `MIN()`
- Detectar errores como división entre cero, fórmulas incorrectas y referencias circulares.
- Guardar automáticamente los cambios utilizando almacenamiento local del navegador.
- Guardar manualmente mediante el botón **Guardar**.
- Exportar la información de la hoja a un archivo CSV.
- Navegar entre celdas utilizando el teclado.
- Consultar y modificar fórmulas mediante la barra de fórmulas.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git y GitHub

El proyecto fue desarrollado utilizando JavaScript puro, sin frameworks externos para la lógica de la hoja de cálculo.

## Estructura del proyecto

El código se encuentra dividido en diferentes archivos para separar las responsabilidades principales de la aplicación.

- `index.html` — estructura principal de la aplicación.
- `style.css` — diseño visual de HojaClara.
- `script.js` — creación de la cuadrícula e interacción con las celdas.
- `Js/motorCalculos.js` — evaluación de fórmulas y expresiones.
- `Js/operacionesHoja.js` — operaciones y funciones utilizadas por la hoja.
- `Js/almacenamientoHoja.js` — guardado, carga y exportación de información.

## Uso básico

Para ingresar un dato, se selecciona una celda y se escribe el valor deseado.

Las fórmulas deben comenzar con el símbolo `=`.

Ejemplos:

`=10+5`

`=A1+B1`

`=(A1+B1)*2`

`=SUMA(A1:A5)`

`=PROMEDIO(A1:A5)`

Los resultados se actualizan automáticamente cuando cambia la información utilizada por una fórmula.

## Ejecutar el proyecto

HojaClara puede ejecutarse directamente desde un navegador web.

También se puede descargar o clonar este repositorio y abrir el archivo `index.html`.

## Proyecto publicado

La aplicación se encuentra publicada mediante GitHub Pages:

https://jlarojg-blip.github.io/Practica-1-HojaClara-Algoritmos-/

## Autor

**Josué David Antonio Laroj Gallina**

Curso: Algoritmos  
Universidad Mariano Gálvez de Guatemala
