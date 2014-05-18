function ExpLayer() {
  //=========== in-class variables ===========
  this.drawRise = true;
  this.drawFall = false;
  this.drawPulse = false;
  //this.drawRipple = false;

  this.rs = new Rise();
  this.fl = new Fall();
  this.pl = new Pulse();
  //this.rp = new Ripple();
}

ExpLayer.prototype = {
  //=========== loop() ===========
  loop : function() {
      this.pl.pulseIt();
      this.rs.riseIt();
      this.fl.fallIt();
     // this.rp.rippleIt();
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
    if (this.drawFall) {
      this.fl.addList(_id);
    }

    /*
    //-------- stop fail --------
    if (_key == 'G') {
      this.fl.removeList(_id);
    }
    */

    //-------- start ripple --------
    //if (this.drawRipple) {
    //  this.rp.addList(_id);
    //}

    /*
    //-------- stop ripple --------
    if (_key == 'G') {
      this.rp.removeList(_id);
    }
    */
  },


  //=========== changeDrawType() ===========
  changeDrawType : function(_value) {
    if (_value == "Rise"){
      this.drawRise = true;
      this.drawFall = false;
      this.drawPulse = false;
      this.drawRipple = false;
      console.log("Rise On");
    } else if (_value == "Fall") {
      this.drawRise = false;
      this.drawFall = true;
      this.drawPulse = false;
      this.drawRipple = false;
      console.log("Fail On");
    } else if (_value == "Pulse") {
      this.drawRise = false;
      this.drawFall = false;
      this.drawPulse = true;
      this.drawRipple = false;
      console.log("Pulse On");
    } else if (_value == "Ripple") {
      this.drawRise = false;
      this.drawFall = false;
      this.drawPulse = false;
      this.drawRipple = true;
      console.log("Ripple On");
    }
  },

  //=========== updateClock() ===========  
  updateClock : function() {
    this.pl.updateClock();
    this.rs.updateClock();
    this.fl.updateClock();
    //this.rp.updateClock();
  }
}
