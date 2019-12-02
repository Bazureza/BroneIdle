(function () {
    var time = 0, fps = 0, executeTime = Date.now();
    var canvas;
    function update() {
        if (time>=1){
            executeTime = Date.now();
            time = 0;
            renderText();
            fps = 0;
        } else {
            fps++;
        }
        requestAnimationFrame(update);
        time = ((Date.now() - executeTime)*0.001);
    }
    function renderText(){
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        var context = canvas.getContext("2d");

        context.font = "bold 20px Consolas";
        context.textAlign = "start";
        context.fillStyle = "green";
        context.fillText(fps +" fps", 40, 40);
    }
    canvas = document.getElementById("cnv");
    canvas.width = 720;
    canvas.height = 1280;
    update();

}());
