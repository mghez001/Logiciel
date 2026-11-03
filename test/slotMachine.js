export function slotMachine(bet, result) {
  if (result[1] === result[2]) return bet * 2;
  return 0;
}