function Ripple() {
  //=========== in-class variables ===========
  this.servoMax = 180;
  this.rippleChildren = []; //array in array
  this.stepCounts = [];
  this.nextStepTiming = [];
  this.childrenLifespans = [];
  this.baseIDs = [];
  this.lastStepIDs = []; //array in array
  this.pastStepIDs = []; //array in array
  this.clocks = [];
  this.clockSpeeds = [];
}

Ripple.prototype = {
  //=========== rippleIt() ===========  
  rippleIt : function() {
    for (var i = 0; i < this.rippleChildren.length; i++){
      for (var j = 0; j < this.rippleChildren[i].length; j++){
        this.rippleChildren[i][j].rippleChildIt();

        console.log(i+1, 'Ripple off');
        sendmessage({id: i+1, mode: 'Ripple', value: false});
        $.get("/output/" + (i+1) + "H" );
      }
    }

  },

  //=========== addList() ===========
  addList : function(_id) {
    this.rippleChildren.push(new Array());
    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);
    this.stepCounts.push(0);
    this.nextStepTiming.push(5);
    this.childrenLifespans.push(5);
    this.baseIDs.push(_id);
    this.lastStepIDs.push(new Array());
    this.pastStepIDs.push(new Array());

    //add new a ripple child
    this.rippleChildren[this.rippleChildren.length - 1].push(new RippleChild(_id, this.lastStepIDs[this.rippleChildren.length - 1], this.pastStepIDs[this.rippleChildren.length - 1]));
    this.lastStepIDs[this.rippleChildren.length - 1].push(_id);
    this.pastStepIDs[this.rippleChildren.length - 1].push(_id);

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
      if (this.clocks[i] > this.nextStepTiming[i]){
        this.clock[i] = 0;
        //generate a next ripple children
        this.rippleChildren[i].push(new RippleChild(this.baseIDs[i], this.lastStepIDs[i], this.pastStepIDs[i]));
      }
    }
  }
}
