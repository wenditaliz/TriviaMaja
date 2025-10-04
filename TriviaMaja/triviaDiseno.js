
const obtenerEstacion = () => {
    const mes = new Date().getMonth();
    if (mes >= 2 && mes <= 4) return "primavera";
    if (mes >= 5 && mes <= 7) return "verano";
    if (mes >= 8 && mes <= 10) return "otono";
    return "invierno";
};

const temas = {
    primavera: {
        body: "bg-green-100",
        card: "bg-green-200",
        botonColor: "bg-green-500 hover:bg-green-600 text-white",
        imagen: "primavera.avif"
    },
    verano: {
        body: "bg-yellow-100",
        card: "bg-yellow-200",
        botonColor: "bg-yellow-500 hover:bg-yellow-600 text-white",
        imagen: "verano.avif"
    },
    otono: {
        body: "bg-orange-100",
        card: "bg-orange-200",
        botonColor: "bg-orange-500 hover:bg-orange-600 text-white",
        imagen: "otono.avif"
    },
    invierno: {
        body: "bg-blue-100",
        card: "bg-blue-200",
        botonColor: "bg-blue-500 hover:bg-blue-600 text-white",
        imagen: "invierno.avif"
    }
};


const aplicarTema = (estacionActual) => {
    const tema = temas[estacionActual];
    const body = document.body;
    const card = document.querySelector(".card");
    const boton = document.getElementById("btnJugar");
    const imagenDiv = document.getElementById("imagenEstacion");

    // Clases base consistentes
    body.className = "flex flex-col items-center min-h-screen p-6";
    card.className = "card shadow-xl p-6 w-full max-w-lg";
    boton.className = "btn btn-block w-full mb-4 rounded-md font-bold py-3 px-4 transition-colors duration-300";

    if (tema) {
        body.classList.add(tema.body);
        card.classList.add(tema.card);

        if (imagenDiv) {
            imagenDiv.innerHTML = `<img src="img/${tema.imagen}" alt="${estacionActual}" class="w-full h-40 object-cover rounded mb-4">`;
        }
        // Aplica los colores del botón
        tema.botonColor.split(" ").forEach(cls => boton.classList.add(cls));
    }

    // Tema de DaisyUI
    let theme = "aqua";
    if (estacionActual === "primavera") theme = "valentine";
    else if (estacionActual === "verano") theme = "lemonade";
    else if (estacionActual === "otono") theme = "retro";
    else if (estacionActual === "invierno") theme = "winter";
    document.documentElement.setAttribute("data-theme", theme);
};

const aplicarColorTitulo = (estacionActual) => {
    const titulo = document.getElementById("tituloTrivia");
    if (!titulo) return;

    titulo.classList.remove(
        "text-blue-900",
        "text-pink-700",
        "text-yellow-700",
        "text-orange-700",
        "text-cyan-700",
        "text-slate-800"
    );

    const colores = {
        primavera: "text-pink-700",
        verano: "text-yellow-700",
        otono: "text-orange-700",
        invierno: "text-cyan-700"
    };

    titulo.classList.add(colores[estacionActual] || "text-slate-800");
};
