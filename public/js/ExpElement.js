class ExpElement {
  //=========== in-class variables ===========
  float servoMax = 180;
  ArrayList<Float> clocks;
  ArrayList<Float> clockSpeeds;

  //=========== constructor ===========
  ExpElement() {
    clocks = new ArrayList<Float>();
    clockSpeeds = new ArrayList<Float>();

  }


  //=========== updateClock() ===========  
  void updateClock() {
    for (int i = 0; i < clocks.size(); i++){
      float clock = clocks.get(i);
      float clockSpeed = clockSpeeds.get(i);
      clock += clockSpeed;
      
      clocks.set(i, clock);
    }
  }
}