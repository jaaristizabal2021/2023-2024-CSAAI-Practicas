//-- Manejador del evento clic sobre el párrafo test
//-- Cada vez que se hace clic en el párrafo se invoca a esta función
function manejador_parrafo()
{
  console.log("Clic sobre el párrafo...")
}

console.log("Ejecutando js...")

//-- Leer el párrafo identificado como b1
const bt1 = document.getElementById('b1')
const disp1 = document.getElementById('disp1')
const bt2 = document.getElementById('b2')
//-- Configurar el manejador para el evento de
//-- pulsación de botón: que se ejecute la
//-- funcion manejador_parrafo()
bt1.onclick = () =>{
    console.log("Click sobre el botón 1")
    //-- disp1.innerHTML= "Clic sobre el párrafo..."
    disp1.innerHTML += "1"
    disp1.style.backgroundColor= "blue"

}

bt2.onclick = () => {
    console.log('Click sobre el botón 2')
    disp1.innerHTML += "2"
    disp1.style.backgroundColor= "red"
}



