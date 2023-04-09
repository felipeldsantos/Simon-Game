var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("body").keydown(function (e) { 
    if(level == 0){
        nextSequence();
    }
});

function nextSequence(){
    level++;
    var headText = "level " + level;
    $("h1").text(headText);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor;

    switch(randomNumber){
        case 0:
            randomChosenColor = "red";
            break;
        case 1:
            randomChosenColor = "blue";
            break;
        case 2:
            randomChosenColor = "green";
            break;
        case 3:
            randomChosenColor = "yellow";
            break;
    }
    playSound(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    gamePattern.push(randomChosenColor);
    
    console.log(gamePattern);
}

$(".col").click(function (e) { 
   
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    
    var index = userClickedPattern.length - 1;
    checkAnswer(index);

    playSound(userChosenColor);

    

    if(gamePattern.length == userClickedPattern.length && level != 0){
        userClickedPattern = [];
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
});

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(curretnColor){
    $("#" + curretnColor).addClass("pressed");
    setTimeout(function(){
        $("#" + curretnColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] != gamePattern[currentLevel]){
        $("h1").text("Game Over, Press any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200); 
        playSound("wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}