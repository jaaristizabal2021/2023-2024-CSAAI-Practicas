console.log("Ejecutando JS...");

const botones = document.getElementsByClassName("digito");
display = document.getElementById("display");

for (let boton of botones) {
    console.log("Boton: " +  boton.value)
    display.innerHTML = boton.value;
}