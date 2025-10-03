   
const titulo = document.getElementById("titulo");
//Manejo de variables globales/locales
// const estacion = ""

if (titulo) {
    
    titulo.classList.remove("text-blue-900", "text-pink-700", "text-yellow-700", "text-orange-700", "text-cyan-700", "text-slate-800");
    if (estacion === "primavera") {
        titulo.classList.add("text-pink-700"); 
    } else if (estacion === "verano") {
        titulo.classList.add("text-yellow-700"); 
    } else if (estacion === "otoño") {
        titulo.classList.add("text-orange-700"); 
    } else if (estacion === "invierno") {
        titulo.classList.add("text-cyan-700"); 
    } else {
        titulo.classList.add("text-slate-800");
    }
}

const temas = {
    primavera: {
        body: "bg-green-100",
        card: "bg-green-200",
        boton: "btn-success"
    },
    verano: {
        body: "bg-yellow-100",
        card: "bg-yellow-200",
        boton: "btn-warning"
    },
    otoño: {
        body: "bg-orange-100",
        card: "bg-orange-200",
        boton: "btn-accent"
    },
    invierno: {
        body: "bg-blue-100",
        card: "bg-blue-200",
        boton: "btn-info"
    }
};

let preguntas = [];
let indice = 0, puntos = 0;

const divTrivia = document.getElementById("trivia");
const puntaje = document.getElementById("puntaje");
const btnJugar = document.getElementById("btnJugar");

obtenerEstacion = () => {
    const mes = new Date().getMonth();
    if (mes >= 2 && mes <= 4) return "primavera";
    if (mes >= 5 && mes <= 7) return "verano";
    if (mes >= 8 && mes <= 10) return "otoño";
    return "invierno";
}

aplicarTema = (estacion) => {
    const tema = temas[estacion];
    const body = document.body;
    const card = document.querySelector(".card");
    const boton = document.getElementById("btnJugar");

    body.className = "flex flex-col items-center min-h-screen p-6 bg-blue-100";
    card.className = "card shadow-xl p-6 w-full max-w-lg bg-blue-200";
    boton.className = "btn-jugar btn btn-block w-full mb-4 btn-info";

    if (tema) {
        body.classList.replace("bg-blue-100", tema.body);
        card.classList.replace("bg-blue-200", tema.card);
        boton.classList.replace("btn-info", tema.boton);
    }

    let theme = "aqua";
    if (estacion === "primavera") theme = "valentine";
    else if (estacion === "verano") theme = "lemonade";
    else if (estacion === "otoño") theme = "retro";
    else if (estacion === "invierno") theme = "winter";
    window.document.documentElement.setAttribute("data-theme", theme);
}


const cargarPreguntas = () => { // Usar funciones de flecha / lambda
// function cargarPreguntas() {
    const estacion = obtenerEstacion();
    btnJugar.style.display = "none";
    fetch("preguntas.json") //fetch < axios
        .then(res => res.json())
        .then(data => {
            console.log("la estacion definida es: ",estacion)
            preguntas = data[estacion];
            aplicarTema(estacion);

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
            console.error("Error al obtener la trivia :(", error);
            divTrivia.innerHTML = "<p>La trivia no se cargó correctamente :(</p>";
        });

}

function mostrarPregunta() {
    if (indice >= preguntas.length) {
        finalizarTrivia();
        return;
    }

    const preguntaActual = preguntas[indice];
    // const opciones = [...preguntaActual.opciones];
    const opciones = preguntaActual.opciones

    opciones.sort(() => Math.random() - 0.5);

    divTrivia.innerHTML = `
        <div class="text-xl font-semibold mb-4">${preguntaActual.pregunta}</div>
        <div class="flex flex-col gap-2">
            ${opciones.map(opcion => `
                <button 
                    class="btn btn-outline w-full" 
                    onclick="verificarRespuesta('${opcion}','${preguntaActual.respuestaCorrecta}')">
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

const finalizarTrivia = () => {
    divTrivia.innerHTML = "";
    let premio = "";
    if (puntos === preguntas.length) premio = "¡Cupón 20% de descuento!";
    else if (puntos >= Math.ceil(preguntas.length / 2)) premio = "¡Cupón 10% de descuento!";
    else premio = "¡Cupón de envío gratis!";
    puntaje.innerHTML = `Tu puntaje: ${puntos}/${preguntas.length} <br> ${premio}`;
  
    const btnCupon = document.createElement("button");
    btnCupon.textContent = "Imprimir cupón de regalo";
    btnCupon.className = "btn btn-success w-full mt-4";
    btnCupon.onclick = function() {
        window.print();
    };
    divTrivia.appendChild(btnCupon);
}


btnJugar.addEventListener("click", cargarPreguntas);
