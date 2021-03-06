var canvas;
var buttonFeed, buttonFeedImage,
    buttonTrain, buttonTrainImage,
    buttonClean, buttonCleanImage,
    buttonSleep, buttonSleepImage,
    feedIcon, feedIconImage,
    trainIcon, trainIconImage,
    bathIcon, bathIconImage,
    tiredStatus, tiredStatusImage,
    hungerStatus, hungerStatusImage,
    dirtyStatus, dirtyStatusImage,
    brone, broneImage,
    addition = [], additionImage, additionOpacity = [],
    barEat, barStamina, barClean, barExtra, barImage;

canvas = document.getElementById("cnv");
canvas.width = window.screen.width;
canvas.height = window.screen.height;

//Assign asset
broneImage = new Image();
broneImage.src = "images/brone.png";
buttonFeedImage = new Image();
buttonFeedImage.src = "images/buttonFeed.png";
buttonTrainImage = new Image();
buttonTrainImage.src = "images/buttonTrain.png";
buttonCleanImage = new Image();
buttonCleanImage.src = "images/buttonBath.png";
buttonSleepImage = new Image();
buttonSleepImage.src = "images/buttonSleep.png";
additionImage = new Image();
additionImage.src = "images/plus.png";
barImage = new Image();
barImage.src = "images/bar.png";
feedIconImage = new Image();
feedIconImage.src = "images/hunger.png";
trainIconImage = new Image();
trainIconImage.src = "images/train.png";
bathIconImage = new Image();
bathIconImage.src = "images/bath.png";
tiredStatusImage = new Image();
tiredStatusImage.src = "images/status_sleep.png";
hungerStatusImage = new Image();
hungerStatusImage.src = "images/status_hungry.png";
dirtyStatusImage = new Image();
dirtyStatusImage.src = "images/status_poop.png";

function sprite(options) {
    var that = {},
        frameIndexX = 0,
        frameIndexY = 0,
        tickCount = 0;
    that.tickPerFrame = options.tickPerFrame || 0;
    that.numberOfFrame = options.numberOfFrame || 1;

    that.context = options.context;
    that.w = options.w;
    that.h = options.h;
    that.img = options.img;
    that.x = options.x;
    that.y = options.y;
    that.scaleRatio = options.scaleX;
    that.offsetY = options.h/2;
    that.offsetX = options.w/2;
    that.scaleX = options.scaleX;
    that.scaleY = options.scaleY;

    //var update berisi function untuk
    //menggerakkan frame
    that.update = function () {
        tickCount += 1;

        if (tickCount > that.tickPerFrame) {
            tickCount = 0;

            if (frameIndexX < that.numberOfFrame - 1) {
                frameIndexX += 1;
            } else {
                frameIndexX = 0;
            }
        }
    };

    //var render berisi function untuk
    //merender obyek
    that.render = function () {
        that.context.drawImage(
            that.img,
            frameIndexX * that.w,
            frameIndexY * that.h,
            that.w,
            that.h,
            that.x - (that.offsetX * that.scaleX),
            that.y - (that.offsetY * that.scaleY),
            (that.w) * that.scaleX,
            that.h * that.scaleY,
        );
    };

    that.renderWithOpacity = function(opacity){
        that.context.globalAlpha = opacity;
        that.render();
        that.context.globalAlpha = 1;
    }

    that.changeFrame = function (frameX,frameY) {
        frameIndexX = frameX;
        frameIndexY = frameY;
        that.render();
    }

    that.getFrameWidth = function () {
        return that.w;
    }

    that.getFrameHeigth = function () {
        return that.h;
    }

    return that;
}

//brone sprite
brone = sprite({
    context: canvas.getContext("2d"),
    w: 256,
    h: 384,
    img: broneImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width/2,
    y: (2/4) * canvas.height + 40,
    scaleX : 1,
    scaleY : 1,
});

buttonFeed = sprite( {
    context: canvas.getContext("2d"),
    w: 64,
    h: 48,
    img: buttonFeedImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) - (canvas.width * (7.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 2,
    scaleY: 2,
});

buttonTrain = sprite( {
    context: canvas.getContext("2d"),
    w: 64,
    h: 48,
    img: buttonTrainImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) - (canvas.width * (2.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 2,
    scaleY: 2,
});

buttonClean = sprite( {
    context: canvas.getContext("2d"),
    w: 64,
    h: 48,
    img: buttonCleanImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) + (canvas.width * (2.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 2,
    scaleY: 2,
});

buttonSleep = sprite( {
    context: canvas.getContext("2d"),
    w: 64,
    h: 48,
    img: buttonSleepImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) + (canvas.width * (7.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 2,
    scaleY: 2,
});

tiredStatus = sprite( {
    context: canvas.getContext("2d"),
    w: 256,
    h: 256,
    img: tiredStatusImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) - (canvas.width * (5/24)),
    y: (canvas.height * (10/20)) - (canvas.height * (2/20)),
    scaleX : 0.5,
    scaleY: 0.5,
});

hungerStatus = sprite( {
    context: canvas.getContext("2d"),
    w: 256,
    h: 256,
    img: hungerStatusImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) + (canvas.width * (5/24)),
    y: (canvas.height * (10/20)) - (canvas.height * (2/20)),
    scaleX : 0.5,
    scaleY: 0.5,
});

dirtyStatus = sprite( {
    context: canvas.getContext("2d"),
    w: 256,
    h: 256,
    img: dirtyStatusImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) - 20 - (canvas.width * (5/24)),
    y: (canvas.height * (10/20)) + (canvas.height * (2/20)+20),
    scaleX : 0.5,
    scaleY: 0.5,
});

barStamina = sprite({
    context: canvas.getContext("2d"),
        w: 2560,
        h: 128,
        img: barImage,
        numberOfFrame: 1,
        tickPerFrame: 1,
        x: canvas.width * 20/40,
        y: canvas.height * 4/40 + 20,
        scaleX : 0.2,
        scaleY: 0.2,
});

barEat = sprite({
    context: canvas.getContext("2d"),
    w: 2560,
    h: 128,
    img: barImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width * 20/40,
    y: canvas.height * 6/40 + 20,
    scaleX : 0.2,
    scaleY: 0.2,
});

barClean = sprite({
    context: canvas.getContext("2d"),
    w: 2560,
    h: 128,
    img: barImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width * 20/40,
    y: canvas.height * 8/40 + 20,
    scaleX : 0.2,
    scaleY: 0.2,
});

trainIcon = sprite({
    context: canvas.getContext("2d"),
    w: 256,
    h: 256,
    img: trainIconImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width * 4/40,
    y: canvas.height * 4/40 + 20,
    scaleX : 0.2,
    scaleY: 0.2,
});

feedIcon = sprite({
    context: canvas.getContext("2d"),
    w: 256,
    h: 256,
    img: feedIconImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width * 4/40,
    y: canvas.height * 6/40 + 20,
    scaleX : 0.2,
    scaleY: 0.2,
});

bathIcon = sprite({
    context: canvas.getContext("2d"),
    w: 256,
    h: 256,
    img: bathIconImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width * 4/40,
    y: canvas.height * 8/40 + 20,
    scaleX : 0.2,
    scaleY: 0.2,
});


function createAddition(index, size){
    //create sprite
    addition[index] = sprite({
        context: canvas.getContext("2d"),
        w: 256,
        h: 256,
        img: additionImage,
        numberOfFrame: 1,
        tickPerFrame: 1,
        x: canvas.width/2 + 180,
        y: ((3/5) * canvas.height) - 190,
        scaleX : size,
        scaleY : size,
    });
    additionOpacity[index] = 1;
}

function renderTime(time, x, y){
    var context = canvas.getContext("2d");

    context.font = "bold 30px Consolas";
    context.textAlign = "center";
    context.fillStyle = "white";
    context.fillText(time, x, y);
}
