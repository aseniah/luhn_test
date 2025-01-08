export type LuhnType = 'numeric' | 'hex' | 'alpha-numeric';

const getChars = (type: LuhnType): string => {
  const availableChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  switch (type) {
    case 'numeric':
      return availableChars.substring(0, 10);
    case 'hex':
      return availableChars.substring(0, 16);
    default:
      return availableChars;
  }
};

const getSum = (input: string, factor: 1 | 2, chars: string): number => {
  // Double every even position value, right to left
  const num = chars.length;
  let sum = 0;
  for (let i = input.length - 1; i >= 0; i--) {
    const charLocation = chars.indexOf(input[i]);
    const factored = charLocation * factor;

    // Sum the digits of factored
    const summmed = Math.floor(factored / num) + (factored % num);
    sum += summmed;

    // Alternate factor for next round
    factor = factor === 2 ? 1 : 2;
  }
  return sum;
};

const validateInput = (input: string, chars: string) => {
  if (!input.split('').every((c) => chars.includes(c))) {
    // Error
    const message = `Error unexpected characters in ${input}`;
    console.log(message);
    throw new Error(message);
  }
};

export const generateCheckCharacter = (input: string, type: LuhnType): string => {
  // Set up
  const chars = getChars(type);
  const num = chars.length;

  // Validate input
  validateInput(input, chars);

  // Get algorithm sum, factor 2 because no check char
  const sum = getSum(input, 2, chars);

  // Calculate the number that must be appended to the "sum" to make it divisible by "num".
  let remainder = sum % num;
  let checkCodePoint = (num - remainder) % num;
  return chars.charAt(checkCodePoint);
};

export const validateCheckCharacter = (input: string, type: LuhnType): boolean => {
  // Set up
  const chars = getChars(type);
  const num = chars.length;

  // Validate input
  validateInput(input, chars);

  // Get algorithm sum, factor 1 because includes check char
  const sum = getSum(input, 1, chars);

  // Validate luhn
  let remainder = sum % num;
  return remainder === 0;
};
