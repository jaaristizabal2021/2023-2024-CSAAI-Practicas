console.log("Ejecutando JS...");

const canvas = document.getElementById("ctiro");

//-- Acceder al botón de disparo
const btnLanzar = document.getElementById("btnLanzar");
//-- Acceder al botón de inicio
const btnIniciar = document.getElementById("btnIniciar");

//-- Sonidos
const lanzarSonido = new Audio('audio1.mp3');
const victoriaSonido = new Audio('audio2.mp3');
const falloSonido = new Audio('audio3.mp3');


canvas.width = 900;
canvas.height = 500;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

const reloj = {
    display : document.getElementById("display"),
    start : document.getElementById("angle"),
    stop : document.getElementById("stop"),
  }

//-- Constantes display y rangos de velocidad y ángulo 
const crono = new Crono(reloj.display);
const vel = document.getElementById("vel");
const display2= document.getElementById("display2");
const range_disp = document.getElementById("dispVel");
const range_disp2 = document.getElementById("dispVel2");
const angle = document.getElementById("angle");
const range_disp3 = document.getElementById("dispAngle");
const range_disp4 = document.getElementById("dispAngle2");

//--Titulo
let titulo = document.getElementById("titulo");

//--Display que muestre el número de aciertos
let aciertos = 0;

//-- Coordenadas iniciales del proyectil
let xop = 5;
let yop = 300;
let xp = xop;
let yp = yop;

//-- Parámetros reelevantes proyectil
let angulo = Math.PI / 4;
let gravedad = 0.2;
let tiempo = 1;

//-- Velocidad proyectil
let velp = 15;

//-- Coordenadas iniciales del objetivo
let xomin = 516;
let xomax = 1300;
let yomin = 40;
let yomax = 700;
let xob = Math.floor(Math.random() * (canvas.width-250));; 
let yob = Math.floor(Math.random() * (canvas.height-250));; 


//-- función para pintar el proyectil
function dibujarP(x,y,lx,ly,color) {

    //-- Pintando el proyectil
    ctx.beginPath();

    //-- Definir un rectángulo de dimensiones lx x ly,
    ctx.rect(x, y, lx, ly);

    //-- Color de relleno del rectángulo
    ctx.fillStyle = color;

    //-- Mostrar el relleno
    ctx.fill();

    //-- Mostrar el trazo del rectángulo
    ctx.stroke();

    ctx.closePath();
}

//-- función para pintar el objetivo
function dibujarO(x,y) {

    //-- Pintando el objetivo
    ctx.beginPath();

    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'red';

    //-- Dibujar el relleno
    ctx.fill()    

    //-- Dibujar el trazo
    ctx.stroke();

    ctx.closePath();
}

//-- Dibujar el objetivo
dibujarO(xob,yob); // Pintar el objetivo

//-- Dibujar el proyectil
dibujarP(xop, yop, 50, 50, "darkblue"); // Pintar el proyectil

//-- Función que detecta la colisión entre proyectil y bola
function detectarColision() {
    // Calcular la distancia entre el centro del proyectil y el centro del objetivo
    const distancia = Math.sqrt((xp - xob) ** 2 + (yp - yob) ** 2);

    // Si la distancia es menor que la suma de los radios del proyectil y el objetivo, hay colisión
    if (distancia < 60) { // El radio del proyectil es 25, y el del objetivo también es 25
        aciertos += 1;
        display2.innerHTML = ("Aciertos: "+ (aciertos));
        victoriaSonido.play();
        crono.stop();
        return true;
    }
    return false;
}

//-- Función principal de actualización
function lanzar() 
{
  //-- Implementación del algoritmo de animación:

  //-- 1) Actualizar posición de los elementos
    let velx = velp * Math.cos(angulo);
    let vely = velp * Math.sin(angulo) - gravedad*tiempo;
    xp = xop + velx * tiempo;
    yp = yop - vely * tiempo + 0.5 * gravedad * tiempo * tiempo;
    tiempo += 0.1;

    // Verificar si el proyectil ha alcanzado los límites del canvas en el eje X
    if (xp < 0 || xp > canvas.width) {
        titulo.innerHTML = "Has fallado! Vuelve a intertarlo";
        falloSonido.play();
        crono.stop();
    }

    // Verificar si el proyectil ha alcanzado los límites del canvas en el eje Y
    if (yp < 0 || yp > canvas.height) {
        titulo.innerHTML = "Has fallado! Vuelve a intertarlo";
        falloSonido.play();
        crono.stop();
    }
    //-- if xp - xo  menor 10{}
    //-- 2) Borrar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //-- 3) Dibujar los elementos visibles
    dibujarP(xp, yp, 50, 50, "yellow"); // Pintar el proyectil
    dibujarO(xob,yob); // Pintar el objetivo

    // Detectar colisión
    if (detectarColision()) {
        titulo.innerHTML = "Has acertado!!!";
        return; // Detener la animación cuando se alcanza el objetivo
        alert("¡Objetivo alcanzado!");

    }

    requestAnimationFrame(lanzar);}

//-- Deslizadores de velocidad y ángulo
vel.oninput = () => {
    range_disp.innerHTML = vel.value;
}
    
vel.onchange = () => {
    range_disp2.innerHTML = vel.value;
    velp = vel.value ;
}

angle.oninput = () => {
    range_disp3.innerHTML = angle.value;
}

angle.onchange = () => {
    range_disp4.innerHTML = angle.value;
    angulo = angle.value * Math.PI/180;
    crono.start();
}

//-- Función de retrollamada del botón de disparo
btnLanzar.onclick = () => {
    lanzar();
    crono.start();
    lanzarSonido.currentTime = 0;
    lanzarSonido.play();
}

//-- Función de retrollamada del botón iniciar
btnIniciar.onclick = () => {
    location.reload();      //-- Reiniciando
    dibujarP(xop, yop, 50, 50, "green"); // Pintar el proyectil

}
