var bgm, growSFX, clickSFX;

bgm = new Audio("media/bgm.mp3");
growSFX = new Audio("media/grow.mp3");
clickSFX = new Audio("media/click.ogg");
bgm.loop = true;

function PlayClickSFX(){
    clickSFX.pause();
    clickSFX.currentTime = 0;
    clickSFX.play();
}

function PlayGrowSFX(){
    growSFX.pause();
    growSFX.currentTime = 0;
    growSFX.play();
}

function PlayBGM(){
    bgm.play();
}