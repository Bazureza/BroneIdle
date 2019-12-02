(function () {

    var velocity = 2;

    function gameLoop() {
        requestAnimationFrame(gameLoop);

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        brone.update();
        brone.render();

        RenderButton();
        RenderGUI();
        movementObject();
    }

    function movementObject(){
        for (var i = 0 ; i<addition.length ; i++) {
            addition[i].update();
            addition[i].y -= velocity;
            addition[i].render();
        }
    }

    function Initialize(){
        statusBrone.Initialize();
    }

    function RenderButton(){
        buttonFeed.update();
        buttonFeed.render();
        buttonTrain.update();
        buttonTrain.render();
        buttonClean.update();
        buttonClean.render();
        buttonExtra.update();
        buttonExtra.render();
    }

    function RenderGUI(){
        var context = canvas.getContext("2d");

        //stamina
        context.font = "bold 30px Consolas";
        context.textAlign = "start";
        context.fillStyle = "blue";
        context.fillText("Stamina : " + statusBrone.getStamina(), canvas.width/20, canvas.height/20);

        //eat
        context.font = "bold 30px Consolas";
        context.textAlign = "start";
        context.fillStyle = "green";
        context.fillText("Eat     : " + statusBrone.getEat(), canvas.width/20, canvas.height/20 + canvas.height/40);

        //clean
        context.font = "bold 30px Consolas";
        context.textAlign = "start";
        context.fillStyle = "white";
        context.fillText("Clean   : " + statusBrone.getClean(), canvas.width/20, canvas.height/20 + (2*canvas.height/40));

        //educate
        context.font = "bold 30px Consolas";
        context.textAlign = "start";
        context.fillStyle = "yellow";
        context.fillText("Educate : " + statusBrone.getEducate(), canvas.width/20, canvas.height/20 + (3*canvas.height/40));

    }

    // Input Detect //
    function tap(e) {
        var i,
            loc = {},
            pos = getElementPosition(canvas),
            tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
            tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
            canvasScaleRatio = canvas.width / canvas.offsetWidth;

        loc.x = (tapX - pos.x) * canvasScaleRatio;
        loc.y = (tapY - pos.y) * canvasScaleRatio;

        /*console.log("curX:" + loc.x + "curY:" + loc.y);*/

        checkButtonFeed(loc);
        checkButtonTrain(loc);
        checkButtonClean(loc);
    }

    function getElementPosition(element) {
        var parentOffset,
            pos = {
                x: element.offsetLeft,
                y: element.offsetTop
            }

        if (element.offsetParent) {
            parentOffset = getElementPosition(element.offsetParent);
            pos.x += parentOffset.x;
            pos.y += parentOffset.y;
        }
        return pos;
    }

    // Button Input Checks //
    function checkButtonFeed(loc){

        var distanceButton, distanceMax;
        distanceButton = distance(
            {
                x: (buttonFeed.x),
                y: (buttonFeed.y)
            }, {
                x: loc.x,
                y: loc.y
            }
        );

        distanceMax = distance(
            {
                x: (buttonFeed.x),
                y: (buttonFeed.y)
            }, {
                x: (buttonFeed.x + ((buttonFeed.getFrameWidth() / 2)* buttonFeed.scaleRatio)),
                y: (buttonFeed.y + ((buttonFeed.getFrameHeigth() / 2)* buttonFeed.scaleRatio))
            }
        );

        //check collision tap with button
        if (distanceButton.x <= distanceMax.x && distanceButton.y <= distanceMax.y) {

            statusBrone.addEat(5);

            spawnAdditionSprite();
        }
    }

    function checkButtonTrain(loc){

        var distanceButton, distanceMax;
        distanceButton = distance(
            {
                x: (buttonTrain.x),
                y: (buttonTrain.y)
            }, {
                x: loc.x,
                y: loc.y
            }
        );

        distanceMax = distance(
            {
                x: (buttonTrain.x),
                y: (buttonTrain.y)
            }, {
                x: (buttonTrain.x + ((buttonTrain.getFrameWidth() / 2)* buttonTrain.scaleRatio)),
                y: (buttonTrain.y + ((buttonTrain.getFrameHeigth() / 2)* buttonTrain.scaleRatio))
            }
        );

        //check collision tap with button
        if (distanceButton.x <= distanceMax.x && distanceButton.y <= distanceMax.y) {
            console.log(statusBrone.getStamina());
            statusBrone.addStamina(5);
            console.log(statusBrone.getStamina());
        }
    }

    function checkButtonClean(loc){

        var distanceButton, distanceMax;
        distanceButton = distance(
            {
                x: (buttonClean.x),
                y: (buttonClean.y)
            }, {
                x: loc.x,
                y: loc.y
            }
        );

        distanceMax = distance(
            {
                x: (buttonClean.x),
                y: (buttonClean.y)
            }, {
                x: (buttonClean.x + ((buttonClean.getFrameWidth() / 2)* buttonClean.scaleRatio)),
                y: (buttonClean.y + ((buttonClean.getFrameHeigth() / 2)* buttonClean.scaleRatio))
            }
        );

        //check collision tap with button
        if (distanceButton.x <= distanceMax.x && distanceButton.y <= distanceMax.y) {
            console.log(statusBrone.getClean());
            statusBrone.addClean(5);
            console.log(statusBrone.getClean());
        }
    }

    function distance(p1, p2) {
        var dist = {};
        dist.x = Math.abs(p1.x - p2.x);
        dist.y = Math.abs(p1.y - p2.y);

        return dist;
    }

    function spawnAdditionSprite(){
        var additionIndex, distanceSpawn = 40, offset, offsetSpawn, offsetSize;

        offsetSpawn = Math.ceil(Math.random()*3);

        for(var i = 0; i < offsetSpawn ; i++) {
            additionIndex = addition.length;
            offsetSize = (Math.random() * 0.2) + 0.1;

            createAddition(additionIndex, offsetSize);
            offset = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * distanceSpawn);
            console.log(offset);

            addition[additionIndex].x = canvas.width / 2 + 180 - distanceSpawn + offset;
            addition[additionIndex].y = ((3 / 5) * canvas.height) - 190 - distanceSpawn + offset;
        }
    }


    gameLoop();
    Initialize();

    canvas.addEventListener("mousedown", tap);
    canvas.addEventListener("ontouchstart", tap);
}());


