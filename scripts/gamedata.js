var statusBrone = new function() {

    this.Initialize = function () {
        //random between 70 ~ 90
        stamina = Math.ceil(Math.random() * 20) + 50;
        clean = Math.ceil(Math.random() * 20) + 50;
        eat = Math.ceil(Math.random() * 20) + 50;
        educate = Math.ceil(Math.random() * 20) + 50;
    }

    const maxStamina = 100,
        maxClean = 100,
        maxEat = 100,
        maxEducate = 100;
    var stamina,
        clean,
        eat,
        educate;
    this.broneAge = 0;
    this.requirementGrow = 0;

    this.getStamina = function() {
        return stamina;
    };

    this.getClean = function() {
        return clean;
    };

    this.getEat = function() {
        return eat;
    };

    this.getEducate = function() {
        return educate;
    };

    this.addStamina = function(value) {
        stamina += value;
        if (stamina > maxStamina) {
            stamina = maxStamina;
        } else if (stamina < 0) {
            stamina = 0;
        }
    };

    this.addClean = function(value) {
        clean += value;
        if (clean > maxClean) {
            clean = maxClean;
        } else if (clean < 0) {
            clean = 0;
        }
    };

    this.addEat = function(value) {
        eat += value;
        if (eat > maxEat) {
            eat = maxEat;
        } else if (eat < 0) {
            eat = 0;
        }
    };

    this.addEducate = function(value) {
        educate += value;
        if (educate > maxEducate) {
            educate = maxEducate;
        } else if (educate < 0) {
            educate = 0;
        }
    };
}
