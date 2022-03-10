import { PLACE_PREFIX, MOVE_PREFIX, LEFT_PREFIX, RIGHT_PREFIX, REPORT_PREFIX, Command } from './command'

const MAX_BOARD_SIZE = 5
const NORTH_ORIENTATION = 'NORTH'
const SOUTH_ORIENTATION = 'SOUTH'
const EAST_ORIENTATION = 'EAST'
const WEST_ORIENTATION = 'WEST'
const ALLOWED_ORIENTATIONS = [
  NORTH_ORIENTATION,
  SOUTH_ORIENTATION,
  EAST_ORIENTATION,
  WEST_ORIENTATION
]

export class CoordinateInvalidError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class PlaceNotDefinedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class RobotGonnaFallError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ToyRobot {
  xCoordinate: number;
  yCoordinate: number;
  orientation: string;

  actOnCommand(
    command: Command,
  ): boolean {
    switch(command.commandType) {
      case(PLACE_PREFIX): 
        this.place(command)
        break;
      case(MOVE_PREFIX): 
        this.move()
        break;
      case(LEFT_PREFIX): 
        this.left()
        break;
      case(RIGHT_PREFIX): 
        this.right()
        break;
      case(REPORT_PREFIX): 
        this.report()
        break;
    }

    return true
  }

  place(command: Command): string {
    const [xCoordinate, yCoordinate, orientation] = command.commandPayload.split(',')

    const xCoordinateParsed = Number(xCoordinate)
    const yCoordinateParsed = Number(yCoordinate)

    if(isNaN(xCoordinateParsed) || isNaN(yCoordinateParsed)) {
      throw new CoordinateInvalidError('The supplied coordinates are invalid')
    }

    if(xCoordinateParsed > MAX_BOARD_SIZE || yCoordinateParsed > MAX_BOARD_SIZE) {
      throw new CoordinateInvalidError('The supplied coordinates are too large')
    }

    if(xCoordinateParsed < 0 || yCoordinateParsed < 0) {
      throw new CoordinateInvalidError('The supplied coordinates are too small')
    }

    if(!ALLOWED_ORIENTATIONS.includes(orientation)) {
      throw new CoordinateInvalidError('The supplied orientation is invalid')
    }

    this.xCoordinate = xCoordinateParsed
    this.yCoordinate = yCoordinateParsed
    this.orientation = orientation

    return 'Place successful'
  }

  move(): string {
    if(isNaN(this.xCoordinate) || isNaN(this.yCoordinate)) {
      throw new PlaceNotDefinedError('The Robot has not been placed yet!')
    }

    switch(this.orientation) {
      case(NORTH_ORIENTATION):
        if(this.yCoordinate >= MAX_BOARD_SIZE) {
          throw new RobotGonnaFallError('The Robot will fall with this move.  Ignored!')
        }

        this.yCoordinate += 1
        break;
      case(SOUTH_ORIENTATION):
        if(this.yCoordinate <= 0) {
          throw new RobotGonnaFallError('The Robot will fall with this move.  Ignored!')
        }

        this.yCoordinate -= 1
        break;
      case(EAST_ORIENTATION):
        if(this.xCoordinate >= MAX_BOARD_SIZE) {
          throw new RobotGonnaFallError('The Robot will fall with this move.  Ignored!')
        }

        this.xCoordinate += 1
        break;
      case(WEST_ORIENTATION):
        if(this.xCoordinate <= 0) {
          throw new RobotGonnaFallError('The Robot will fall with this move.  Ignored!')
        }

        this.xCoordinate -= 1
        break;
    }

    return 'Move successful'
  }

  left(): string {
    if(isNaN(this.xCoordinate) || isNaN(this.yCoordinate)) {
      throw new PlaceNotDefinedError('The Robot has not been placed yet!')
    }

    switch(this.orientation) {
      case(NORTH_ORIENTATION):
        this.orientation = WEST_ORIENTATION
        break;
      case(SOUTH_ORIENTATION):
        this.orientation = EAST_ORIENTATION
        break;
      case(EAST_ORIENTATION):
        this.orientation = NORTH_ORIENTATION
        break;
      case(WEST_ORIENTATION):
        this.orientation = SOUTH_ORIENTATION
        break;
    }

    return 'Left successful'
  }

  right(): string {
    if(isNaN(this.xCoordinate) || isNaN(this.yCoordinate)) {
      throw new PlaceNotDefinedError('The Robot has not been placed yet!')
    }

    switch(this.orientation) {
      case(NORTH_ORIENTATION):
        this.orientation = EAST_ORIENTATION
        break;
      case(SOUTH_ORIENTATION):
        this.orientation = WEST_ORIENTATION
        break;
      case(EAST_ORIENTATION):
        this.orientation = SOUTH_ORIENTATION
        break;
      case(WEST_ORIENTATION):
        this.orientation = NORTH_ORIENTATION
        break;
    }

    return 'Right successful'
  }

  report(): string {
    if(isNaN(this.xCoordinate) || isNaN(this.yCoordinate)) {
      throw new PlaceNotDefinedError('The Robot has not been placed yet!')
    }

    return `Reporting.....${this.xCoordinate},${this.yCoordinate},${this.orientation}`
  }
}