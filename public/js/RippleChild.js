function RippleChild(_baseID, _lastStepIDs, _pastStepIDs) {
  //=========== in-class variables ===========
  this.servoMax = 180;
  this.rippleIDs = [];
  this.clocks = [];
  this.clockSpeeds = [];

  this.setRippleIDs(_baseID, _lastStepIDs, _pastStepIDs);
}

RippleChild.prototype = {

  //=========== rippleChildIt() ===========  
  rippleChildIt : function() {

    for (var i = 0; i < modules.length; i++) {
      if (this.rippleIDs.indexOf(modules[i].id) >= 0) {
          modules[i].servoAngle = this.servoMax; // 0 ~ servoMax
      }

    }
  },

  //=========== setRippleIDs() ===========
  setRippleIDs : function(_baseID, _lastStepIDs, _pastStepIDs) {
    var temp_rippleIDs = [];
    //add the modules around the modules that were turned on at last step
    for (var i = 0; i < _lastStepIDs.length; i++){
      for (var j = 0; j < modules.length; j++){
        if(_lastStepIDs[i] == modules[j].id){
          for(var k = 0; k < modules[j].neighbor_ids.length; k++){
            if (modules[j].neighbor_ids[k] != 0){
              temp_rippleIDs.push(modules[j].neighbor_ids[k]);
            }
          }
        }
      }
    }

    //remove the modules that have been turned on in the past from the array
    for (var i = 0; i < _pastStepIDs.length; i++){
      for (var j = temp_rippleIDs.length-1; j >= 0; j--){
        if (_pastStepIDs[i] == temp_rippleIDs[j]){
          temp_rippleIDs.splice(j,1);
        }
      }
    }

    console.log(temp_rippleIDs);
    this.rippleIDs = temp_rippleIDs;

    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);


    for (var i = 0; i < this.rippleIDs.length; i++){
      for (var j = 0; j < modules.length; j++) {
        if (modules[j].id == _id) {
          modules[j].rippleOn = true;
        }
      }
    }
  },

  //=========== addList() ===========
  addList : function(_id) {
    this.rippleIDs.push(_id);
    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);
    this.lifespans.push(18);

    for (var i = 0; i < modules.length; i++) {
      if (modules[i].id == _id) {
         modules[i].rippleOn = true;
      }
    }
  },

  //=========== removeList() ===========
  removeList : function(_id) {
    if (this.rippleIDs.length > 0) {
      if (this.rippleIDs.indexOf(_id) >= 0) {
        var removeIndex = this.rippleIDs.indexOf(_id);
        this.rippleIDs.splice(removeIndex, 1);
        this.clocks.splice(removeIndex, 1);
        this.clockSpeeds.splice(removeIndex, 1);
        this.lifespans.splice(removeIndex, 1);

        for (var i = 0; i < modules.length; i++) {
          if (modules[i].id == _id) {
            modules[i].servoAngle = this.servoMax/2;
            modules[i].rippleOn = false;
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
