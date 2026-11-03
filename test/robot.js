const COMMANDS = { "0X123": "moveForward", "0X789": "moveBackward" };

export function parse(stream) {
  return [COMMANDS[stream]];
}