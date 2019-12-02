(function () {
    function gameLoop() {
        requestAnimationFrame(gameLoop);

        /*egg.update();
        egg.render();*/

        buttonFeed.update();
        buttonFeed.render();
        buttonTrain.update();
        buttonTrain.render();
    }

    gameLoop();
}());
