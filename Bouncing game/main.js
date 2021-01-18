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
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickoffY = 30;
let brickoffX = 30;
let score2 = 0;

let bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[i][r] = { x: 0, y: 0, status: 1 };
    }
}

function collisionDetection() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[i][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    wally = -wally;
                    b.status = 0;
                    score2++;
                    if(score2 == 9) {
                        alert("you win with a normal score of " + score + "!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}



function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[i][r].status == 1) {
                let brickX = (i * (brickWidth + brickPadding)) + brickoffX;
                let brickY = (r * (brickHeight + brickPadding)) + brickoffY;
                bricks[i][r].x = brickX;
                bricks[i][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "lightblue";
                ctx.fill();
                ctx.closePath();
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
    collisionDetection();

    
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
