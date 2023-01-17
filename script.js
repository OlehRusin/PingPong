window.addEventListener("load", loadGame, false);

let animation,
    centerX = 150,
    centerY = 100,
    radiusBall = 15,
    dx = 5,
    dy = 5,
    scoreCounter = 0,
    widthField = 350,
    widthRacket = 120,
    heightField = 500,
    heightRacket = 20,
    topPosition = 480,
    leftPosition = 120;

function loadGame() {
    animation = setInterval(startGame, 25);
}


function startGame() {

    if (centerY - radiusBall > heightField) {
        document.querySelector("#infoTable").innerHTML = `<p>GAME OVER!</p> <p>Your score: ${scoreCounter}</p>`;
        document.querySelector("#infoTable").style.color = "red"
        clearInterval(animation);
    }
    else {
        document.querySelector("#scoreCounter").innerHTML = scoreCounter;

        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radiusBall, 0, Math.PI * 2, true);
        context.stroke();
        context.fillStyle = "red";
        context.fill();

        context.fillStyle = "blue";
        context.fillRect(leftPosition, topPosition, widthRacket, heightRacket);


        if (centerX + radiusBall === widthField || centerX - radiusBall === 0) {
            dx = -dx;
            scoreCounter++;
        }
        if (centerY - radiusBall < 0) {
            dy = -dy;
            scoreCounter++;
        }

        centerX = centerX+ dx;
        centerY = centerY+ dy;


        if ((centerY + radiusBall == topPosition) && (centerX >= leftPosition) && (centerX < leftPosition + widthRacket)) {
            dy = -dy;
        }

        document.onkeydown = function () {
            switch (window.event.keyCode) {
                case 37:
                    leftPosition -= 20;
                    if (leftPosition < 0) {
                        leftPosition = 0;
                    }
                    break;
                case 39:
                    leftPosition += 20;
                    if (leftPosition + widthRacket > widthField) {
                        leftPosition = widthField - widthRacket;
                    }
                    break;
            }
        };

    }


}