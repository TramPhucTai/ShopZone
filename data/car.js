class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  trunkInfo = 'closed';

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  };

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, The trunk is ${this.trunkInfo}`);
  }

  go() {
    if (this.speed < 200 && this.isTrunkOpen === false) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (!this.isTrunkOpen && this.speed === 0) {
      this.trunkInfo = 'opened';
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    if (this.isTrunkOpen) {
      this.trunkInfo = 'closed';
      this.isTrunkOpen = false;
    }
  }
}

class RaceCar extends Car {
  acceleration = 20;

  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`);
  }

  go() {
    if (this.speed < 300) {
      this.speed += this.acceleration;
    }
  }

  openTrunk() {

  }

  closeTrunk() {

  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');
const racecar1 = new RaceCar('McLaren', 'F1', 20)

car1.go();

car1.displayInfo();

racecar1.displayInfo();

car1.displayInfo();




