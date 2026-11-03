const COMMANDS = { "0X123": "moveForward", "0X789": "moveBackward", "0XABC": "stop"};

export function parse(stream) {
  return [COMMANDS[stream]];
}