var zarazara="";
var aajasanam="";
var leftwristX="0";
var leftwristY="0";
var rightwristX="0";
var rightwristY="0";
var scoreleftWrist="0";

function preload()
{
    zarazara=loadSound("zara zara.mp3");
    aajasanam=loadSound("aaja sanam.mp3");
}

function setup()
{
    canvas=createCanvas(600 ,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(VIDEO,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
 if (results.length>0)
 {
     console.log(results);
     scoreleftWrist= results[0].pose.keypoints[9].score;
     console.log("scoreleftWrist="+scoreleftWrist);
     leftwristX=results[0].pose.leftwrist.x;
     leftwristY=results[0].pose.leftwrist.y;
     console.log("leftwristX ="+leftwristX +"leftwristY ="+leftwristY );

     rightwristX=results[0].pose.rightwrist.x;
     rightwristY=results[0].pose.leftwrist.y;
     console.log("rightwristX ="+rightwristX +"rightwristY ="+rightwristY );
 }
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video, 0,0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    
    if (scoreleftWrist>0.2)
    {
    circle(leftwristX,leftwristY,20);
    InNumberleftwristX=Number(leftwristY);
    remove_decimals=floor(InNumberleftwristY);
    leftwristY_divide_1000=remove_decimals/1000;
    volume =leftwristY_divide_1000*2;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
    }

}

function play1()
{
    song.play1();
    song.setVolume();
    song.rate();
}

function play2()
{
    song.play2();
    song.setVolume();
    song.rate();
}

function stop()
{
    zarazara.stop();
    aajasanam.stop();
}