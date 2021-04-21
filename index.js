var buttonColours=["red","blue","yellow","green"];
var gamePattern=[];
var userClickedPattern=[];
var level = 0;
var started = false;

$(document).keypress(function(){
  if (!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }

});

$(".btn").click(function(){
  if (started) {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startover();
    }
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour)
{
  $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startover() {
  level=0;
  started=false;
  gamePattern=[];
}
