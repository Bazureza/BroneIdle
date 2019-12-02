(function () {
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        egg.update();
        egg.render();
    }

    gameLoop();
}());
