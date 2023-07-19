var numberSize = 15;
var streams = [];

function setup(){
  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / numberSize; i++) {
    var stream = new Stream();
    stream.generateNumbers(x, random(-1000, height / 2));
    streams.push(stream);
    x += numberSize;
  }
  textSize(numberSize);
}

function draw() {
  background(255, 150);
  streams.forEach(function(stream) {
    stream.render();
  });

}

function Number(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(2, 20));
  this.first = first;

this.setToNumber = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,1));
      }
    }
  }

  this.rain = function() {
    // if (this.y >= height){
    //   this.y = 0;
    // }else{
    //   this.y += this.speed;
    // }
    this.y = (this.y >= height) ? 0 : this.y += this.speed; 
  }
}

function Stream() {
  this.numbers = [];
  this.totalNumbers = round(random(5, 30));
  this.speed = random(2, 15);

  this.generateNumbers = function(x, y) {
    var first = round(random(0, 4)) == 1;
    for (var i = 0; i <= this.totalNumbers; i++) {
      number = new Number(x, y, this.speed, first);
      number.setToNumber();
      this.numbers.push(number);
      y -= numberSize;
      first = false;
    }
  }

  this.render = function() {
    this.numbers.forEach(function(number) {
      if (number.first){
        fill(200, 0, 0, 255);
      } else {
        fill(100, 0, 0, 180);
      }
      text(number.value, number.x, number.y);
      number.rain();
      number.setToNumber();
    });
  }

}