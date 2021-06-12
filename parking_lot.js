class ParkingLot {

  constructor() {
    this.head = null
    this.unAllocated = []
    this.allocated = []
    this.capacity = 0
  }

  async create_parking_lot(capacity) {
    if (capacity.length != 1 || isNaN(capacity) || capacity < 1) {
      return `Invalid parameters please double check your input or type help`
    }
    
    this.capacity = capacity[0]
    this.head = null
    this.unAllocated = []
    this.allocated = []
    let slot = 1
    
    while (slot <= this.capacity) {
      this.unAllocated.push(slot)
      slot++
    }
    return `Created parking lot with ${this.capacity} slots`
  }

  async park(car) {
    if (car.length != 2) {
      return `Invalid parameters please double check your input or type help`
    }

    if (this.capacity < 1) {
      return `You haven't initiate your parking lot capacity! please type "create_parking_lot <number>" to initiate your parking lot!`
    }

    if (this.capacity == this.allocated.length) {
      return `Sorry, parking lot is full`
    }

    const slot = this.unAllocated[0]
    this.allocated.splice(slot - 1, 0, {
      slot: slot,
      registrationNumber: car[0],
      color: car[1],
    })
    this.unAllocated.shift()
    return `Allocated slot number: ${slot}`
  }

  async leave(car) {
    if (car.length != 2 || isNaN(car[1])) {
      return `Invalid parameters please double check your input or type help`
    }

    if (this.capacity < 1) {
      return `You haven't initiate your parking lot capacity! please type "create_parking_lot <number>" to initiate your parking lot!`
    }

    const [slotToFree, slotNumber] = await this.searchCar(car[0])
    if (slotNumber == 0) {
      return `Registration number ${car[0]} not found`
    }

    this.allocated.splice(slotToFree, 1)
    this.unAllocated.push(slotNumber)
    this.unAllocated.sort()
    const charge = await this.charge(car[1])
    return `Registration number ${car[0]} with Slot Number ${slotNumber} is free with Charge ${charge}`
  }

  async status() {
    if (this.capacity < 1) {
      return `You haven't initiate your parking lot capacity! please type "create_parking_lot <number>" to initiate your parking lot!`
    }

    let status = `Slot No.\tRegistration No.\tColor\n`
    this.allocated.map(async (car) => {
      status = status + `${car.slot}\t${car.registrationNumber}\t${car.color}\n`
    })
    return status
  }

  async help() {
    return `Hi, welcome to Parking Lot Application. Here are commands that you can use to manage your parking lot.\n\t1. "create_parking_lot <number>" To create your parking lot capacity\n\t2. "park <Registration Number> <Color>" To add car in parking lot\n\t3. "leave <Registration Number> <Parking Time>" to release slot and get bills\n\t4. "status" View  all car in parking lot`
  }

  async charge(hours) {
    return hours <= 2 ? 10 : (hours - 2) * 10 + 10
  }

  async searchCar(registrationNumber) {
    let slotToFree = 0
    let slotNumber = 0
    this.allocated.map(async (car, slot) => {
      if (registrationNumber == car.registrationNumber) {
        slotToFree = slot
        slotNumber = car.slot
      }
    })
    return [slotToFree, slotNumber]
  }
}

module.exports = ParkingLot
