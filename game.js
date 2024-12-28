

var buttonColors = ["red","blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];



var started = false;

var level = 0;



  $(document).keydown(function(){
    if (!started) {

     $("#level-title").text("Level " + level); 
     nextSequence();
     started = true;
    }
  });
   
  
  

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
  
    animatePress(userChosenColour);

    
    var lastIndex = userClickedPattern.length - 1;
    
   
   checkAnswer(lastIndex);
    
    
  });
 
  
  

function nextSequence() {

    level++;

    $("#level-title").text("Level " + level); 

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    
    

    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    
}



function checkAnswer(currentLevel){

if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
  console.log("success");
  if (userClickedPattern.length === gamePattern.length) {
    //console.log("Sequence complete");

    setTimeout(function() {
      nextSequence();
    }, 1000);

    userClickedPattern = [];
  }
} else {
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key to Restart")
 // console.log("wrong");

  startOver();
}


}

function playSound(name) {
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


  function animatePress(currentColor) {

   
    $("#" + currentColor).addClass("pressed");
  
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
  function startOver () {
    level = 0;
    userClickedPattern =[];
    gamePattern = [];
    started = false;
  }



