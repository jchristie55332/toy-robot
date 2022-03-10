import { ToyRobot, CoordinateInvalidError, PlaceNotDefinedError, RobotGonnaFallError } from '../src-ts/toyRobot'
import { Command, PLACE_PREFIX } from '../src-ts/command'

describe('ToyRobot class', () => {
  describe('place method', () => {
    describe('when placing with a valid coordinate', () => {
      const commandPayload = '0,0,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)
      
      const toyRobot = new ToyRobot
      
      it('successfully sets the expected coordinates and orientation', () => {
        expect(toyRobot.place(command)).toBe('Place successful')
        expect(toyRobot.xCoordinate).toBe(0)
        expect(toyRobot.yCoordinate).toBe(0)
        expect(toyRobot.orientation).toBe('NORTH')
      })
    })

    describe('when placing with an invalid coordinate', () => {
      const commandPayload = 'NORTH,NORTH,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)

      const toyRobot = new ToyRobot

      function run() {
        toyRobot.place(command)
      }

      it('throws a CoordinateInvalidError', () => {

        expect(run).toThrowError(CoordinateInvalidError)
      })
    })

    describe('when placing with a negative coordinate', () => {
      const commandPayload = '-1,-1,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)

      const toyRobot = new ToyRobot

      function run() {
        toyRobot.place(command)
      }

      it('throws a CoordinateInvalidError', () => {

        expect(run).toThrowError(CoordinateInvalidError)
      })
    })

    describe('when placing with coordinates too large', () => {
      const commandPayload = '100,100,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)

      const toyRobot = new ToyRobot

      function run() {
        toyRobot.place(command)
      }

      it('throws a CoordinateInvalidError', () => {

        expect(run).toThrowError(CoordinateInvalidError)
      })
    })

    describe('when placing with an incorrect orientation', () => {
      const commandPayload = '1,1,UPSIDEDOWN'
      const command = new Command(PLACE_PREFIX, commandPayload)

      const toyRobot = new ToyRobot

      function run() {
        toyRobot.place(command)
      }

      it('throws a CoordinateInvalidError', () => {

        expect(run).toThrowError(CoordinateInvalidError)
      })
    })
  })

  describe('move method', () => {
    describe('the robot has not been placed yet!', () => {
      const toyRobot = new ToyRobot

      function run() {
        toyRobot.move()
      }

      it('throws a PlaceNotDefinedError', () => {

        expect(run).toThrowError(PlaceNotDefinedError)
      })
    })

    describe('the robot has been placed at origin facing north', () => {
      const commandPayload = '0,0,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)
      
      const toyRobot = new ToyRobot
      toyRobot.place(command)

      describe('a valid move is attempted', () => {
        it('allows the move to happen', () => {
          expect(toyRobot.move()).toBe('Move successful')
          expect(toyRobot.yCoordinate).toBe(1)
          expect(toyRobot.xCoordinate).toBe(0)
          expect(toyRobot.orientation).toBe('NORTH')
        })
      })
    })

    describe('the robot has been placed at origin facing south', () => {
      const commandPayload = '0,0,SOUTH'
      const command = new Command(PLACE_PREFIX, commandPayload)
      
      const toyRobot = new ToyRobot
      toyRobot.place(command)

      describe('an invalid move is attempted', () => {
        function run() {
          toyRobot.move()
        }

        it('prevents the move from happening', () => {
          expect(run).toThrowError(RobotGonnaFallError)

        })
      })
    })
  })

  describe('left method', () => {
    describe('the robot has not been placed yet!', () => {
      const toyRobot = new ToyRobot

      function run() {
        toyRobot.left()
      }

      it('throws a PlaceNotDefinedError', () => {

        expect(run).toThrowError(PlaceNotDefinedError)
      })
    })

    describe('the robot has been placed at origin facing north', () => {
      const commandPayload = '0,0,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)
      
      const toyRobot = new ToyRobot
      toyRobot.place(command)

      it('a rotation is attempted', () => {
        expect(toyRobot.left()).toBe('Left successful')
        expect(toyRobot.yCoordinate).toBe(0)
        expect(toyRobot.xCoordinate).toBe(0)
        expect(toyRobot.orientation).toBe('WEST')
      })
    })
  })

  describe('right method', () => {
    describe('the robot has not been placed yet!', () => {
      const toyRobot = new ToyRobot

      function run() {
        toyRobot.right()
      }

      it('throws a PlaceNotDefinedError', () => {

        expect(run).toThrowError(PlaceNotDefinedError)
      })
    })

    describe('the robot has been placed at origin facing north', () => {
      const commandPayload = '0,0,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)
      
      const toyRobot = new ToyRobot
      toyRobot.place(command)

      it('a rotation is attempted', () => {
        expect(toyRobot.right()).toBe('Right successful')
        expect(toyRobot.yCoordinate).toBe(0)
        expect(toyRobot.xCoordinate).toBe(0)
        expect(toyRobot.orientation).toBe('EAST')
      })
    })
  })

  describe('report method', () => {
    describe('the robot has not been placed yet!', () => {
      const toyRobot = new ToyRobot

      function run() {
        toyRobot.report()
      }

      it('throws a PlaceNotDefinedError', () => {

        expect(run).toThrowError(PlaceNotDefinedError)
      })
    })

    describe('the robot has been placed at origin facing north', () => {
      const commandPayload = '0,0,NORTH'
      const command = new Command(PLACE_PREFIX, commandPayload)
      
      const toyRobot = new ToyRobot
      toyRobot.place(command)

      describe('a valid move is attempted', () => {
        it('and a report of position is requested', () => {
          expect(toyRobot.report()).toBe('Reporting.....0,0,NORTH')
        })
      })
    })
  })
});