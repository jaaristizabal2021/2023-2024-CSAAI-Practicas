console.log("Ejecutando JS...");

const elemento = document.getElementById("elemento");
const boton = document.getElementById("boton");

boton.onclick = () => {
  console.log("Clic!");

  //-- Cambiar color
  if (elemento.style.backgroundColor == "red") {
    elemento.style.backgroundColor = "yellow";
  } else {
    elemento.style.backgroundColor = "red" 
  }
  //elemento.style.backgroundColor = randomColor();
}

function randomColor () {
    //calcula los valores rgb de manera aleatoria por separado
    //combina en un único color hexadecimal
    return rcolor
}