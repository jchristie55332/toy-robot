import inputValidator, { CommandInvalidError } from '../src-ts/inputValidator'
import { Command } from '../src-ts/command'

describe('inputValidator', () => {
  const inputCommand = 'helloworld'

  function run() {
    inputValidator(inputCommand);
  }

  it('raises a CommandInvalidError when the command is not in the expected format', () => {
    expect(run).toThrowError(CommandInvalidError)
  });

  it('returns an instance of Command class when the command is valid', () => {
    const inputCommand = 'PLACE 0,0,NORTH'

    expect(inputValidator(inputCommand)).toBeInstanceOf(Command)
  });
});