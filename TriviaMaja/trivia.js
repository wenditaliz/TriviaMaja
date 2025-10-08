let preguntas = [];
let indice = 0, puntos = 0;
let estacionActual = "";

const divTrivia = document.getElementById("trivia");
const puntaje = document.getElementById("puntaje");
const btnJugar = document.getElementById("btnJugar");

const cargarPreguntas = async () => {

    try{
    //estacionActual = obtenerEstacion(); 
    estacionActual = "primavera";
    aplicarColorTitulo(estacionActual);
    btnJugar.style.display = "none";

    const respuestaAxios = await axios.get("preguntas.json");
    const datos = respuestaAxios.data;

    console.log("Estación actual:", estacionActual);
    preguntas= datos[estacionActual];

    aplicarTema(estacionActual);

            if(!Array.isArray(preguntas)){
                divTrivia.innerHTML = "<p>Error: No se  pudo cargar la trivia :(<p>";
                return;
            }

            preguntas.sort(() => Math.random() - 0.5);
            preguntas = preguntas.slice(0, 3);
            indice = 0;
            puntos = 0;
            puntaje.innerHTML = "";
            mostrarPregunta();

    }catch(error) {
            console.error("Error al obtener la trivia:", error);
            divTrivia.innerHTML = "<p>La trivia no se cargó correctamente :(</p>";
        };
};

function mostrarPregunta() {
    if (indice >= preguntas.length) {
        finalizarTrivia();
        return;
    }

    const preguntaActual = preguntas[indice];
    //const opciones = [...preguntaActual.opciones].sort(() => Math.random() - 0.5);
    const opciones = preguntaActual.opciones.sort(() => Math.random() - 0.5);


    const estacion = obtenerEstacion(); 
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

    if (puntos === preguntas.length) {
        premio = "¡Cupón 20% de descuento!";
    } else if (puntos >= Math.ceil(preguntas.length / 2)) {
        premio = "¡Cupón 10% de descuento!";
    } else if (puntos === 0) {
        premio = "¡Suerte para la próxima!";
    } else {
        premio = "¡Cupón de envío gratis!";
    }

    puntaje.innerHTML = `Tu puntaje: ${puntos}/${preguntas.length} <br> ${premio}`;

    if (puntos > 0) {
        const btnJugarRef = document.getElementById("btnJugar");
        const btnCupon = document.createElement("button");
        btnCupon.textContent = "Imprimir cupón de regalo";

        // Copiar todas las clases del botón Jugar
        if (btnJugarRef) {
            btnCupon.className = btnJugarRef.className;
        } else {
            btnCupon.className = "btn btn-block w-full mb-4";
        }

        btnCupon.classList.add("no-imprimir");

        btnCupon.onclick = () => window.print();
        divTrivia.appendChild(btnCupon);
    }
}

btnJugar.addEventListener("click", cargarPreguntas);
