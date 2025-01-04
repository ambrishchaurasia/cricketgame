cross=true;
u_s=true;

blinkApplied=false;
var score=0;
$(document).keydown(function(e) {
if(e.keyCode==32)
{
    $(".batsman").addClass("animatevk");
    setTimeout(function(){
        $(".batsman").removeClass("animatevk");
    },700);
    var audio = new Audio("jump.wav");
    audio.play();

}

if(e.keyCode==39 && u_s)
    {
        bat=$(".batsman")[0];
        bat.style.transform = `scaleX(1)`
        bx=parseInt(window.getComputedStyle(bat,null).getPropertyValue('left'));
        bat.style.left=bx+100+"px";

    }

    
if(e.keyCode==37 && u_s)
    {
        bat=$(".batsman")[0];
       bat.style.transform = `scaleX(-1)`
        bx=parseInt(window.getComputedStyle(bat,null).getPropertyValue('left'));
        bat.style.left=bx-100+"px";

        
    }
});


setInterval(() => {
     bat= $(".batsman")[0];
     gameover=$(".gameover")[0];
     obs=$(".obstacle")[0];
     bx=parseInt(window.getComputedStyle(bat,null).getPropertyValue('left'));
     by=parseInt(window.getComputedStyle(bat,null).getPropertyValue('bottom'));
     ox=parseInt(window.getComputedStyle(obs,null).getPropertyValue('left'));
     oy=parseInt(window.getComputedStyle(obs,null).getPropertyValue('bottom'));
     offsetX=Math.abs(bx-ox);
     offsetY=Math.abs(by-oy);

     console.log(offsetX);
     console.log(offsetY);

     if(offsetX<60 && offsetY<83){
        gameover.style.visibility='visible';
        obs.classList.remove("obstacleani");
        obs.style.left=ox+"px";
        u_s=false;
       
        if (!blinkApplied) {
            var audio = new Audio("dead.mp3");
            audio.play();
        $("body").addClass("go");
        blinkApplied=true;
        setTimeout(function(){
          $("body").removeClass("go");
        },200);
        $(".gameover").after(`<p> Your Score: ${score}</p>`);
        $("p").addClass("finalscore");
    }

     }

     else if(offsetX<140 && cross && u_s){
      score+=1;
      updatescore(score);
      cross=false;
      setTimeout(() => {
        cross=true;
      }, 1000);
      
     if(parseFloat(window.getComputedStyle(obs,null).getPropertyValue('animation-duration')) >2.3)
     {
      setTimeout(() => {
        ad=parseFloat(window.getComputedStyle(obs,null).getPropertyValue('animation-duration'));
        nd=ad-0.1;
        obs.style.animationDuration=nd+"s";
      }, 260);
     
     }}
}, 10);



function updatescore(score){
    $("#scorecount").html("Your Score: " + score);

}