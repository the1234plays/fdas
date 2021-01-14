let ballRadius = 10;
let x = 150
let y = cnv.height - 10;
let wallx = 2;
let wally = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = cnv.width;
let rightIsPressed = false;
let leftIsPressed = false; 
let score = 0;
let lives = 3;
let brickRowCount = 3;
let brickColumnCount = 3;
let brickW = 50;
let brickH = 20;
let brickPadding = 10;
let brickX = 30;
let brickYY = 30;

let bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let a = 0; a < brickRowCount; a++) {
        bricks[i][a] = { x: 0, y: 0, status: 1 };
    }
}



function walll() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let a = 0; a < brickRowCount; a++) {
            let b = bricks[i][a];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
                    wally = -wally;
                    b.status = 0;
                }
            }
        }
    }
}


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let scoreNumber = document.getElementById("scoreTracker")
let livesNumber = document.getElementById("livesTracker")



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, cnv.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let a = 0; a < brickRowCount; a++) {
            if (bricks[i][a].status == 1) {
                let brickX = (i * (brickW + brickPadding)) + brickYY;
                let brickY = (a * (brickH + brickPadding)) + brickX;
                bricks[i][a].x = brickX;
                bricks[i][a].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickW, brickH);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



function keyDownHandler(event) {
    if(event.keyCode === 39) {
        rightIsPressed = true;
    }
    else if(event.keyCode === 37) {
        leftIsPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode === 39) {
        rightIsPressed = false;
    }
    else if(event.keyCode === 37) {
        leftIsPressed = false;
    }
}


requestAnimationFrame(draw)
 
function draw() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    drawBricks();
    drawBall();
    drawPaddle();
    walll();

    
    if(x + wallx > cnv.width) {
        wallx = -wallx;
    } else if ( x + wallx < 0) {
        wallx = -wallx;
    }


    if(y + wally < ballRadius) {
        wally = -wally;
    }
    else if(y + wally > cnv.height) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            wally = -wally;
            score++
            console.log(score)
        }
        else {
            lives--;
            if(lives == 0) {
            alert("Game Over, click reload to jump right back into the action, your score was " + score);
            document.location.reload();
            clearInterval(interval);
        } else  {
            x = 150
            y = 10;
            dx = 2;
            wally = -2;
            paddleX = cnv.width;
        }
        }

        scoreNumber.innerHTML = score
        livesNumber.innerHTML = lives
    }


    if(rightIsPressed) {
        paddleX += 5;

        
    }
    else if(leftIsPressed) {
        paddleX -= 5;
        
    }
    
    x += wallx;
    y += wally;
}
 
let    interval =  setInterval(draw, 10);