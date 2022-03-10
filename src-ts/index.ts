import inputValidator from './inputValidator'
import { ToyRobot } from './toyRobot'

// some welcome messages
// just to set the mood
console.log('Welcome to Toy Robot!')
console.log('Please begin')

// create an instance of ToyRobot class
const toyRobotInstance = new ToyRobot()

// open an event listener
// and begin
process.openStdin().addListener("data", function(d) {
  try {
    // we initally validate the command
    const command = inputValidator(d.toString().trim())
    // and then act on it
    // assuming its valid
    const commandOutput = toyRobotInstance.actOnCommand(command)
    console.log(commandOutput)

  } catch (error) {
    // if there is an execution error
    // then we can report it back
    console.log(error.message)
  }
});