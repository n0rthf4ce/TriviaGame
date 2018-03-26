var quizQuestions = [
    {
        question: "How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
        a: "He transfigures into a shark",
        b: "He kisses a mermaid",
        c: "He eats gillyweed",
        d: "He performs a bubble-head charm",
        answer: "c"
    },
    {
        question: "What is the name of Fred and George's joke shop?",
        a: "Weasley Joke Emporium",
        b: "Weasley's Wizard Wheezes",
        c: "Fred & George's Wonder Emporium",
        d: "Zonko's Joke Shop",
        answer: "b"
    },
    {
        question: "Which of these is NOT one of the Unforgivable Curses?",
        a: "Cruciatus Curse",
        b: "Imperius Curse",
        c: "Sectumsempra",
        d: "Avada Kedavra",
        answer: "c"
    },
    {
        question: "Who guards the entrance to the Gryffindor common room?",
        a: "The Grey Lady",
        b: "The Bloody Baron",
        c: "Nearly Headless Nick",
        d: "The Fat Lady",
        answer: "d"
    },
    {
        question: "What does Ron see in the Mirror of Erised?",
        a: "Himself kissing Hermione",
        b: "Himself with lots of gold",
        c: "Himself fighting off dementors",
        d: "Himself holding the Quidditch Cup",
        answer: "d"
    },
    {
        question: "Who is a member of the Order of the Phoenix?",
        a: "Severus Snape",
        b: "Harry Potter",
        c: "Cornelius Fudge",
        d: "Rufus Scrimgeor",
        answer: "a"
    },
    {
        question: "What does O.W.L. stand for?",
        a: "Ordinary Wizarding Level",
        b: "Official Wizarding Level",
        c: "Outstanding Wizard Learning",
        d: "Outstanding Wizarding Level",
        answer: "a"
    },
    {
        question: "What does the spell obliviate do?",
        a: "Destroys objects",
        b: "Makes objects invisible",
        c: "Removes parts of someone's memory",
        d: "Teleports objects to another place",
        answer: "c"
    },
    {
        question: "What does Dumbledore tell Harry he sees in the Mirror of Erised?",
        a: "Himself holding a pair of socks",
        b: "Himself as a phoenix",
        c: "Himself falling from the sky to his death",
        d: "Himself moaning in deep agony in a dark cave",
        answer: "a"
    },
    {
        question: "Where does Hermione brew her first batch of Polyjuice Potion?",
        a: "Moaning Myrtle's bathroom",
        b: "The Hogwarts kitchen",
        c: "The Room of Requirement",
        d: "The Gryffindor Common Room",
        answer: "a"
    },
], ticking = new Audio("assets/sounds/ticking.wav"), timeup = new Audio("assets/sounds/timeup.wav"), correct = new Audio("assets/sounds/correct.mp3"), incorrect = new Audio("assets/sounds/wrong.mp3"), index = 0, time = 14, quizFinished = false, resultTime, intervalID, right = 0, wrong = 0, timeout = 0;

function createButton(dataAnswer, text) {
    var newButton = $("<button>");
    newButton.text(text);
    newButton.attr("data-answer", dataAnswer);
    newButton.addClass("answer btn btn-light btn-lg btn-block");
    $("#answers").append(newButton);
}

function setupQuestion(question) {
    $("#question").html("<p>" + question.question + "</p>")
    createButton("a", question.a);
    createButton("b", question.b);
    createButton("c", question.c);
    createButton("d", question.d);
}

function clearScreen() {
    $("#question").empty();
    $("#answers").empty();
}

function reset() {
    $("#countdown").removeClass();
    $("#countdown").addClass("text-success");
    time = 14;
    $("#countdown").text("15");
    index++;
    if (index == quizQuestions.length) {
        quizFinished = true;
    }
    clearTimeout(resultTime);
    if (!quizFinished) {
        intervalID = setInterval(countdown, 1000);
        $("#question").show();
        $("#whole-countdown").show();
        $("#answers").show();
        $("#results").hide();
        clearScreen();
        setupQuestion(quizQuestions[index]);
    } else {
        $("#results").html("<p>Questions answered correctly: " + right + "</p>")
            .append("<p>Questions answered incorrectly: " + wrong + "</p>")
            .append("<p>Questions where you ran out of time: " + timeout + "</p>");
        $("#restart").show();
    }
}
function showResults() {
    $("#results").show();
    $("#question").hide();
    $("#whole-countdown").hide();
    $("#answers").hide();
}
function countdown() {
    $("#countdown").text(time);
    switch (time) {
        case 5: $("#countdown").removeClass();
            $("#countdown").addClass("text-warning");
            break;
        case 3: $("#countdown").removeClass();
            $("#countdown").addClass("text-danger");
            ticking.play();
            break;
        case 0: clearInterval(intervalID);
            $("#results").text("You ran out of time! Try to think faster...");
            timeup.play();
            showResults();
            timeout++;
            resultTime = setTimeout(reset, 3500);
            break;
    }
    time--;
}

$("#restart").hide();
$("#whole-countdown").hide();
$("#start").on("click", "button", function () {
    $("#whole-countdown").show();
    intervalID = setInterval(countdown, 1000);
    setupQuestion(quizQuestions[index]);
    $(this).hide();
})
$("#answers").on("click", ".answer", function () {
    const userAnswer = $(this).attr("data-answer");
    var answerString;
    clearInterval(intervalID);
    if (userAnswer == quizQuestions[index].answer) {
        correct.play();
        $("#results").text("That's correct!");
        right++;
        showResults();
        resultTime = setTimeout(reset, 2000);
    } else {
        incorrect.play();
        switch (quizQuestions[index].answer) {
            case "a": answerString = quizQuestions[index].a; break;
            case "b": answerString = quizQuestions[index].b; break;
            case "c": answerString = quizQuestions[index].c; break;
            case "d": answerString = quizQuestions[index].d; break;
        }
        $("#results").html("That's not right, the right answer was &quot;" + answerString + "&quot;");
        wrong++;
        showResults();
        resultTime = setTimeout(reset, 4000);
    }
});
$("#restart").on("click", "button", function () {
    index = -1;
    quizFinished = false;
    right = 0;
    wrong = 0;
    timeout = 0;
    reset();
    $(this).hide();
})


