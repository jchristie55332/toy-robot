export const PLACE_PREFIX = 'PLACE'
export const MOVE_PREFIX = 'MOVE'
export const LEFT_PREFIX = 'LEFT'
export const RIGHT_PREFIX = 'RIGHT'
export const REPORT_PREFIX = 'REPORT'

export const ALLOWED_PREFIXES = [
  PLACE_PREFIX,
  MOVE_PREFIX,
  LEFT_PREFIX,
  RIGHT_PREFIX,
  REPORT_PREFIX
]

export class Command {
  commandType: string;
  commandPayload: string;

  constructor(commandType: string, commandPayload: string) {
    this.commandType = commandType;
    this.commandPayload = commandPayload;
  }
}
