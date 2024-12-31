//CREDITS
//cool tone gradiant filter inspo
//https://editor.p5js.org/xinxin/sketches/xSnt8PET1

//helped figure out technical issues
//https://editor.p5js.org/gabedeko/sketches/BYygw2pWM


// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;

// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/4RFQIJVm-/';

// Video
let video;
let flippedVideo;

//store laptop png
let y2kLaptop;

// To store the classification
let label = '';


//stores each gesture with the false boolean for use in recognizing each gesture
let thumbsUpChecker = false;
let peaceChecker = false;
let highFiveChecker = false;
let neutralChecker = false;

//stores specific spotify song links (9 total)

//group 1 (thumbs up group)
//genre = shoegaze
let one = "https://open.spotify.com/embed/track/1MXOWbSCEjoGwivtIMnlBV?utm_source=generator"; //duster constellation
let two = "https://open.spotify.com/embed/track/5C7qOiBXr8KFGx9xRxX6CX?utm_source=generator"; //plastic girl in closet error
let three = "https://open.spotify.com/embed/track/2KylN9C0wNbzLgZNTG9oiU?utm_source=generator"; //my bloody valentine when you sleep

//group 2 (peace sign group)
//genre = rnb
let four = "https://open.spotify.com/embed/track/4h5x3XHLVYFJaItKuO2rhy?utm_source=generator"; //sza ghost in the shell
let five = "https://open.spotify.com/embed/track/7kfOEMJBJwdCYqyJeEnNhr?utm_source=generator"; //the weeknd moth to a flame
let six = "https://open.spotify.com/embed/track/6AQbmUe0Qwf5PZnt4HmTXv?utm_source=generator"; //pink panthers boys a liar pt 2

//group 3 (high five group)
//genre = rap
let seven = "https://open.spotify.com/embed/track/3iEV7gHGFHJiunjisPAXgn?utm_source=generator"; //ice spice actin a smoochie
let eight = "https://open.spotify.com/embed/track/6IyoLWzljeR3ldQo4KWHT6?utm_source=generator&theme=0"; //yeat get out the way
let nine = "https://open.spotify.com/embed/track/2UVbBKQOdFAekPTRsnkzcf?utm_source=generator"; //migos stir fry

//create 3 different arrays storing variables from each gesture/genre group
let songArrayOne = [one, two, three];
let songArrayTwo = [four, five, six];
let songArrayThree = [seven, eight, nine];

//declaring timers so that there can be slight delay when new song is shown (gives time for user to see given song) 
//different timers for each if statement
let timer1= 1;
let timer2= 1;
let timer3= 1;
let timer4 = 1;

//load font
let montserrat;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');

  y2kLaptop = loadImage("https://static.wixstatic.com/media/f45a57_e13812640a9c42688a8357346290230c~mv2.png");
  montserrat = loadFont("Montserrat/Montserrat.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //setting up button that triggers filter
//   let buttonColor = color(255, 163, 183);
//   btn1 = createButton("rainbow");
//   btn1.mouseClicked(toggleRainbow);
//   btn1.style = ("background-color", buttonColor);
//   btn1.position(150, 520);
//   btn1.style = ("font-size", "100px");
//   btn1.size(100,100);
  
  //setting up foundation of filter
//   filter1 = createGraphics(windowWidth,windowHeight);
//   filter1.pixelDensity(1);
  
  // Create the video
  video = createCapture(VIDEO);
  //video.size(windowWidth/2, windowHeight/2);
  video.size(300,300);
  video.hide();
  
  //mirrors video camera
  flippedVideo = ml5.flipImage(video)
  
  // Start classifying
  classifyVideo();
  
}

function draw() {
  

  // let backgroundColor = document.querySelector("#backgroundColor");
  // backgroundColor.setAttribute("style", "background-color:#E3EBEF;");
  //background(backgroundColor);
  background(227, 235, 239);
  
  // Draw the video
  // push();
  // noStroke();
  // //fill(227, 235, 239);
  // //fill(0);
  
  // //draws white frame around video camera
  // rect(windowWidth/5 + 75, windowHeight/5-15,windowWidth/2+30, windowHeight/2+30);
  
  // pop();

  //display laptop png
  
  push();
  image(y2kLaptop,40,200,715,545);
  //image(y2kLaptop,100,30,715,545);
  
  //displays video camera
  //image(flippedVideo, windowWidth/5 + 90, windowHeight/5);
  image(flippedVideo,220,289,360,275);
  pop();
  
  //displays filter over camera
  //image(filter1, windowWidth/5 + 90, windowHeight/5, windowWidth/2, windowHeight/2);
 
  // Draw the label
  
  fill(0);
  //textFont(montserrat, 30);
  textSize(30);
  textAlign(CENTER);
  //text("gesture = "+label, windowWidth/7 + 500,windowHeight/7 - 20);
  text(label, 1080, 285);
 
  //if statements determining what happens when each gesture is protrayed
  
  //neutral gesture
  if (label == 'neutral' && neutralChecker==false) {
    
    console.log('neutral');
   
  //another if statement to determine how fast songs will transition from one to the next
    if (frameCount % 60 && timer1>0) {
      timer1--;
    } else {
      timer2=1;
    }
 //determines boolean state of each gesture checker
 //make the neutral checker true so that program can move onto next if statement
    neutralChecker = true;
    thumbsUpChecker = false;
    peaceChecker = false;
    highFiveChecker = false;
    
 //thumbs up gesture
  } else if (label == 'thumbs up' && thumbsUpChecker==false) {
    
    console.log('thumbs up');
    
  //another if statement to determine how fast songs will transition from one to the next
    if (frameCount % 60 == 0 && timer2>0 ){
      timer2--;
    } else {
      timer3 = 1;
    }
    
  //displays a randomly chosen song from assigned array  
  //group 1 (shoegaze)
  document.getElementById('iframe-holder').src = random(songArrayOne); 
  
 //determines boolean state of each gesture checker
 //make the thumbs up checker true so that program can move onto next if statement
  neutralChecker = false;
  thumbsUpChecker = true;
  peaceChecker = false;
  highFiveChecker = false;
  
 //peace sign gesture
  } else if (label == 'peace sign' && peaceChecker==false ) {
    
    console.log('peace sign');
    
  //another if statement to determine how fast songs will transition from one to the next
    if (frameCount % 60 && timer3>0) {
      timer3--;
    } else {
      timer4 = 1;
    }
  //displays a randomly chosen song from assigned array  
 //group 2 (rnb)   
    document.getElementById('iframe-holder').src = random(songArrayTwo); 
    
 //determines boolean state of each gesture checker
 //make the peace sign checker true so that program can move onto next if statement
    neutralChecker = false;
    thumbsUpChecker = false;
    peaceChecker = true;
    highFiveChecker = false;
    
 //high five gesture
  } else if (label == 'high five' && highFiveChecker==false) {
    
    console.log('high five');
    
  //another if statement to determine how fast songs will transition from one to the next
    if (frameCount % 60 && timer4>0) {
      timer4--;
    } else {
      timer1=1;
    }
    
 //displays a randomly chosen song from assigned array  
 //group 3 (rap) 
    document.getElementById('iframe-holder').src=random(songArrayThree);

 //determines boolean state of each gesture checker
 //make the peace sign checker true so that program can move onto next if statement
    neutralChecker = false;
    thumbsUpChecker = false;
    peaceChecker = false;
    highFiveChecker = true;
       
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();

}

//determine characteristics of filter (cool tone translucent gradiant)
function toggleRainbow() {
      filter1.loadPixels();
  
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      let index = (i + j * width) * 4;

      filter1.pixels[index] = j + 30; // R
      filter1.pixels[index+1] = j + 200; // G
      filter1.pixels[index+2] = i - 140; // B
      filter1.pixels[index+3] = 75; // A
    }
  }
  
  filter1.updatePixels();
  
}