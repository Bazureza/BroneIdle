var canvas, egg, eggImage;

canvas = document.getElementById("cnv");
canvas.width = window.screen.width * window.devicePixelRatio;
canvas.height = window.screen.height * window.devicePixelRatio;

eggImage = new Image();
eggImage.src = "images/egg.png";

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
            that.x,
            that.y,
            that.w / numberOfFrame,
            that.h
        );

    };

    that.getFrameWidth = function () {
        return that.w / numberOfFrame;
    }

    return that;
}

//knight sprite
egg = sprite({
    context: canvas.getContext("2d"),
    w: 360,
    h: 380,
    img: eggImage,
    numberOfFrame: 1,
    tickPerFrame: 1,
    x: canvas.width/2,
    y: canvas.height/2
});
