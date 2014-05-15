function Module(_polyN, _r, _lx, _ly, _id) {
  //=========== in-class variables ===========
  this.polyN = _polyN;
  this.servoMax = 180;

  this.location = new PVector(_lx, _ly);
  this.radius = _r;
  this.body = new MShape(this.polyN, this.radius);
  this.moduleWidth = 2*this.radius*sin((PI - (2*PI/this.polyN))/2); //constant
  this.moduleSide = 2*this.radius*sin(PI/this.polyN); //constant


  this.id = _id; //this ID data
  this.neighbor_ids = [0, 0, 0, 0, 0, 0];  //neiborhood's ID data

  this.servoAngle = this.servoMax/2;
  this.h = 0, this.s = 255, this.v = 255;  //color
}

Module.prototype = {

  //=========== display() ===========
  display : function() {
    pushMatrix();
    translate(this.location.x, this.location.y);

    this.s = map(this.servoAngle, 0, this.servoMax, 0, 255);    
    var fillColors = this.hsv2rgb(this.h, this.s, this.v);
    fill(fillColors.r, fillColors.g, fillColors.b);
    
    this.body.display();
    fill(0);
    text(this.id, 0, 0);
    
    popMatrix();
  },

  //=========== setMyNeighbors() ===========
  setMyNeighbors : function() {
    for (var i = 0; i < modules.length; i++) {
      var error = 2;
      
      if (((modules[i].location.x - this.location.x > this.moduleWidth/2 - error) &&
           (modules[i].location.x - this.location.x < this.moduleWidth/2 + error))
       && ((modules[i].location.y - this.location.y > -(this.radius + this.moduleSide/2) - error) &&
           (modules[i].location.y - this.location.y < -(this.radius + this.moduleSide/2) + error))) {
        this.neighbor_ids[0] = modules[i].id;        
      }
      
      
      if (((modules[i].location.x - this.location.x > this.moduleWidth - error) &&
           (modules[i].location.x - this.location.x < this.moduleWidth + error))
       && ((modules[i].location.y - this.location.y > -error) &&
           (modules[i].location.y - this.location.y < error))) {
        this.neighbor_ids[1] = modules[i].id;        
      }
      
      if (((modules[i].location.x - this.location.x > this.moduleWidth/2 - error) &&
           (modules[i].location.x - this.location.x < this.moduleWidth/2 + error))
       && ((modules[i].location.y - this.location.y > this.radius + this.moduleSide/2 - error) &&
           (modules[i].location.y - this.location.y < this.radius + this.moduleSide/2 + error))) {
        this.neighbor_ids[2] = modules[i].id;        
      }
      
      if (((modules[i].location.x - this.location.x > -this.moduleWidth/2 - error) &&
           (modules[i].location.x - this.location.x < -this.moduleWidth/2 + error))
       && ((modules[i].location.y - this.location.y > this.radius + this.moduleSide/2 - error) &&
           (modules[i].location.y - this.location.y < this.radius + this.moduleSide/2 + error))) {
        this.neighbor_ids[3] = modules[i].id;        
      }
      
      if (((modules[i].location.x - this.location.x > -this.moduleWidth - error) &&
           (modules[i].location.x - this.location.x < -this.moduleWidth + error))
       && ((modules[i].location.y - this.location.y > -error) &&
           (modules[i].location.y - this.location.y < error))) {
        this.neighbor_ids[4] = modules[i].id;
        
      }
      if (((modules[i].location.x - this.location.x > -this.moduleWidth/2 - error) &&
           (modules[i].location.x - this.location.x < -this.moduleWidth/2 + error))
       && ((modules[i].location.y - this.location.y > -(this.radius + this.moduleSide/2) - error) &&
           (modules[i].location.y - this.location.y < -(this.radius + this.moduleSide/2) + error))) {
        this.neighbor_ids[5] = modules[i].id;
      }
    }
  },
  
  //=========== showState() ===========
  showState : function() {
    console.log("myID: " + this.id + " myNeighbors: ");
    for(var i = 0; i < this.neighbor_ids.length; i++){
      console.log(this.neighbor_ids[i] + " ");      
    }
    console.log();
  },

  //=========== hsv2rgb() ===========
  hsv2rgb : function(h, s, v) {
    var r, g, b; // 0~255
    
    while (h < 0) {
      h += 360;
    }

    h = h % 360;

    // special case: saturation = 0
    if (s == 0) {
      // → each value of rgb equals to v
      v = Math.round(v);
      return {'r': v, 'g': v, 'b': v};
    }

    s = s / 255;

    var i = Math.floor(h / 60) % 6,
        f = (h / 60) - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s);

    switch (i) {
      case 0 :
        r = v;  g = t;  b = p;  break;
      case 1 :
        r = q;  g = v;  b = p;  break;
      case 2 :
        r = p;  g = v;  b = t;  break;
      case 3 :
        r = p;  g = q;  b = v;  break;
      case 4 :
        r = t;  g = p;  b = v;  break;
      case 5 :
        r = v;  g = p;  b = q;  break;
    }

    return {'r': Math.round(r), 'g': Math.round(g), 'b': Math.round(b)};
  }
}
