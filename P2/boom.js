

const reloj = {
  display2 : document.getElementById("display2"),
  start : document.getElementById("start"),
  stop : document.getElementById("stop"),
  reset : document.getElementById("reset"),

}

const titulo = document.getElementById("titulo")
const botones = document.getElementsByClassName("digito")
const m1 = document.getElementById("m1")
const m2 = document.getElementById("m2")
const m3 = document.getElementById("m3")
const m4 = document.getElementById("m4")
const numIntentos = document.getElementById("intentos")

let min = 0;
let max = 9;
let valorM1 = Math.floor(Math.random() * (max - min + 1)) + min;
let valorM2 = Math.floor(Math.random() * (max - min + 1)) + min;
let valorM3 = Math.floor(Math.random() * (max - min + 1)) + min;
let valorM4 = Math.floor(Math.random() * (max - min + 1)) + min;
var acierto = 0;
var intentos = 0;

//-- Definir un objeto cronómetro
const crono = new Crono(reloj.display2);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
reloj.start.onclick = () => {
  console.log("Start!!");
  crono.start();
}

//-- Detener el cronómetro
reloj.stop.onclick = () => {
  console.log("Stop!");
  crono.stop();
}

//-- Reset del cronómetro
reloj.reset.onclick = () => {
  console.log("Reset!");
  m1.innerHTML = "*";
  m2.innerHTML = "*";
  m3.innerHTML = "*";
  m4.innerHTML = "*";
  valorM1 = Math.floor(Math.random() * (max - min + 1)) + min;
  valorM2 = Math.floor(Math.random() * (max - min + 1)) + min;
  valorM3 = Math.floor(Math.random() * (max - min + 1)) + min;
  valorM4 = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(valorM1, valorM2, valorM3, valorM4);
  acierto = 0;
  numIntentos.innerHTML = ("Intentos: "+ intentos);
  titulo.innerHTML = "BOOM!";
  crono.reset();
}


var acierto = 0;
console.log(valorM1, valorM2, valorM3, valorM4);

for (let boton of botones) {
  boton.onclick = (ev) => {
  crono.start();
  console.log("Intentos: ", intentos);
  if (boton.value == valorM1 && m1.innerHTML === '*'){
    console.log(boton.value," Aciertos: ", acierto);
    m1.innerHTML = boton.value; 
    acierto += 1;
    }     
  if (boton.value == valorM2 && m2.innerHTML === '*'){
      var y = 0;
      console.log(boton.value," Aciertos: ", acierto);
      m2.innerHTML = boton.value; 
      acierto += 1;

      }        
  if (boton.value == valorM3 && m3.innerHTML === '*'){
      console.log(boton.value," Aciertos: ", acierto);
      m3.innerHTML = boton.value; 
      acierto += 1;
      }        
  if (boton.value == valorM4 && m4.innerHTML === '*'){
      console.log(boton.value," Aciertos: ", acierto);
      m4.innerHTML = boton.value; 
      acierto += 1;
      }
  if ( acierto == 4){
        console.log("Stop!");
        crono.stop();
        if (acierto == 4){
            titulo.innerHTML = "YOU WIN!";
            intentos = 0;
        }
        }
  if (intentos < 5){
      intentos += 1;
      numIntentos.innerHTML = ("Intentos: "+ intentos);
    }
    else{
      titulo.innerHTML = "Has perdido!"
      console.log("Stop!");
      crono.stop();
      intentos = 0;
      }
        
 }
}
