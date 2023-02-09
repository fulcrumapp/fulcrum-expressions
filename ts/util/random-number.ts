declare global {
  interface Window {
    msCrypto?: any;
  }
}

const CRYPTO = window.crypto || window.msCrypto; // for IE11;

const RandomNumber = (int: number) => {
  const numberArray = CRYPTO.getRandomValues(new Uint32Array(int));
  return numberArray[0] * Math.pow(2, -32);
};

export default RandomNumber;
