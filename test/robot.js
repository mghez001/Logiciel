const COMMANDS = { "0X123": "moveForward"};

export function parse(stream) {
  return [COMMANDS[stream]];
}