(function () {
    var time = 0, fps = 0, executeTime = Date.now(), currentFPS = 60;
    var canvas;
    function update() {
        if (time>=1){
            executeTime = Date.now();
            time = 0;
            currentFPS = fps;
            fps = 0;
        } else {
            fps++;
        }
        renderText();
        requestAnimationFrame(update);
        time = ((Date.now() - executeTime)*0.001);
    }
    function renderText(){
        var context = canvas.getContext("2d");

        context.font = "bold 20px Consolas";
        context.textAlign = "start";
        context.fillStyle = "green";
        context.fillText(currentFPS +" fps", 20, 20);
    }
    canvas = document.getElementById("cnv");
    canvas.width = 720;
    canvas.height = 1280;
    update();

}());
