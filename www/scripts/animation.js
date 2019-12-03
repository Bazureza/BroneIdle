function spawnAdditionSprite(){
    var additionIndex, distanceSpawn = 40, offset, offsetSpawn, offsetSize;

    offsetSpawn = Math.ceil(Math.random()*3);

    for(var i = 0; i < offsetSpawn ; i++) {
        additionIndex = addition.length;
        offsetSize = (Math.random() * 0.2) + 0.1;

        createAddition(additionIndex, offsetSize);
        offset = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * distanceSpawn);
        console.log(offset);

        addition[additionIndex].x = canvas.width / 2 + 128 - distanceSpawn + offset;
        addition[additionIndex].y = ((3 / 5) * canvas.height) - 192  + offset + setOffsetYAdditionSprite();
    }
}

function setOffsetYAdditionSprite(){
    if (statusBrone.broneAge == 0) return 192 * 3/4;
    else if (statusBrone.broneAge == 1) return 192 * 2/4;
    else if (statusBrone.broneAge == 2) return (192 * 1/4) ;
    else return -192 * 1/4;
}

function spawnGreetings(){

}

function destroyAdditionSprite(index) {
    addition[index] = null;
    additionOpacity[index] = null;

    //array-nya dihilangkan satu
    //kemudian masuk render lagi, maka akan hilang
    addition.splice(index, 1);
    additionOpacity.splice(index, 1);
}