function checkParamterStatus(){
    growUp();
}

function growUp(){
    if (statusBrone.broneAge == 3) return;

    if (statusBrone.getAgi() >= 5 && statusBrone.getStr() >= 5 && statusBrone.broneAge == 0) {
        statusBrone.broneAge = 1;
    } else if (statusBrone.getAgi() >= 20 && statusBrone.getStr() >= 20 && statusBrone.broneAge == 1) {
        statusBrone.broneAge = 2;
    } else if (statusBrone.getAgi() >= 50 && statusBrone.getStr() >= 50 && statusBrone.broneAge == 2) {
        statusBrone.broneAge = 3;
    }
    brone.changeFrame(statusBrone.broneAge, 0);
}

function barUpdate(){
    var indexBar;

    indexBar = Math.floor(statusBrone.getStamina() / 10);
    barStamina.changeFrame(0, indexBar);

    indexBar = Math.floor(statusBrone.getEat() / 10);
    barEat.changeFrame(0, indexBar);

    indexBar = Math.floor(statusBrone.getClean() / 10);
    barClean.changeFrame(0, indexBar);
}


function TimeNow(){
    return Date.now();
}

function decrementEat(){
    var time = (TimeNow() - statusBrone.timeStampHunger)/1000;
    if ( time >= 10*60) {
        statusBrone.timeStampHunger = TimeNow();
        statusBrone.eat(-statusBrone.modifierHunger * (2**statusBrone.broneAge));
    }
}

function decreamentBath(){
    var time = (TimeNow() - statusBrone.timeStampBath)/1000;
    if ( time >= 10*60) {
        statusBrone.timeStampBath = TimeNow();
        statusBrone.bath(-statusBrone.modifierBath);
    }
}

function decrementStatus(){
    decrementEat();
    decreamentBath();
}