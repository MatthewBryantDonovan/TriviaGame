//favicon.ico
var trivia = {
    question: {
        ask: [],
        option1: [], //will always be the correct answer
        option2: [],
        option3: [],
        option4: [],
        result: [],
        qSKU: [],
        questionTimer: setInterval(1000),
        timer: 30,
    },
    win: 0,
    loss: 0,
    oot: 0,
    currentQ: 0,

    qLoader(ask, option1, option2, option3, option4, result, qSKU) {
        trivia.question.ask.push(ask);
        trivia.question.option1.push(option1);
        trivia.question.option3.push(option3);
        trivia.question.option2.push(option2);
        trivia.question.option4.push(option4);
        trivia.question.result.push(result);
        trivia.question.qSKU.push(qSKU);
    },

    start() {
        trivia.replay();
        $("#continue").css("display", "none");
        $("#start").css("display", "initial");
        $("#start").attr({
            "onclick": "trivia.qCurrent()"
        });
        console.log("start");

    },

    qCurrent() {

        trivia.timer = 30;

        function startTimer() {
            clearInterval(trivia.questionTimer);
            trivia.questionTimer = setInterval(tickDown, 1000 * 1);
          }


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

          startTimer();

        $("#continue").css("display", "none");
        $("#start").css("display", "none");
        $("#answer").html("");
        $("#result").html("");
        $("#pic").html("");

        $("#time-left").html("Remaining Time: 30 Seconds");
        $("#q").html(trivia.question.ask[trivia.currentQ]);
        $("#a1").html(trivia.question.option1[trivia.currentQ]);
        $("#a2").html(trivia.question.option2[trivia.currentQ]);
        $("#a3").html(trivia.question.option3[trivia.currentQ]);
        $("#a4").html(trivia.question.option4[trivia.currentQ]);
        $(".option").attr("onclick", "trivia.qResult()");

        trivia.currentQ++;
    },

    qResult() {
        clearInterval(trivia.questionTimer);
        $("#time-left").html("");
        $("#q").html("");
        $("#a1").html("");
        $("#a2").html("");
        $("#a3").html("");
        $("#a4").html("");
        $(".option").prop("onclick", null);
        $("#continue").css("display", "initial");

        if (trivia.timer == 0) {
            $("#result").html("You ran out of time!");
            trivia.oot++;
            console.log("oot", trivia.oot);

        } else if (event.target.id == "a1") {

            $("#result").html("You guessed right!");
            trivia.win++;
            console.log("wins", trivia.win);

        } else {
            $("#result").html("You guessed wrong!");
            trivia.loss++;
            console.log("loss", trivia.loss);
        }

        $("#answer").html("The correct answer was: " + trivia.question.option1[trivia.currentQ - 1]);
        $("#pic").html("<img src=./assets/images/" + trivia.question.result[trivia.currentQ - 1] + "></img>");
        if (trivia.currentQ != trivia.question.ask.length) {
            $("#continue").attr("onclick", "trivia.qCurrent()");
        } else {
            $("#continue").attr("onclick", "trivia.finalResult()");
        }

    },

    finalResult() {
        $("#answer").html("");
        $("#pic").html("");
        $("#result").html("Here is how you did!");
        $("#correct").html("Correct Answers: " + trivia.win);
        $("#incorrect").html("Incorrect Answers: " + trivia.loss);
        $("#unanswered").html("Unanswered: " + trivia.oot);
        $("#continue").html("Restart");
        $("#continue").attr("onclick", "trivia.start()");
    },

    replay() {
        $("#result").html("");
        $("#correct").html("");
        $("#incorrect").html("");
        $("#unanswered").html("");
        trivia.win = 0,
            trivia.loss = 0,
            trivia.oot = 0,
            trivia.currentQ = 0,

            console.log("got it");
    }


}

trivia.qLoader("the answer is red", "red", "blue", "green", "yellow", "alucard.png", 0);
trivia.qLoader("the answer is one", "one", "two", "three", "four", "alucard.png", 1);
trivia.qLoader("the answer is potato", "potato", "carrot", "squash", "pumpkin", "alucard.png", 2);
trivia.qLoader("the answer is grape", "grape", "cherry", "peach", "banana", "alucard.png", 3);
trivia.qLoader("the answer is earth", "earth", "wind", "fire", "water", "alucard.png", 4);


console.log(trivia);

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



/* 
**[Click Here to Watch the demo](https://youtu.be/xhmmiRmxQ8Q)**.

* You'll create a trivia game that shows only one question until the player answers it or their time runs out.

* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

* The scenario is similar for wrong answers and time-outs.

  * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
 */