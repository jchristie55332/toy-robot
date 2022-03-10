import { ALLOWED_PREFIXES, Command } from './command'

export class CommandInvalidError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default function (command: string): Command {
  const [commandType, commandPayload] = command.split(' ');

  if(!ALLOWED_PREFIXES.includes(commandType)){
    throw new CommandInvalidError('The command you supplied is invalid');
  }

  return new Command(commandType, commandPayload)
}
