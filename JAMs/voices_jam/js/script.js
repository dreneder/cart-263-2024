/**
 * Speech Pictionary
 * André Neder
 * 
 * The Speech Pictionary is my attempt to replicate the game Pictionary with P5 and P5 Speech.
 * The whole game is divided in two states: home and card. When the user is in "home" the speech recognizer allows
 * for a category to be chosen. There are three categories: Object, Person/Place/Animal and Movie, and an All Play
 * category that picks a random card from all the other three.
 * My approach to make the drawings was to draw them with a pen on an iPad and record it. The video is them cropped
 * trimmed, and exported in webm format. The createVideo function is used to display it.
 * The user has one minute to guess the drawing, the videos finish with between 30 and 40 seconds.
 * The code for the title colors was based on this thread answer by Rabbid76: https://stackoverflow.com/questions/52614829/p5-js-change-text-color-in-for-a-single-word-in-a-sentence
 * The code for the confetti was addapted from slow_izzm's code: https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
 * 
 */

"use strict";

//variable for states
let state = `start`;

// variables for classes
let home;
let card;
let confetti = [];

// setting an array of colours for the confetti
let confettiColor = [];

// used to store the category number
let chosenCategory;
// variable to store the card selected
let cardNumber;
// for the card numbers
let cards = [`pineapple`,`lock`,`keyboard`,`italy`,`platypus`,`the rock`,`up`,`ocean's eleven`,`midnight in paris`];

// variable to determine if a category has been selected
let cardDrawn = false;

// boolean to determine if the user's answer is right
let rightCard = false;

// array for the videos
let video = [];

// countdown timer variables
let cardTimer = 63;
let startTimer = 3;
// variable to add 3 seconds at the end of the card timer
let mappedTimer;

//variables for the sounds
let failSound;
let cheer;

// constant for the speech recognition
const speechRecognizer = new p5.SpeechRec();


/**
 * Loads a few sounds
*/
function preload() {
    cheer = loadSound(`assets/sounds/yay.wav`);
    failSound = loadSound(`assets/sounds/wrong.wav`);
}


/**
 * Initiates speech recognition, sets font parameters
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // loading videos
    for (let i = 0; i < cards.length; i++) {
        let loadedVideo = createVideo(`assets/videos/card_${i}.webm`);
            video.push(loadedVideo);
            loadedVideo.hide();
        }
    
        // starts speech recording
    speechRecognizer.continuous = true;
    speechRecognizer.start();
        
    // font to be used in the whole game
    textFont("Comic Sans MS"); // I know, yes, comic sans :)
    // all text will be aligned to center
    textAlign(CENTER,CENTER);
    
    // declaring the classes to used in draw
    home = new Home();
    card = new Card();
    
    //sets the confetti to be used if win
    confettiColor = [color(0,174,239), color(236,0,140), color(114,200,182)];
    for (let i = 0; i < 100; i++) {
        confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
    }
}
    
/**
 * Displays the states
*/    
function draw() {
    background(255);
    
    // draw the states
    if (state === `start`) {
        // displays the word "speech" and the instructions
        fill(0);
        textSize(80);
        text(`press SPACE to begin`,width/2,height/2);
    }
    else if (state === `home`) {
        home.displayTitle();
        home.displayCards();
        home.categoryWheel();
        home.handleSpeechInput();
    }
    else if (state === `card`) {
        card.displayInput();
        card.displayVideo();
        card.displayTimer();
        card.handleSpeechInput();
    }    

    // confetti drops if win, yay!
    if (rightCard === true && state === `card`) {
        for (let i = 0; i < confetti.length; i++) {
            confetti[i].displayConfetti();
            if (confetti[i] >= height*1.5) {
                confetti[i].splice;
            }
        }
    }
}

function keyPressed() {
    if (keyCode === 32 && state === `start`) {
        state = `home`;

            // plays the video again after a user interaction
            video[0,1,2,3,4,5,6,7,8].play();
    }
}