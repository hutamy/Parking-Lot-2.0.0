const commandReader = require("readline")
const ParkingLot = require("./parking_lot")

const app = async () => {
  const cmd = commandReader.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  console.log(`Welcome to parking lot system! Type "help" to list all of command`)
  
  const parking_lot = new ParkingLot()
  cmd.on("line", async (input) => {

    const inputList = input.split(" ")
    const value = inputList.splice(1, inputList.length)
    const command = inputList[0]

    try {
      const res = value.length == 0 ? await parking_lot[command]() : await parking_lot[command](value)
      console.log(res)
    } catch (err) {
      console.log(`Command not found! Please type "help" to list all of commands`)
    }
  })
}

app()
