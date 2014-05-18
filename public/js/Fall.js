function Fall() {
  //=========== in-class variables ===========
  this.servoMax = 180;
  this.fallIDs = [];
  this.clocks = [];
  this.clockSpeeds = [];
  this.lifespans =[];
}

Fall.prototype = {

  //=========== fallIt() ===========  
  fallIt : function() {
    for (var i = 0; i < modules.length; i++) {
      if (this.fallIDs.indexOf(modules[i].id) >= 0) {
        var fallIndex = this.fallIDs.indexOf(modules[i].id);
        var counter = this.clocks[fallIndex];

        if(counter >= this.lifespans[fallIndex]){
          this.removeList(modules[i].id);
          console.log(i+1, 'Fall off');
          sendmessage({id: i+1, mode: 'Fall', value: false});
          $.get("/output/" + (i+1) + "D" );
        } else {
          modules[i].servoAngle = 0; // 0 ~ servoMax
        }
      }
    }
  },

  //=========== addList() ===========
  addList : function(_id) {
    this.fallIDs.push(_id);
    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);
    this.lifespans.push(18);
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].id == _id) {
         modules[i].fallOn = true;
      }
    }

  },

  //=========== removeList() ===========
  removeList : function(_id) { 
    if (this.fallIDs.length > 0) {
      if (this.fallIDs.indexOf(_id) >= 0) {
        var removeIndex = this.fallIDs.indexOf(_id);
        this.fallIDs.splice(removeIndex, 1);
        this.clocks.splice(removeIndex, 1);
        this.clockSpeeds.splice(removeIndex, 1);
        this.lifespans.splice(removeIndex, 1);

        for (var i = 0; i < modules.length; i++) {
          if (modules[i].id == _id) {
            modules[i].servoAngle = this.servoMax/2;
            modules[i].fallOn = false;
          }
        }
      }
    }
  },

  //=========== updateClock() ===========  
  updateClock : function() {
    for (var i = 0; i < this.clocks.length; i++){
      this.clocks[i] += this.clockSpeeds[i];
    }
  }
}
