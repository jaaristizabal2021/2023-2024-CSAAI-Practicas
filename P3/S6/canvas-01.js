console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 300;
canvas.height = 100;

const ctx = canvas.getContext("2d");
ctx.rect(5,5, 100, 50);