declare global {
  interface Window {
    msCrypto?: any;
  }
}

// Node.js compatible crypto for random numbers
const getCrypto = () => {
  if (typeof window !== 'undefined') {
    return window.crypto || (window as any).msCrypto; // for IE11
  } else if (typeof global !== 'undefined' && (global as any).crypto) {
    return (global as any).crypto;
  } else {
    // Fallback for Node.js
    try {
      return require('crypto').webcrypto || require('crypto');
    } catch (e) {
      // Ultimate fallback using Math.random
      return {
        getRandomValues: (array: Uint32Array) => {
          for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 0x100000000);
          }
          return array;
        }
      };
    }
  }
};

const CRYPTO = getCrypto();

const RandomNumber = (int: number) => {
  const numberArray = CRYPTO.getRandomValues(new Uint32Array(int));
  return numberArray[0] * Math.pow(2, -32);
};

export default RandomNumber;
