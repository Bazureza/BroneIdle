var canvas;
var buttonFeed, buttonFeedImage,
    buttonTrain, buttonTrainImage,
    buttonClean, buttonCleanImage,
    buttonExtra, buttonExtraImage,
    brone, broneImage,
    addition = [], additionImage;

canvas = document.getElementById("cnv");
canvas.width = window.screen.width;
canvas.height = window.screen.height;

//Assign asset
broneImage = new Image();
broneImage.src = "images/egg.png";
buttonFeedImage = new Image();
buttonFeedImage.src = "images/button.png";
buttonTrainImage = new Image();
buttonTrainImage.src = "images/button.png";
buttonCleanImage = new Image();
buttonCleanImage.src = "images/button.png";
buttonExtraImage = new Image();
buttonExtraImage.src = "images/button.png";
additionImage = new Image();
additionImage.src = "images/plus.png";


function sprite(options) {
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        tickPerFrame = options.tickPerFrame || 0,
        numberOfFrame = options.numberOfFrame || 1;

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

        if (tickCount > tickPerFrame) {
            tickCount = 0;

            if (frameIndex < numberOfFrame - 1) {
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };

    //var render berisi function untuk
    //merender obyek
    that.render = function () {
        that.context.drawImage(
            that.img,
            frameIndex * that.w / numberOfFrame,
            0,
            that.w / numberOfFrame,
            that.h,
            that.x - (that.offsetX * that.scaleX),
            that.y - (that.offsetY * that.scaleY),
            (that.w / numberOfFrame) * that.scaleX,
            that.h * that.scaleY,
        );
    };

    that.change = function (frame) {
        frameIndex = frame;
        that.render();
    }

    that.getFrameWidth = function () {
        return that.w / numberOfFrame;
    }

    that.getFrameHeigth = function () {
        return that.h;
    }

    return that;
}

//brone sprite
brone = sprite({
    context: canvas.getContext("2d"),
    w: 360,
    h: 380,
    img: broneImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width/2,
    y: (3/5) * canvas.height,
    scaleX : 1,
    scaleY : 1,
});

buttonFeed = sprite( {
    context: canvas.getContext("2d"),
    w: 26,
    h: 17,
    img: buttonFeedImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) - (canvas.width * (7.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 5,
    scaleY: 5,
});

buttonTrain = sprite( {
    context: canvas.getContext("2d"),
    w: 26,
    h: 17,
    img: buttonTrainImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) - (canvas.width * (2.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 5,
    scaleY: 5,
});

buttonClean = sprite( {
    context: canvas.getContext("2d"),
    w: 26,
    h: 17,
    img: buttonCleanImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) + (canvas.width * (2.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 5,
    scaleY: 5,
});

buttonExtra = sprite( {
    context: canvas.getContext("2d"),
    w: 26,
    h: 17,
    img: buttonExtraImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width * (12/24)) + (canvas.width * (7.5/24)),
    y: (18/20) * canvas.height,
    scaleX : 5,
    scaleY: 5,
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
}