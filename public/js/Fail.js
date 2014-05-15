function Fail() {
  //=========== in-class variables ===========
  this.servoMax = 180;
  this.failIDs = [];
  this.clocks = [];
  this.clockSpeeds = [];
}

Fail.prototype = {

  //=========== failIt() ===========  
  failIt : function() {
    for (var i = 0; i < modules.length; i++) {
      if (this.failIDs.indexOf(modules[i].id) >= 0) {
        modules[i].servoAngle = 0; // 0 ~ servoMax
      }
    }
  },

  //=========== addList() ===========
  addList : function(_id) {
    this.failIDs.push(_id);
    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);
  },

  //=========== removeList() ===========
  removeList : function(_id) { 
    if (this.failIDs.length > 0) {
      if (this.failIDs.indexOf(_id) >= 0) {
        var removeIndex = this.failIDs.indexOf(_id);
        this.failIDs.splice(removeIndex, 1);
        this.clocks.splice(removeIndex, 1);
        this.clockSpeeds.splice(removeIndex, 1);

        for (var i = 0; i < modules.length; i++) {
          if (modules[i].id == _id) {
            modules[i].servoAngle = 0;
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
