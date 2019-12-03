var statusBrone = new function() {

    this.Initialize = function () {
        //random between 70 ~ 90
        stamina = Math.ceil(Math.random() * 20) + 50;
        clean = Math.ceil(Math.random() * 20) + 50;
        hunger = Math.ceil(Math.random() * 20) + 50;
        agi = 0;
        str = 0;
        this.timeStampHunger = Date.now();
        this.timeStampBath = Date.now();
    }

    const maxStamina = 100,
        maxClean = 100,
        maxHunger = 100;

    var stamina,
        clean,
        hunger,
        agi,
        str;

    this.timeStampButtonHunger = 0;
    this.timeStampButtonBath = 0;
    this.timeStampButtonSleep = 0;
    this.timeStampButtonTrain = 0;

    this.timeStampHunger = 0;
    this.modifierHunger = 5;
    this.timeStampBath = 0;
    this.modifierBath = 5;

    this.broneAge = 0;

    this.getStamina = function() {
        return stamina;
    };

    this.getClean = function() {
        return clean;
    };

    this.getEat = function() {
        return hunger;
    };

    this.sleep = function() {
        stamina = 100;
    };

    this.manipulateStamina = function (value) {
      if (stamina + value < 0) {
          return false;
      } else {
          stamina += value;
          return true;
      }
    };

    this.bath = function(value) {
        if (clean + value > maxClean) {
            clean = maxClean;
        } else if (clean + value < 0) {
            clean = 0;
        } else {
            clean += value;
        }
    };

    this.eat = function(value) {
        if (hunger + value > maxHunger) {
            hunger = maxHunger;
        } else if (hunger + value < 0) {
            hunger = 0;
        } else {
            hunger += value;
        }
    };

    this.train = function() {
        var status;
        if (statusBrone.broneAge == 0) {
            status = this.manipulateStamina(-10);
        } else if (statusBrone.broneAge == 1) {
            status = this.manipulateStamina(-20);
        } else if (statusBrone.broneAge == 2) {
            status = this.manipulateStamina(-30);
        } else if (statusBrone.broneAge == 3){
            status = this.manipulateStamina(-50);
        }
        if (status == true) {
            agi++;
            str++;
            return true;
        }else return false;
    };

    this.getAgi = function(){
        return agi;
    }

    this.getStr = function(){
        return str;
    }

}
