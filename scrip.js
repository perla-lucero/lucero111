document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRegistro");
    const tabla = document.getElementById("tablaPacientes").querySelector("tbody");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const motivo = document.getElementById("motivo").value.trim();
        const diagnostico = document.getElementById("diagnostico").value.trim();

        if (nombre === "" || edad === "" || motivo === "") {
            alert("Por favor complete todos los campos obligatorios.");
            return;
        }

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${edad}</td>
            <td>${motivo}</td>
            <td>${diagnostico}</td>
        `;

        tabla.appendChild(fila);
        form.reset();

        // Animación suave al agregar
        fila.style.backgroundColor = "#d1e7ff";
        setTimeout(() => fila.style.backgroundColor = "white", 1000);
    });
});