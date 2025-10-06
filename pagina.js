// Referencias a elementos HTML
const inputExcel = document.getElementById("input-excel");
const tabla = document.getElementById("tabla-excel");
const buscador = document.getElementById("buscador");
let datosGlobales = []; // Guardar datos del Excel

// Leer archivo Excel
inputExcel.addEventListener("change", (event) => {
  const archivo = event.target.files[0];
  const lector = new FileReader();

  lector.onload = function(e) {
    const datos = new Uint8Array(e.target.result);
    const workbook = XLSX.read(datos, { type: "array" });
    const nombreHoja = workbook.SheetNames[0]; // Tomar primera hoja
    const hoja = workbook.Sheets[nombreHoja];

    // Convertir hoja a JSON
    datosGlobales = XLSX.utils.sheet_to_json(hoja, { header: 1 });

    mostrarTabla(datosGlobales);
  };

  lector.readAsArrayBuffer(archivo);
});

// Mostrar datos en la tabla HTML
function mostrarTabla(datos) {
  tabla.innerHTML = ""; // Limpiar tabla

  datos.forEach((fila) => {
    const tr = document.createElement("tr");
    fila.forEach((celda) => {
      const td = document.createElement("td");
      td.textContent = celda;
      tr.appendChild(td);
    });
    tabla.appendChild(tr);
  });
}

// Filtrar búsqueda
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = datosGlobales.filter((fila) =>
    fila.some((celda) => celda && celda.toString().toLowerCase().includes(texto))
  );
  mostrarTabla(filtrados);
});
