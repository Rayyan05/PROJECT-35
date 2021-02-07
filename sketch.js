var balloon

function preload(){
  balloon1 = loadImage("Hot Air Ballon-02.png")
  bg1 = loadImage("Hot Air Ballon-01.png")
}

function setup() {
  createCanvas(800,400);

  database = firebase.database();
 balloon = createSprite(400,200,40,40)
 balloon.addImage(balloon1)
 balloon.scale = 0.5

 var balloonposition = database.ref('balloon/position')
 balloonposition.on("value",readPosition,showError);
}



function draw() {
  background(bg1);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
}


  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
 
})
}

function readPosition(data){
  position = data.val();
 balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error in writing to the database")
}

