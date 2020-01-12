
// This variable will store user click color button used several times
var userClickedPattern = [];

// This variable is going to store the game actions pattern use several times
var gamePattern = [];


// This array will store the color buttons key array
var buttonColors = ["red", "blue", "green", "yellow"];

// This variable will determine the start of the game so you will need to press the key just once
var started = false;

// variable that will determine the level
var level = 0;

// Start the game when a key is pressed
$(document).keydown(function (){
  if (!started) {
    // change tittle to the current level use level variable
    $("h1").text("Level "+ level);

    // call function sequence which increase level change text and create pattern
    nextSequence();

    // change variable value to true (investigate how it works)
    started = true
  }
})
// console.log(userClickedPattern);
//This section of code  will record the user pressed color
$(".btn").click(function(){
  // get ID of the pressed color
  var userChosenColor = $(this).attr('id');

  // record color in userChosenColor variable
  userClickedPattern.push(userChosenColor);

  //call playsound function when a color is pressed (according to color). Take a parameter that colro selected in userChosenColor
  playSound(userChosenColor);

  // animate color selection change css style
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut().fadeIn();
  var buttonSound = new Audio("sounds/" + randomChosenColor + ".mp3");
  buttonSound.play();


}

function playSound(name){
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
    }, 100);
}
// function will restart game
function startOver() {
  // set value to 0
  level = 0;
  gamePattern = [];
  started = false;
}


function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] == userClickedPattern[currentlevel]){
    console.log("success");
    if (userClickedPattern.length == gamePattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000)
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
setTimeout(function () {
  $("body").removeClass("game-over");
}, 200);

//3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
$("#level-title").text("Game Over, Press Any Key to Restart");

startOver()
  }
}
