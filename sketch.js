//Create variables here
var database;
var dogImage,dogImage1;
var foods,foodStalk;
var dog;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  dogImage1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
     database = firebase.database();
     dog = createSprite(400,400,150,150);
     dog.addImage(dogImage);
     dog.scale = 0.12;
     foodStalk = database.ref('Food');
     foodStalk.on("value",readStock);
     textSize(20);
  
}


function draw() {  
  background("red");
  if(keyWentDown("up_arrow")) {
    writeStock(foods);
    dog.addImage(dogImage1);
  } fill(255,255,254);
  stroke("black");
  text("Food remaining : "+ foods,170,200);
  textSize(13);
  text("Press Up Arrow key to feed Drago Milk",130,10,300,20);
  drawSprites();
  //add styles here

}

function readStock(data) {
   foods = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  } else {
    x = x-1;
  } 
  database.ref('/').update({
    Food : x
  })

}