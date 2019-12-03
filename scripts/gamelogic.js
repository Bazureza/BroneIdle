function checkParamterStatus(){
    growUp();
}

function growUp(){
    if (statusBrone.broneAge == 3) return;
    if (statusBrone.getEat() == 100) {
        statusBrone.requirementGrow++;
    }

    if (statusBrone.requirementGrow == 5 && statusBrone.broneAge == 0) {
        statusBrone.requirementGrow = 0;
        statusBrone.broneAge = 1;
    } else if (statusBrone.requirementGrow == 10 && statusBrone.broneAge == 1) {
        statusBrone.requirementGrow = 0;
        statusBrone.broneAge = 2;
    } else if (statusBrone.requirementGrow == 25 && statusBrone.broneAge == 2) {
        statusBrone.requirementGrow = 0;
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

    indexBar = Math.floor(statusBrone.getEducate() / 10);
    barExtra.changeFrame(0, indexBar);
}

var fs = require("fs");
var sampleObject = {
    a: 1,
    b: 2,
    c: {
        x: 11,
        y: 22
    }
};

fs.writeFile("./object.json", JSON.stringify(sampleObject), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});