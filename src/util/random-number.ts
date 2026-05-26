const RandomNumber = (int: number) => {
  const g = globalThis as any
  const crypto = g.crypto ?? g.msCrypto
  if (crypto?.getRandomValues) {
    const numberArray = crypto.getRandomValues(new Uint32Array(int));
    return numberArray[0] * Math.pow(2, -32);
  }
  return Math.random();
};

export default RandomNumber;
