// Variablen
var lightIsOn = false;
var filterIsOn = false;
var isPaused = false;
var lightSpeedIsC = false;
var circles = [];
var interval;
var lightSpeed = 25;

// Const
const filterswitch = document.getElementById('filter-switch');                   
const lightswitch = document.getElementById('light-switch'); 
const lightspeedswitch = document.getElementById('lightspeed-switch')
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lightIcon = document.getElementById('light-icon');


const initialRadius = 10;
const lightOnColor = "white";
const lightOffColor = "black";
const lightFilterColor = "#ffc341ff";

const targetFPS = 24;
const maxRadius = 10000;

// Events
lightswitch.addEventListener('change', toggleLight);
filterswitch.addEventListener('change', toggleFilter);
lightspeedswitch.addEventListener('change', toggleSpeed);       //?????????
lightswitch.checked = false;
filterswitch.checked = false;
lightspeedswitch.checked = false;

// Canvas
const canvas = document.getElementById('simulationcanvas');
const ctx = canvas.getContext("2d");

function drawCircle(radius, color) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill ();
}

function createCircle(cirlceColor) {

    if (!interval && !isPaused) {
        startIntervall();
    }

    circles.push({
        color: cirlceColor,
        radius: initialRadius
    });
}


// Licht an / aus
function toggleLight() {   
    lightIsOn = lightswitch.checked;

    if (lightIsOn) {
        lightIcon.style.display = "block";
        if (filterIsOn) {
            createCircle(lightFilterColor);
        } else {
            createCircle(lightOnColor);
        }
    } else {
        lightIcon.style.display = "none";
        createCircle(lightOffColor);
    }  
}

// filter an / aus
function toggleFilter() {
    filterIsOn = filterswitch.checked;

    if (!lightIsOn) return;

    if (filterIsOn) {
        createCircle(lightFilterColor);
    } else {
        createCircle(lightOnColor);
    } 
}

//Lichtgeschwindigkeit
function toggleSpeed() {
    lightSpeedIsC = lightspeedswitch.checked;

    if (lightSpeedIsC) {
        lightSpeed = 10000000;
    } else {
        lightSpeed = 25;
    }
}


// simulation stopp / start
function stopIntervall() {
    clearInterval(interval)
    interval = null;
}

function startIntervall() {
    interval = setInterval(()=> {
        growCircles(lightSpeed / targetFPS) 
    }, 1000 / targetFPS);
}

function growCircles(deltaR) {
    circles.forEach(circle => {
        circle.radius += deltaR;
        circle.radius = Math.min(circle.radius, maxRadius);
        drawCircle(circle.radius, circle.color);
    });
}

pauseBtn.addEventListener('click', () => {

    isPaused = !isPaused;

    if (isPaused){
        stopIntervall();
        pauseBtn.textContent='Weiter';
    } else{
        pauseBtn.textContent='Stopp';

        if (circles.length > 0) {
            startIntervall();
        }
    }
});

//Reset

resetBtn.addEventListener('click', () => {
    lightIsOn = false;
    filterIsOn = false;
    lightSpeedIsC =false;
    isPaused = false;
    circles = [];
    lightswitch.checked = false;
    filterswitch.checked = false;
    lightspeedswitch.checked = false; 
    lightIcon.style.display = "none";
    pauseBtn.textContent='Stopp';
    stopIntervall();
    ctx.clearRect(0,0,2000,2000);
})
