// добавлен use strict
// var заменены на let

'use strict'

// создание холста
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// массив мячей
let balls = [];

// генератор чисел
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Создание прототипа мяча
// Ball представлен в виде класса, хотя в изначальном варианте был function
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x; 
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
// отрисовка шара
// здесь и далее методы добавлен как методы класса
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

// метод для описания движения мяча
    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
          }
        
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
          }
        
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
          }
        
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
          }
        
        this.x += this.velX;
        this.y += this.velY;
    }
// метод для обнаружения столкновений
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
              let dx = this.x - balls[j].x;
              let dy = this.y - balls[j].y;
              let distance = Math.sqrt(dx * dx + dy * dy);
        
              if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
              }
            }
        }
    }
}

// создание функции анимации
(function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    while (balls.length < 25) {
      let ball = new Ball(
        random(0,width),
        random(0,height),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        random(10,20)
      );
      balls.push(ball);
    }
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
}) ();

