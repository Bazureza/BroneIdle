var canvas;
var buttonFeed, buttonFeedImage,
    buttonTrain, buttonTrainImage,
    buttonClean, buttonCleanImage,
    egg, eggImage;

canvas = document.getElementById("cnv");
canvas.width = window.screen.width;
canvas.height = window.screen.height;

//Assign asset
eggImage = new Image();
eggImage.src = "images/egg.png";
buttonFeedImage = new Image();
buttonFeedImage.src = "images/button.png";
buttonTrainImage = new Image();
buttonTrainImage.src = "images/button.png";


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
    that.scaleRatio = 1;
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

    that.getFrameWidth = function () {
        return that.w / numberOfFrame;
    }

    return that;
}

//egg sprite
egg = sprite({
    context: canvas.getContext("2d"),
    w: 360,
    h: 380,
    img: eggImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width/2,
    y: (3/5) * canvas.height,
    scaleX : 1,
    scaleY : 1,
});

buttonFeed = sprite( {
    context: canvas.getContext("2d"),
    w: 27,
    h: 20,
    img: buttonFeedImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width/4) - 50,
    y: (18/20) * canvas.height,
    scaleX : 5,
    scaleY: 5,
});

buttonTrain = sprite( {
    context: canvas.getContext("2d"),
    w: 27,
    h: 20,
    img: buttonFeedImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: (canvas.width/3) + 50,
    y: (18/20) * canvas.height,
    scaleX : 5,
    scaleY: 5,
});