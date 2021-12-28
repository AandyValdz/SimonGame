var buttonColors=["red","yellow","blue","green"];
var gamePattern=[];
var level=0;
$("body").on("keydown", function () {
  $("h1").html("Level "+level);
  nextSequence();
})
function gameStart() {
  var userClickedPattern=[];
  var lvl=gamePattern.length();
  var los=0;
  for (var i = 0; i<lvl; i++) {
    $(".btn").on("click",function () {
      var userChosenColor=this.id;
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      if(JSON.stringify(userClickedPattern)==JSON.stringify(gamePattern)){
        playSound(userChosenColor);
      }
      else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        los=1;
        gamePattern=[];
        userClickedPattern=[];
        break;
      }
    }
  }
  if (los==1) {
    level=0;
    $("h1").html("You loose");
  }
  else {
    nextSequence();
  }

});

function nextSequence() {
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour= buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  $("h1").html("Level "+level);
  level++;
  gameStart();
}
function animatePress(currentColor) {
  var col="#"+currentColor;
  $(col).addClass("pressed");
  setTimeout(function(){ $(col).removeClass("pressed"); }, 100);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
