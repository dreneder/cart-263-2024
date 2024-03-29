class Card {

    displayInput() {
        // display the title at the colour red or green according to the answer
        if (rightCard === true) {
            fill(0,255,0);
            }
        else {
            fill(255,0,0);
            }
        if (rightCard === false && cardTimer > 3) { // display attempt or right title
            text(speechRecognizer.resultString,width/2,150);
        }
        else { // display card title answer
            text(cards[cardNumber],width/2,150);
        }
    }

    displayVideo(){
         //displays the video
         imageMode(CENTER);
         image(video[cardNumber],width/2,height/2,width/1.5,height/2);
         // pauses the video when it reaches the end
         if (video[cardNumber].time() >= video[cardNumber].duration()) {
             video[cardNumber].pause();
         }
    }

    displayTimer() {
        // maps timer according to the answer
        if (rightCard === false) {
            mappedTimer = map(cardTimer,63,3,60,0,true); // maps to 60 seconds
            if (cardTimer === 3) {
                failSound.play(); // play a horn if it wasn't answered correctly
            }
        }
        else if (rightCard === true && cardTimer >= 3) { // stops the mapped timer and goes to three seconds
            cardTimer = 2.9;
            cheer.play(); // plays a cheer sound when the user is correct
        }

        //display the timer
        fill(0);
        textSize(50);
        text(round(mappedTimer),width/2,height-150);

         //start the timer once a card is drawn
         if (frameCount % 60 == 0) {
            cardTimer--;
            }
        // returns to home if timer reaches 0
        if (cardTimer < 0) {
            state = `home`;
            // resets a few parameters used in home
            startTimer = 3;
            cardDrawn = false;
            speechRecognizer.resultString = ` `; // clears the string
        }
    }

    handleSpeechInput() { // method for audio capture, same as in home
        if (speechRecognizer.resultValue) {
            let lowerCaseResult = speechRecognizer.resultString.toLowerCase(); // makes all the input lower case
            
            // if statement recognize the category chosen
            if (lowerCaseResult.match(cards[cardNumber])) {
                speechRecognizer.onResult;
                rightCard = true;
            }
            else if (lowerCaseResult.match("go back") ||
            lowerCaseResult.match("return")) {
            speechRecognizer.onResult;
            // resets a few parameters used in home
            startTimer = 3;
            cardDrawn = false;
            speechRecognizer.resultString = ` `; // clears the string
            state = `home`;// returns to home
            } 
            else {
                speechRecognizer.onResult;
            }
        }    
    }
}