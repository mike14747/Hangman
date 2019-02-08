$(document).ready(function () {

    // initialize an array with all the letters in it to display on the page
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // display the Press any Key to Start a Game message
    document.getElementById("commentary").style.color = "blue";
    document.getElementById("commentary").innerHTML = "Press any Key to Start a Game!";

    var letterH = document.getElementById("letterList");
    for (var i = 0; i < letters.length; i++) {
        if (i == 13) {
            var newLetterSpan = document.createElement("br");
            letterH.appendChild(newLetterSpan);
        }
        var newLetterSpan = document.createElement("span");
        newLetterSpan.setAttribute("id", letters[i]);
        newLetterSpan.textContent = letters[i].toUpperCase();
        letterH.appendChild(newLetterSpan);
    }

    // start all the housekeeping items for the game to start
    // set a constant for how many missed guesses equates to a loss
    const missLimit = 6;
    // start Wins and Times Hung variables at 0 and display them as such
    var wins = 0;
    var hung = 0;
    // display the number of wins and time hung
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("hung").innerHTML = hung;

    var variousWords = {
        "fruitVeg": [
            "apple",
            "apricot",
            "asparagus",
            "avocado",
            "banana",
            "broccoli",
            "cabbage",
            "cantaloupe",
            "carrot",
            "celery",
            "coconut",
            "cucumber",
            "eggplant",
            "fennel",
            "guava",
            "grape",
            "jicama",
            "kohlrabi",
            "lettuce",
            "mango",
            "onion",
            "orange",
            "papaya",
            "parsnip",
            "peach",
            "pineapple",
            "potato",
            "pumpkin",
            "radish",
            "spinach",
            "tomato",
            "turnip",
            "zucchini"
        ],

        generateWord: function () {
            return this.fruitVeg[Math.floor(Math.random() * this.fruitVeg.length)];
        }
    };

    function wonGame(word) {
        document.getElementById("commentary").style.color = "green";
        document.getElementById("commentary").innerHTML = "You've WON the game! (" + word + ")";
        document.getElementById("wonSound").play();
        wins++;
        document.getElementById("wins").innerHTML = wins;
        startGame();
    }

    function lostGame(word) {
        document.getElementById("commentary").style.color = "red";
        document.getElementById("commentary").innerHTML = "You've been HUNG! (" + word + ")";
        hung++;
        document.getElementById("hung").innerHTML = hung;
        startGame();
    }

    document.onkeyup = function () {
        document.getElementById("commentary").style.color = "green";
        document.getElementById("commentary").innerHTML = "Welcome to 'Fruit and Vegetable' Hangman!";
        startGame();
    }

    // define startGame function
    function startGame() {

        // re-initialize an array with all the letters in it for the game logic
        var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        // pick a random word from the words array
        var randomWord = variousWords.generateWord();
        var randomWordLength = randomWord.length;

        // show the random word while still in the testing stage
        // document.getElementById("rWord").innerHTML = randomWord;

        // show the empty gallows pic
        document.getElementById("hangmanImage").src = "images/hangman_00.png";

        // clear the commentary text
        // document.getElementById("commentary").innerHTML = "";

        // make all the letters show as active
        letters.forEach(letterFunction);
        function letterFunction(value) {
            document.getElementById(value).style.color = "#212529";
        }

        // start the counter for misses
        var misses = 0;

        // start the Misses Remaining counter displayed on the page at missLimit
        document.getElementById("missesRemaining").innerHTML = missLimit;

        // initialize, format the image arrangement variable, then display it in the browser
        var formattedImageCode = "";
        for (var i = 0; i < randomWord.length; i++) {
            formattedImageCode += '<img class="img-fluid mx-2 my-5" src="images/blank.png">';
        }
        document.getElementById("theWord").innerHTML = formattedImageCode;

        // initialize the correctGuessLetters array
        var correctGuessLetters = [];

        // run this function when a key is pressed
        document.onkeyup = function (event) {

            // make sure the key pressed was a letter
            var lowerCase = event.key.toLowerCase();
            if ((lowerCase.length === 1) && (lowerCase.charCodeAt(0) >= 97 && lowerCase.charCodeAt(0) <= 122)) {
                var keyPressed = lowerCase;
            }
            if (keyPressed) {
                // since a letter was pressed, proceed

                // start the letterCounter at 0
                var letterCounter = 0;

                // figure out which letter to remove from the letters array
                var indexToRemove = letters.indexOf(keyPressed);

                if (indexToRemove > -1) {
                    // since the input letter was found in the array of available letters, decide if it matches the randomWord, then remove it from the letters array
                    if (randomWord.match(keyPressed)) {
                        // add the letter to the correctGuessLetters array
                        correctGuessLetters.push(keyPressed);

                        // loop through randomWord letters and see if any of them match anything in correctGuessLetters
                        var formattedImageCode = "";

                        // reset the letterCounter to 0 before reconfiguring it for the current corrently guessed letter
                        var letterCounter = 0;

                        // loop through the letters of the randomWord
                        for (var i = 0; i < randomWord.length; i++) {
                            // see if the current letter is part of randomWord
                            if (correctGuessLetters.indexOf(randomWord[i]) > -1) {
                                // the letter just guessed is part of randomWord
                                formattedImageCode += '<img class="img-fluid mx-2 my-5" src="images/' + randomWord[i] + '.png">';
                                letterCounter++;
                            } else {
                                // the letter just guessed is NOT part of randomWord
                                formattedImageCode += '<img class="img-fluid mx-2 my-5" src="images/blank.png">';
                            }
                        }
                        // display the new formattedImageCode code
                        document.getElementById("theWord").innerHTML = formattedImageCode;

                        // let the player know their letter selection has already been used
                        document.getElementById("commentary").style.color = "blue";
                        document.getElementById("commentary").innerHTML = "'" + keyPressed.toUpperCase() + "' is a correct guess!";
                    } else {
                        // since the letter was not part of randomWord, increment the misses counter, update the 'Misses Remaining' counter on the page and update the hangman image
                        document.getElementById("commentary").style.color = "red";
                        document.getElementById("commentary").innerHTML = "'" + keyPressed.toUpperCase() + "' is NOT correct!";

                        // increment the misses counter and update the hanman image
                        misses++;
                        document.getElementById("hangmanImage").src = "images/hangman_0" + misses + ".png";

                        // update the 'Misses Remaining' counter on the page
                        document.getElementById("missesRemaining").innerHTML = missLimit - misses;
                    }

                    // style the select letter to appear as inactive in the browser
                    document.getElementById(keyPressed).style.color = "#dddddd";

                    // make the selected letter inactive by removing it from the letters array
                    letters.splice(indexToRemove, 1);

                } else {
                    document.getElementById("commentary").style.color = "black";
                    document.getElementById("commentary").innerHTML = "'" + keyPressed.toUpperCase() + "' has already been used.";
                }
            } else {
                document.getElementById("commentary").style.color = "red";
                document.getElementById("commentary").innerHTML = "Only the letter keys are valid inputs when playing Hangman";
            }
            
            if (misses == missLimit) {
                // the player has been hung, so run the lostGame function
                lostGame(randomWord);
            } else if (letterCounter == randomWordLength) {
                // the player has won, so run the wonGame function
                wonGame(randomWord);
            }
        }
    }
});