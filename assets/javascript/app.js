var trivia = {
    question: {
        ask: [],
        option1: [], //This will always be the correct answer.
        option2: [],
        option3: [],
        option4: [],
        result: [],
        qSKU: [],
        questionTimer: setInterval(1000),
        timer: 30
    },
    win: 0,
    loss: 0,
    oot: 0,
    currentQ: 0,

    // Allow the trivia questions to be added easily later on.
    qLoader(ask, option1, option2, option3, option4, result, qSKU) {
        trivia.question.ask.push(ask);
        trivia.question.option1.push(option1);
        trivia.question.option3.push(option3);
        trivia.question.option2.push(option2);
        trivia.question.option4.push(option4);
        trivia.question.result.push(result);
        trivia.question.qSKU.push(qSKU);
    },

    // Intro to the game with start button.
    start() {
        trivia.replay();
        $("#q").html("How well do you know John Wick?");
        $("#incorrect").html("You have 30 seconds per question,");
        $("#unanswered").html("Good luck!");
        $("#continue").html("Continue");
        $("#continue").css("display", "none");
        $("#start").css("display", "initial");
        $("#start").attr({
            "onclick": "trivia.qCurrent()"
        });

    },

    //Current question logic.
    qCurrent() {
        clearInterval(trivia.questionTimer);
        trivia.timer = 30;

        //Start the timer for the current question.
        function startTimer() {
            clearInterval(trivia.questionTimer);
            trivia.questionTimer = setInterval(tickDown, 1000 * 1);
        }

        // Display the clock for the user.
        function tickDown() {

            //  Decrease number by one.
            trivia.timer--;

            //  Show the number in the #show-number tag.
            $("#time-left").html("Remaining Time: " + trivia.timer + " Seconds");


            //  Once number hits zero...
            if (trivia.timer == 0) {
                trivia.qResult();
            }
        }

        // Call the timer to start.
        startTimer();

        $("#incorrect").html("");
        $("#unanswered").html("");
        $("#continue").css("display", "none");
        $("#start").css("display", "none");
        $("#answer").html("");
        $("#result").html("");
        $("#pic").html("");

        $("#time-left").html("Remaining Time: 30 Seconds");
        $("#q").html(trivia.question.ask[trivia.currentQ]);

        // Randomizer the answers as they are stored in a way where the 1st answer is always correct.
        var includes = [];
        var randomizeOptions = [];
        for (let i = 1; i <= 4; i++) {
            var randomNum = -1;
            do {
                randomNum = (Math.floor(Math.random() * 4) + 1);
            } while (includes.includes(randomNum) == true);
                        includes.push(randomNum);
            if (randomNum == 1) {
                randomizeOptions.push(trivia.question.option1[trivia.currentQ]);
            }
            if (randomNum == 2) {
                randomizeOptions.push(trivia.question.option2[trivia.currentQ]);
            }
            if (randomNum == 3) {
                randomizeOptions.push(trivia.question.option3[trivia.currentQ]);
            }
            if (randomNum == 4) {
                randomizeOptions.push(trivia.question.option4[trivia.currentQ]);
            }
            $("#a" + i).html(randomizeOptions[i-1]);
            $("#a" + i).attr("data-option", randomizeOptions[i-1]);
        }


        $(".option").attr("onclick", "trivia.qResult()");

        trivia.currentQ++;
    },

    // Display how the user did for the current question.
    qResult() {

        //Clear the timer
        clearInterval(trivia.questionTimer);
        $("#time-left").html("");
        $("#q").html("");
        $("#a1").html("");
        $("#a2").html("");
        $("#a3").html("");
        $("#a4").html("");
        $(".option").attr("onclick", null);
        
        // If the Timer ran out let them know what the correct answer was.
        if (trivia.timer == 0) {
            $("#result").html("You ran out of time!");

            //NOTE: remove line before after turning in
            $("#answer").html("The correct answer was: " + trivia.question.option1[trivia.currentQ - 1]);

            trivia.oot++;
            console.log("oot", trivia.oot);

        // If the user guessed correct let them know.
        } else if (event.target.getAttribute("data-option") == trivia.question.option1[trivia.currentQ-1]) {

            $("#result").html("You guessed right!");
            trivia.win++;
            console.log("wins", trivia.win);

        // If the user guessed wrong let them know the correct answer.
        } else {
            $("#result").html("You guessed wrong!");

            //NOTE: remove line before after turning in
            $("#answer").html("The correct answer was: " + trivia.question.option1[trivia.currentQ - 1]);

            trivia.loss++;
            console.log("loss", trivia.loss);
        }

        /* $("#answer").html("The correct answer was: " + trivia.question.option1[trivia.currentQ - 1]); */
        //NOTE: uncomment this line above after turning in

        $("#pic").html("<img id=resultPic src=./assets/images/" + trivia.question.result[trivia.currentQ - 1] + "></img>");


        //NOTE:remove timer below until next note
        // Allow 7 seconds for the user to see the result screen.
        trivia.timer = 7;

        // Start the result screen timer
        function startTimer() {
            clearInterval(trivia.questionTimer);
            trivia.questionTimer = setInterval(tickDown, 1000 * 1);
        }

        //Allows the timer to function. When it's done go to the next question or -
        //  display final Results when all Q's have been asked.
        function tickDown() {
            trivia.timer--;
            if (trivia.timer == 0) {
                if (trivia.currentQ != trivia.question.ask.length) {
                    trivia.qCurrent();
                } else {
                    trivia.finalResult();
                }
            }
        }

        // Call the function to start the timer.
        startTimer();
        //NOTE:remove timer above until previous note after turn in


        //NOTE: uncomment below until next note

       /*  $("#continue").css("display", "initial");
        if (trivia.currentQ != trivia.question.ask.length) {
            $("#continue").attr("onclick", "trivia.qCurrent()");
        } else {
            $("#continue").attr("onclick", "trivia.finalResult()");
        } */

        //NOTE: uncomment above until previous note after turn in

    },

    // Display the final results.
    finalResult() {
        //NOTE:remove the line of code below after turn in.
        $("#continue").css("display", "initial");

        clearInterval(trivia.questionTimer);
        $("#answer").html("");
        $("#pic").html("");
        $("#result").html("Here is how you did!");
        $("#correct").html("Correct Answers: " + trivia.win);
        $("#incorrect").html("Incorrect Answers: " + trivia.loss);
        $("#unanswered").html("Unanswered: " + trivia.oot);
        $("#continue").html("Restart");
        $("#continue").attr("onclick", "trivia.start()");
    },

    // When a replay is requested reset the data and clear the screen.
    replay() {
        $("#result").html("");
        $("#correct").html("");
        $("#incorrect").html("");
        $("#unanswered").html("");
        trivia.win = 0;
            trivia.loss = 0;
            trivia.oot = 0;
            trivia.currentQ = 0;
    }


}

// Load the questions into the trivia game.
trivia.qLoader("John Wick seeks vengeance after which happens?", "His dog is killed", "His wife is taken", "Someone rips his suit jacket", "Someone destroys his favorite firearm", "jwDog.gif", 0);
trivia.qLoader("Which of the following is an alias of John Wick?", "Baba Yaga", "Killer 7", "Dark Phantom", "Shooter in the Dark", "baba.gif", 1);
trivia.qLoader("Viggo Tarasov tells the story of John Wick killing three men with 'what' item?", "Pencil", "Carrot", "Wiffle Ball Bat", "Paper Clip", "pencil.gif", 2);
trivia.qLoader("Who is the owner of the Continental?", "Winston", "Harry", "Marcus", "Charon", "winston.gif", 3);
trivia.qLoader("What breed of dog does John Wick free at the end of the movie?", "Pit Bull", "German Shepherd", "Bulldog", "Rottweiler", "pitBull.gif", 4);

// Start the game.
trivia.start();









//pseudocode // methods
// game start start -> start button only
// screen will always display timer and all question data
// user selects answer
// display result
// click anywhere to continue
// iterate until all questions asked
// display final result data

//object oriented i will need a object named trivia
//it will need properties 
//ask
//option1-4 *1 will always be the answer
//result (it will be the picture but I may add result flavor for win/loss/out of time in)
// (rPic, rWin, rLoss, rOOT)
//methods base from pseudocode

// I will also need these vars
// wins
// loss
// OOT