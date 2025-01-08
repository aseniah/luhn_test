import { generateCheckCharacter, validateCheckCharacter } from './utils/luhnFunctions';

interface TestResult {
  testValue: string;
  isValid: boolean;
  baseValue: string;
  luhnChar: string;
  validValue: string;
}

// Test
const testValues = ['250107Z05100017', '250107Z05100026', '250107Z05100035', '250107Z05100044', '250107Z05100053'];
const testResults: Array<TestResult> = [];
testValues.forEach((testValue) => {
  const isValid = validateCheckCharacter(testValue, 'alpha-numeric');
  const baseValue = testValue.substring(0, testValue.length - 1);
  const luhnChar = generateCheckCharacter(baseValue, 'alpha-numeric');
  const validValue = baseValue + luhnChar;
  const testResult: TestResult = { testValue, isValid, baseValue, luhnChar, validValue };
  testResults.push(testResult);
});

// Output console formatted
console.log('testValue'.padEnd(16), 'isValid'.padEnd(8), 'baseValue'.padEnd(15), 'luhnChar'.padEnd(9), 'validValue');
testResults.forEach((testResult) => {
  console.log(
    testResult.testValue.padEnd(16),
    testResult.isValid.toString().padEnd(8),
    testResult.baseValue.padEnd(15),
    testResult.luhnChar.padEnd(9),
    testResult.validValue,
  );
});
