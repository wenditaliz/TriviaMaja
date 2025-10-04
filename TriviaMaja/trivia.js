let preguntas = [];
let indice = 0, puntos = 0;
let estacionActual = "";

const divTrivia = document.getElementById("trivia");
const puntaje = document.getElementById("puntaje");
const btnJugar = document.getElementById("btnJugar");

const cargarPreguntas = () => {
    estacionActual = obtenerEstacion(); // ← usa la variable global
    aplicarColorTitulo(estacionActual);
    btnJugar.style.display = "none";

    fetch("preguntas.json")
        .then(res => res.json())
        .then(data => {
            console.log("Estación actual:", estacionActual);
            preguntas = data[estacionActual];

            aplicarTema(estacionActual);

            if (!Array.isArray(preguntas)) {
                divTrivia.innerHTML = "<p>Error: No se pudo cargar la trivia.</p>";
                return;
            }

            preguntas.sort(() => Math.random() - 0.5);
            preguntas = preguntas.slice(0, 3);
            indice = 0;
            puntos = 0;
            puntaje.innerHTML = "";
            mostrarPregunta();
        })
        .catch(error => {
            console.error("Error al obtener la trivia:", error);
            divTrivia.innerHTML = "<p>La trivia no se cargó correctamente :(</p>";
        });
};

function mostrarPregunta() {
    if (indice >= preguntas.length) {
        finalizarTrivia();
        return;
    }

    const preguntaActual = preguntas[indice];
    const opciones = [...preguntaActual.opciones].sort(() => Math.random() - 0.5);

    // Obtener color del tema actual
    const estacion = obtenerEstacion(); // o usar obtenerEstacion();
    const colorClase = temas[estacionActual]?.botonColor || "bg-blue-900 text-white";

    divTrivia.innerHTML = `
        <div class="text-xl font-semibold mb-4">${preguntaActual.pregunta}</div>
        <div class="flex flex-col gap-2">
            ${opciones.map(opcion => `
                <button 
                    class="w-full px-4 py-3 rounded font-semibold transition-colors ${colorClase}"
                    onclick="verificarRespuesta('${opcion}', '${preguntaActual.respuestaCorrecta}')">
                    ${opcion}
                </button>
            `).join("")}
        </div>
    `;
}


function verificarRespuesta(opcion, correcta) {
    if (opcion === correcta) puntos++;
    indice++;
    mostrarPregunta();
}

function finalizarTrivia() {
    divTrivia.innerHTML = "";
    let premio = "";

    if (puntos === preguntas.length) premio = "¡Cupón 20% de descuento!";
    else if (puntos >= Math.ceil(preguntas.length / 2)) premio = "¡Cupón 10% de descuento!";
    else premio = "¡Cupón de envío gratis!";

    puntaje.innerHTML = `Tu puntaje: ${puntos}/${preguntas.length} <br> ${premio}`;

    const btnCupon = document.createElement("button");
    btnCupon.textContent = "Imprimir cupón de regalo";
    btnCupon.className = "btn btn-success w-full mt-4";
    btnCupon.onclick = () => window.print();
    divTrivia.appendChild(btnCupon);
}

btnJugar.addEventListener("click", cargarPreguntas);
