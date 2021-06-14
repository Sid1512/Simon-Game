var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 50);
}

function restart() {
  level = 0;
  gamePattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    console.log("success");
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").css("background-color", "red");
    setTimeout(function () {
      $("body").css("background-color", "#011F3F");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    restart();
  }
}

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userPattern.length - 1);
});

$("body").keydown(function (event) {
  if (!started) {
    nextSequence();
    started = true;
  }
});
