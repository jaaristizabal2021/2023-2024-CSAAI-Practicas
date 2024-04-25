
//-- Botones de inicio y reinicio del juego
const btnJugar = document.getElementById("play");
const btnReiniciar = document.getElementById("replay");

const title = document.getElementById('titulo');
 
//--Botones para elegir la dificultad
const op1 = document.getElementById('op1');
const op2 = document.getElementById('op2');
const op3 = document.getElementById('op3');

//--Display que muestre el número de aciertos y su contador
const display2= document.getElementById("display2");
let aciertos = 0;

//-- Audios del juego
const musica = new Audio('audioGame.mp3');
const acierto = new Audio('acierto.mp3');
const victoria = new Audio('win.mp3');

//-- Valor predefinido del número de parejas 
let dificultad = 4;

const selectors = {
    gridContainer: document.querySelector('.grid-container'),
    tablero: document.querySelector('.tablero'),
    movimientos: document.querySelector('.movimientos'),
    timer: document.querySelector('.timer'),
    comenzar: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
    parejasEmparejadas: 0, // Numero de parejas emparejadas
}


const generateGame = () => {

    const dimensions = dificultad;

    //-- Nos aseguramos de que el número de dimensiones es par
    // y si es impar lanzamos un error
    if (dimensions % 2 !== 0) {
        throw new Error("Las dimensiones del tablero deben ser un número par.")
    }

    //-- Creamos un array con los emojis que vamos a utilizar en nuestro juego
    const emojis = ['🐯', '🐒', '🦓', '🦊', '🐨', '🐷', '🐇', '🐼', '🦇', '🐊','🦁','🐗','🐍','🦝','🦏','🦛',
    '🦩','🐧','🦭','🐎','🐃','🦍','🦒','🐫','🐘','🐏','🐁','🦦','🦔','🐻‍❄️','🦬','🦜','🦚','🐫','🐄','🐆']


    //-- Elegimos un subconjunto de emojis al azar, así cada vez que comienza el juego
    // es diferente.
    // Es decir, si tenemos un array con 10 emojis, vamos a elegir el cuadrado de las
    // dimensiones entre dos, para asegurarnos de que cubrimos todas las cartas
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 

    //-- Después descolocamos las posiciones para asegurarnos de que las parejas de cartas
    // están desordenadas.
    const items = shuffle([...picks, ...picks])
    
    //-- Vamos a utilizar una función de mapeo para generar 
    //  todas las cartas en función de las dimensiones
    const cards = `
        <div class="tablero" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${item}</div>
                </div>
            `).join('')}
       </div>
    `
    
    //-- Vamos a utilizar un parser para transformar la cadena que hemos generado
    // en código html.
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    //-- Por último, vamos a inyectar el código html que hemos generado dentro de el contenedor
    // para el tablero de juego.
    selectors.tablero.replaceWith(parser.querySelector('.tablero'))
}

const pickRandom = (array, items) => {
    // La sintaxis de tres puntos nos sirve para hacer una copia del array
    const clonedArray = [...array]
    // Random picks va almacenar la selección al azar de emojis
    const randomPicks = [] 

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        // Utilizamos el índice generado al azar entre los elementos del array clonado
        // para seleccionar un emoji y añadirlo al array de randompicks.
        randomPicks.push(clonedArray[randomIndex])
        // Eliminamos el emoji seleccionado del array clonado para evitar que 
        // vuelva a salir elegido con splice.
        // 0 - Inserta en la posición que le indicamos.
        // 1 - Remplaza el elemento, y como no le damos un nuevo elemento se queda vacío.
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const shuffle = array => {
    const clonedArray = [...array]

    // Intercambiamos las posiciones de los emojis al azar para desorganizar el array
    // así nos aseguramos de que las parejas de emojis no están consecutivas.
    // Para conseguirlo utilizamos un algoritmo clásico de intercambio y nos apoyamos
    // en una variable auxiliar.
    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        // Del evento disparado vamos a obtener alguna información útil
        // Como el elemento que ha disparado el evento y el contenedor que lo contiene
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        // Cuando se trata de una carta que no está girada, le damos la vuelta para mostrarla
        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        
        } 
    })
}

const startGame = () => {
    // Iniciamos el estado de juego
    state.gameStarted = true
    // Desactivamos el botón de comenzar
    selectors.comenzar.classList.add('disabled')

    // Comenzamos el bucle de juego
    // Cada segundo vamos actualizando el display de tiempo transcurrido
    // y movimientos
    state.loop = setInterval(() => {
        musica.play();
        state.totalTime++
        selectors.movimientos.innerText = `${state.totalFlips} movimientos`
        selectors.timer.innerText = `tiempo: ${state.totalTime} sec`
    }, 1000)
}

const flipCard = card => {
    // Sumamos uno al contador de cartas giradas
    state.flippedCards++
    // Sumamos uno al contador general de movimientos
    state.totalFlips++

    // Si el juego no estaba iniciado, lo iniciamos
    if (!state.gameStarted) {
        startGame()
    }

    // Si no tenemos la pareja de cartas girada
    // Giramos la carta añadiendo la clase correspondiente
    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }
    
    // Si ya tenemos una pareja de cartas girada tenemos que comprobar
    if (state.flippedCards === 2) {
        // Seleccionamos las cartas que están giradas
        // y descartamos las que están emparejadas
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

        // Si las cartas coinciden las marcamos como pareja 
        // añadiendo la clase correspondiente
        if (flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
            aciertos += 1;
            display2.innerHTML = ("Aciertos: "+ (aciertos));
            acierto.currentTime = 0;
            acierto.play();

            state.parejasEmparejadas++;
        
        // Comprobamos si todas las parejas se han emparejado
        if (state.parejasEmparejadas * 2 === document.querySelectorAll('.card').length) {
            victoria.play();
            titulo.innerHTML = ('🐵🎉¡Has ganado!🎉🐵');
            clearInterval(state.loop);
            alert(`Enhorabuena! Has ganado. Inténtalo de nuevo.`);
            }
        }
        
        // Arrancamos un temporizador que comprobará si tiene
        // que volver a girar las cartas porque no hemos acertado
        // o las deja giradas porque ha sido un match
        // y para eso llamamos a la función flipBackCards()
        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    

}

const flipBackCards = () => {
    // Seleccionamos las cartas que no han sido emparejadas
    // y quitamos la clase de giro
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })
    // Ponemos el contado de parejas de cartas a cero
    state.flippedCards = 0
}
// Generamos el juego

// Asignamos las funciones de callback para determinados eventos
attachEventListeners()

// Al pulsar el boton de inicio se generara el tablero e iniciara el juego
btnJugar.onclick = () => {
    generateGame()
    startGame()
    musica.currentTime = 0;
    musica.play();
}

// Al pulsar el boton de reinicio
btnReiniciar.onclick = () => {
    location.reload();      //-- Reiniciando
}

// Variables que indicaran si esta pulsado un boton o no
let clicado = true;
let clicado2 = true;
let clicado3 = true;

//-- Botones para elegir dificultad
op1.onclick = () => {
    dificultad = op1.getAttribute('grid-dimension');

    if (clicado){
        op1.style.backgroundColor = "#42250c";
        op1.style.color ='#f1dc18'
        op2.style.backgroundColor = "#f1dc18";
        op2.style.color ='#42250c'
        op3.style.backgroundColor = "#f1dc18";
        op3.style.color ='#42250c'
        clicado = !clicado;

    } else{
        op1.style.backgroundColor = "#f1dc18";
        op1.style.color ='#42250c'
        op3.style.backgroundColor = "#42250c";
        op3.style.color ='#f1dc18'
        op2.style.backgroundColor = "#42250c";
        op2.style.color ='#f1dc18'
    }
    
}

op2.onclick = () => {
    dificultad = op2.getAttribute('grid-dimension');
    if (clicado2){
        op2.style.backgroundColor = "#42250c";
        op2.style.color ='#f1dc18'
        op1.style.backgroundColor = "#f1dc18";
        op1.style.color ='#42250c'
        op3.style.backgroundColor = "#f1dc18";
        op3.style.color ='#42250c'
        clicado2 = !clicado2;
        
    } else{
        op2.style.backgroundColor = "#f1dc18";
        op2.style.color ='#42250c'
        op1.style.backgroundColor = "#42250c";
        op1.style.color ='#f1dc18'
        op3.style.backgroundColor = "#42250c";
        op3.style.color ='#f1dc18'
    }
}

op3.onclick = () => {
    dificultad = op3.getAttribute('grid-dimension');
    if (clicado3){
        op3.style.backgroundColor = "#42250c";
        op3.style.color ='#f1dc18'
        op2.style.backgroundColor = "#f1dc18";
        op2.style.color ='#42250c'
        op1.style.backgroundColor = "#f1dc18";
        op1.style.color ='#42250c'
        clicado3 = !clicado3;

    } else{
        op3.style.backgroundColor = "#f1dc18";
        op3.style.color ='#42250c'
        op2.style.backgroundColor = "#42250c";
        op2.style.color ='#f1dc18'
        op1.style.backgroundColor = "#42250c";
        op1.style.color ='#f1dc18'
    }
}