var buttonColors=["red","yellow","blue","green"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

$("body").on("keydown", function () {
  if (!started) {
    $("h1").html("Level "+level);
    nextSequence();
    started=true;
  }
});
$(".btn").on("click", function () {
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// computer generating button to press next
function nextSequence() {
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour= buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").html("Level "+level);
  level++;
}

// player playing
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    var cur=userClickedPattern[currentLevel];
    playSound(cur);
    if (userClickedPattern.length === gamePattern.length){
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    $("body").addClass("game-over");
    $("h1").html("Game over, press any key to continue")
    setTimeout(function () {$("body").removeClass("game-over")},200);
    var wrsond = new Audio("sounds/wrong.mp3");
    wrsond.play();
    reset();
  }
}


// animation and sound
function animatePress(currentColor) {
  var col="#"+currentColor;
  $(col).addClass("pressed");
  setTimeout(function(){ $(col).removeClass("pressed"); }, 100);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// reset after losing
function reset() {
  started=false;
  gamePattern=[];
  userChosenColor=[];
  level=0;
}
