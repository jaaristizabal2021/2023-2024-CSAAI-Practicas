
const gui = {
    display2 : document.getElementById("display2"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset"),

}

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display2);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  
//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
}

const botones = document.getElementsByClassName("digito")
const m1 = document.getElementById("m1")
const m2 = document.getElementById("m2")
const m3 = document.getElementById("m3")
const m4 = document.getElementById("m4")

let min = 0;
let max = 9;
let valorM1 = Math.floor(Math.random() * (max - min + 1)) + min;
let valorM2 = Math.floor(Math.random() * (max - min + 1)) + min;
let valorM3 = Math.floor(Math.random() * (max - min + 1)) + min;
let valorM4 = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(valorM1, valorM2, valorM3, valorM4);



for (let boton of botones) {
    boton.onclick = (ev) => {
    m1.innerHTML += boton.value
  }
}

var x = 1;

for (let boton of botones) {
  boton.onclick = (ev) => {
    if (x == 1) {
      if (boton.value == valorM1){
      m1.innerHTML += boton.value; 
      }
      console.log(x);
      x += 1;

    } else if (x == 2) {
      if (boton.value == valorM2){
        m2.innerHTML += boton.value; 
        }
      console.log(x);
      x += 1;

    } else if (x == 3) {
      if (boton.value == valorM3){
        m3.innerHTML += boton.value; 
        }
      console.log(x);
      x += 1;

    } else if (x == 4) {
      if (boton.value == valorM4){
        m4.innerHTML += boton.value; 
        }
        
      console.log(x);
      x = 1;
    }
  }
}

var x = 0;
for (let boton of botones) {
  boton.onclick = (ev) => {
    crono.start();
    if (boton.value == valorM1){
      m1.innerHTML += boton.value; 
      x += 1;
      }

    if (boton.value == valorM2){
        m2.innerHTML += boton.value; 
        x += 1;
        }
    if (boton.value == valorM3){
        m3.innerHTML += boton.value; 
        x += 1;
        }
    if (boton.value == valorM4){
        m4.innerHTML += boton.value; 
        x += 1;
        }
        if (x==4){
          console.log("Stop!");
          crono.stop();
        }
    }
}
