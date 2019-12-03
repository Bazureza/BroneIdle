(function () {

    var velocity = 2;
    var modifierTime = 100;

    function gameLoop() {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        //brone.update();
        brone.render();

        RenderButton();
        RenderGUI();
        movementObject();
        barUpdate();

        decrementStatus();

        save();
        requestAnimationFrame(gameLoop);
    }

    function Initialize(){
        var JSONData = JSON.parse(load());
        statusBrone.Initialize(JSONData);
        brone.changeFrame(statusBrone.broneAge, 0);
    }

    function movementObject(){
        for (var i = 0 ; i<addition.length ; i++) {
            addition[i].update();
            addition[i].y -= velocity;
            if (additionOpacity[i] <= 0) {
                additionOpacity[i] = 0;
                addition[i].renderWithOpacity(additionOpacity[i]);
                destroyAdditionSprite(addition[i]);
            } else {
                additionOpacity[i] -= 0.01;
                if (additionOpacity[i] >= 0) {
                    addition[i].renderWithOpacity(additionOpacity[i]);
                }
            }
        }
    }

    function RenderButton(){
        renderButtonTime();

        buttonFeed.update();
        buttonFeed.render();
        buttonTrain.update();
        buttonTrain.render();
        buttonClean.update();
        buttonClean.render();
        buttonSleep.update();
        buttonSleep.render();
    }

    function RenderGUI(){

        //stamina
        trainIcon.render();
        barStamina.render();

        //eat
        feedIcon.render();
        barEat.render();

        //clean
        bathIcon.render();
        barClean.render();

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
        checkButtonSleep(loc);

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
            PlayClickSFX();
            var time = (TimeNow() - statusBrone.timeStampButtonHunger)/1000;
            if (time >= (5 * 60)/modifierTime) {
                statusBrone.eat(10);
                spawnAdditionSprite();
                statusBrone.timeStampHunger = TimeNow();
                statusBrone.timeStampButtonHunger = TimeNow();
            }
            localStorage.removeItem("data");
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
            PlayClickSFX();
            var time = (TimeNow() - statusBrone.timeStampButtonTrain)/1000;
            if (time >= (30 * 60)/modifierTime) {
                var status = statusBrone.train();
                if (status) {
                    spawnAdditionSprite();
                    statusBrone.timeStampButtonTrain = TimeNow();
                }
                console.log("AGI : " + statusBrone.getAgi() + "   STR : " + statusBrone.getStr());
                checkParamterStatus();
            }
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
            PlayClickSFX();
            var time = (TimeNow() - statusBrone.timeStampButtonBath)/1000;
            console.log(time + " "+(5*60)/modifierTime);
            if (time >= (5*60)/modifierTime) {
                statusBrone.timeStampBath = TimeNow();
                statusBrone.timeStampButtonBath = TimeNow();
                spawnAdditionSprite();
                statusBrone.bath(10);
            }
        }
    }

    function checkButtonSleep(loc){

        var distanceButton, distanceMax;
        distanceButton = distance(
            {
                x: (buttonSleep.x),
                y: (buttonSleep.y)
            }, {
                x: loc.x,
                y: loc.y
            }
        );

        distanceMax = distance(
            {
                x: (buttonSleep.x),
                y: (buttonSleep.y)
            }, {
                x: (buttonSleep.x + ((buttonSleep.getFrameWidth() / 2)* buttonSleep.scaleRatio)),
                y: (buttonSleep.y + ((buttonSleep.getFrameHeigth() / 2)* buttonSleep.scaleRatio))
            }
        );

        //check collision tap with button
        if (distanceButton.x <= distanceMax.x && distanceButton.y <= distanceMax.y) {
            PlayClickSFX();
            var time = (TimeNow() - statusBrone.timeStampButtonSleep)/1000;
            if (time >= (3 * 60 * 60)/modifierTime) {
                statusBrone.timeStampButtonSleep = TimeNow();
                spawnAdditionSprite();
                statusBrone.sleep();
            }
        }
    }

    function distance(p1, p2) {
        var dist = {};
        dist.x = Math.abs(p1.x - p2.x);
        dist.y = Math.abs(p1.y - p2.y);
        return dist;
    }

    function renderButtonTime(){
        var time = ((5 * 60)/modifierTime) - ((TimeNow() - statusBrone.timeStampButtonHunger)/1000);
        if (time > 0){
            renderTime(convertToTime(time*1000) , buttonFeed.x , buttonFeed.y - 55);
        }

        time = ((30 * 60)/modifierTime) - ((TimeNow() - statusBrone.timeStampButtonTrain)/1000);
        if (time > 0){
            renderTime(convertToTime(time*1000) , buttonTrain.x  , buttonTrain.y - 55);
        }

        time = ((5*60)/modifierTime) - ((TimeNow() - statusBrone.timeStampButtonBath)/1000);
        if (time > 0){
            renderTime(convertToTime(time*1000) , buttonClean.x , buttonClean.y - 55);
        }

        time = ((3 * 60 * 60)/modifierTime) - ((TimeNow() - statusBrone.timeStampButtonSleep)/1000);
        if (time > 0){
            renderTime(convertToTime(time*1000) , buttonSleep.x , buttonSleep.y - 55);
        }
    }

    Initialize();
    gameLoop();
    PlayBGM();

    canvas.addEventListener("mousedown", tap);
    canvas.addEventListener("ontouchstart", tap);
}());


