var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight * .9;
var linesInput = $("#linesInput");
var hexColor = [0, 0, 0, 0, 0, 0];
var random = 0;
var points = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
};
var generationType = [0, 1, 2];
var generationChoice;
var animateGen;
var staticX = ctx.canvas.width / 2;
var staticY = ctx.canvas.height / 2;
var i = 0;
var a = function(){ return points.a};
var b = function(){ return points.b};
var c = function(){ return points.c};
var d = function(){ return points.d};

function setPoint(maxValue) {
  random = Math.floor((Math.random() * maxValue) + 1);
  points.a = random;
}

function generatePoint(maxX, maxY) {
  random = Math.floor((Math.random() * maxX) + 1);
  points.a = random;
  //alert(points.a);
  random = Math.floor((Math.random() * maxY) + 1);
  points.b = random;
  //alert(points.b);  
  random = Math.floor((Math.random() * maxX) + 1);
  points.c = random; 
  random = Math.floor((Math.random() * maxY) + 1);
  points.d = random;
}

function pickRandom(maxValue) {
  random = Math.floor(Math.random() * maxValue);
  return random;
}

function pickHex() {
  for (i = 0; i < 6; i++) {
    hexColor[i] = pickRandom(10);
  }
  var colorChoice = '#' + hexColor.join("");
  //alert(colorChoice);
  ctx.strokeStyle = colorChoice;
}

function generateLines() {
  //alert("in function");  
  //generationChoice = pickRandom(4);
  generatePoint(ctx.canvas.width, ctx.canvas.height);
  pickHex();
  ctx.beginPath();
  ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.lineTo(a(), b());
  ctx.stroke();
  ctx.closePath();
  i++;
}

function generateCircles() {
  generatePoint(ctx.canvas.width , ctx.canvas.height);
  pickHex();
  ctx.beginPath();
  ctx.arc(a(), b(), a() / b(), 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function generatePath() {
	generatePoint(ctx.canvas.width, ctx.canvas.height);
  pickHex();
  ctx.beginPath();
  ctx.moveTo(staticX, staticY);
  ctx.lineTo(c(), d());
  ctx.moveTo(c(), d());
  generatePoint(ctx.canvas.width, ctx.canvas.height);
  ctx.lineTo(a(), b());
  staticX = a();
  staticY = b();
  ctx.stroke();
  ctx.closePath();
}

function generate(lines, circles, path) {
  if (lines) {
    clearInterval(animateGen);
    animateGen = setInterval(generateLines, 250);
  }
  else if (circles) {
    clearInterval(animateGen);
    animateGen = setInterval(generateCircles, 100);
  }
  else if (path) {
  	clearInterval(animateGen);
    animateGen = setInterval(generatePath, 250);
  }
}

function stopIt() {
  clearInterval(animateGen);
  ctx.closePath();
}

function clearCanvas() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
