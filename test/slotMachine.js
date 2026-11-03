export function slotMachine(bet, result) {
  if (result[0] === result[1]) return bet * 2;
  return 0;
}