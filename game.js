var userClickedPattern = [];    

var gamePattern = [];

var buttonColours = ["red","green","yellow","blue"];

var isStart = false;

var level = 0;

//start
$(document).keypress(function(){
    if(!isStart){
        $("#level-title").text("Your are on: "+level)
        isStart = true;
        nextSequence();
    }
})


//Game next sequence
function nextSequence (){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4 );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour)
    animatePress(randomChosenColour);

    level++;
    $("#level-title").text("Your are on: "+level)

}

// User chosen colors
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)

});


//Sound function
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation function
function animatePress(currentColour){
    $("#"+currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//Check answer 
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
        } else {
            playSound("wrong");
            $("body").addClass("game-over")
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

//startover
function startOver(){
    level = 0;
    gamePattern = [];
    isStart = false;
}