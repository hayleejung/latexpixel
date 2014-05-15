function ExpManager() {
  //=========== in-class variables ===========
  this.eLayers = [];
  this.eLayers.push(new ExpLayer());
}

ExpManager.prototype = {

  //=========== loop() ===========  
  loop : function() {
        
    for (var i = 0; i < this.eLayers.length; i++) {
      this.eLayers[i].loop();
    }

    for (var i = 0; i < this.eLayers.length; i++) {
      this.eLayers[i].updateClock();
    }  

  },
  
  //=========== expressHandler() ===========
  expressHandler : function(_id) {
    // this instruction should be sent to only selected expression
    for (var i = 0; i < this.eLayers.length; i++) {
      this.eLayers[i].expressHandler(_id);
    }
  },

  /*
  //=========== keyHandler() ===========
  keyHandler : function(_key, _id) {
    // this instruction should be sent to only selected expression
    for (var i = 0; i < this.eLayers.length; i++) {
      this.eLayers[i].keyHandler(_key, _id);
    }
  },
  */

  //=========== changeDrawType() ===========
  changeDrawType : function(_value) {
    for (var i = 0; i < this.eLayers.length; i++) {
      this.eLayers[i].changeDrawType(_value);
    }

  }

}