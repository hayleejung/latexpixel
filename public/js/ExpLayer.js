function ExpLayer() {
  //=========== in-class variables ===========
  this.drawRise = true;
  this.drawFail = false;
  this.drawPulse = false;

  this.rs = new Rise();
  this.fl = new Fail();
  this.pl = new Pulse();
}

ExpLayer.prototype = {
  //=========== loop() ===========
  loop : function() {
      this.pl.pulseIt();
      this.rs.riseIt();
      this.fl.failIt();
  },

  //=========== expressHandler() ===========
  expressHandler : function(_id) {    
    //-------- start pulse --------
    if (this.drawPulse) {
      this.pl.addList(_id);
    }
    
    /*
    //-------- stop pulse --------
    if (_key == 'O') {
      this.pl.removeList(_id);
    }
    */

    //-------- start rise --------
    if (this.drawRise) {
      this.rs.addList(_id);
    }

    /*
    //-------- stop rise --------
    if (_key == 'T') {
      this.rs.removeList(_id);
    }
    */

    //-------- start fail --------
    if (this.drawFail) {
      this.fl.addList(_id);
    }

    /*
    //-------- stop fail --------
    if (_key == 'G') {
      this.fl.removeList(_id);
    }
    */
  },

  /*
  //=========== keyHandler() ===========
  keyHandler : function(_key, _id) {    
    //-------- start pulse --------
    if (_key == 'P') {
      this.pl.addList(_id);
    }

    //-------- stop pulse --------
    if (_key == 'O') {
      this.pl.removeList(_id);
    }

    //-------- start rise --------
    if (_key == 'R') {
      this.rs.addList(_id);
    }

    //-------- stop rise --------
    if (_key == 'T') {
      this.rs.removeList(_id);
    }

    //-------- start fail --------
    if (_key == 'F') {
      this.fl.addList(_id);
    }

    //-------- stop fail --------
    if (_key == 'G') {
      this.fl.removeList(_id);
    }
  },
  */

  //=========== changeDrawType() ===========
  changeDrawType : function(_value) {
    if (_value == "Rise"){
      this.drawRise = true;
      this.drawFail = false;
      this.drawPulse = false;
      console.log("Rise On");
    } else if (_value == "Fail") {
      this.drawRise = false;
      this.drawFail = true;
      this.drawPulse = false;
      console.log("Fail On");
    } else if (_value == "Pulse") {
      this.drawRise = false;
      this.drawFail = false;
      this.drawPulse = true;
      console.log("Pulse On");
    }
  },

  //=========== updateClock() ===========  
  updateClock : function() {
    this.pl.updateClock();
    this.rs.updateClock();
    this.fl.updateClock();
  }
}
