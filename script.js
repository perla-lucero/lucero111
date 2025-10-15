document.addEventListener("DOMContentLoaded", () => {

    // --- LOGIN ---
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value.trim();
            const clave = document.getElementById("clave").value.trim();
            const mensaje = document.getElementById("mensajeError");

            const user = "admin";
            const pass = "12345";

            if (usuario === user && clave === pass) {
                localStorage.setItem("logueado", "true");
                window.location.href = "index.html";
            } else {
                mensaje.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }

    // --- VERIFICAR SESIÓN ---
    if (window.location.pathname.endsWith("index.html")) {
        const logueado = localStorage.getItem("logueado");
        if (!logueado) {
            window.location.href = "login.html";
        }
    }

    // --- CERRAR SESIÓN ---
    const cerrarSesion = document.getElementById("cerrarSesion");
    if (cerrarSesion) {
        cerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("logueado");
            window.location.href = "login.html";
        });
    }

    // --- REGISTRO DE PACIENTES ---
    const form = document.getElementById("formRegistro");
    const tabla = document.getElementById("tablaPacientes")?.querySelector("tbody");

    if (form && tabla) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const edad = document.getElementById("edad").value.trim();
            const motivo = document.getElementById("motivo").value.trim();
            const diagnostico = document.getElementById("diagnostico").value.trim();
            const fechaCita = document.getElementById("fechaCita").value;

            if (nombre === "" || edad === "" || motivo === "" || fechaCita === "") {
                alert("Por favor complete todos los campos obligatorios.");
                return;
            }

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nombre}</td>
                <td>${edad}</td>
                <td>${motivo}</td>
                <td>${diagnostico}</td>
                <td>${fechaCita}</td>
            `;
            tabla.appendChild(fila);
            form.reset();

            // Crear recordatorio
            const recordatoriosDiv = document.getElementById("recordatorios");
            const recordatorio = document.createElement("div");
            recordatorio.classList.add("recordatorio");

            const hoy = new Date();
            const cita = new Date(fechaCita);
            const diferencia = (cita - hoy) / (1000 * 60 * 60 * 24);

            let color = "#004c99";
            if (diferencia < 0) color = "red";
            else if (diferencia <= 2) color = "orange";

            recordatorio.style.borderLeft = '5px solid ${color}';
            recordatorio.innerHTML = `
                <h5>🩺 Cita próxima: ${nombre}</h5>
                <p><strong>Fecha:</strong> ${fechaCita}</p>
                <p><strong>Motivo:</strong> ${motivo}</p>
                <p><strong>Estado:</strong> ${
                    diferencia < 0 ? "Cita vencida" :
                    diferencia <= 2 ? "Próxima cita" :
                    "En agenda"
                }</p>
            `;
            recordatoriosDiv.appendChild(recordatorio);
        });
    }
});

