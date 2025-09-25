import { generateCheckCharacter, validateCheckCharacter } from './utils/luhnFunctions';

interface TestResult {
  testValue: string;
  isValid: boolean;
  baseValue: string;
  luhnChar: string;
  validValue: string;
}

// Test
const testValues = [
  '250107Z05100017',
  '250107Z05100026',
  '250107Z05100035',
  '250107Z05100044',
  '250107Z05100053',
  '250109Z0510001W',
  '250109Z0510002U',
  '250109Z0510003S',
  '250109Z0510004Q',
  '250109Z0510005O',
];
const testResults: Array<TestResult> = [];
testValues.forEach((testValue) => {
  const isValid = validateCheckCharacter(testValue, 'alpha-numeric');
  const baseValue = testValue.substring(0, testValue.length - 1);
  const luhnChar = generateCheckCharacter(baseValue, 'alpha-numeric');
  const validValue = baseValue + luhnChar;
  const testResult: TestResult = { testValue, isValid, baseValue, luhnChar, validValue };
  testResults.push(testResult);
});

// Calculate dynamic column widths
const maxTestValueLength = Math.max('testValue'.length, ...testResults.map((r) => r.testValue.length));
const maxIsValidLength = Math.max('isValid'.length, ...testResults.map((r) => r.isValid.toString().length));
const maxBaseValueLength = Math.max('baseValue'.length, ...testResults.map((r) => r.baseValue.length));
const maxLuhnCharLength = Math.max('luhnChar'.length, ...testResults.map((r) => r.luhnChar.length));

// Output console formatted with dynamic spacing
console.log(
  'testValue'.padEnd(maxTestValueLength + 2),
  'isValid'.padEnd(maxIsValidLength + 2),
  'baseValue'.padEnd(maxBaseValueLength + 2),
  'luhnChar'.padEnd(maxLuhnCharLength + 2),
  'validValue',
);
testResults.forEach((testResult) => {
  console.log(
    testResult.testValue.padEnd(maxTestValueLength + 2),
    testResult.isValid.toString().padEnd(maxIsValidLength + 2),
    testResult.baseValue.padEnd(maxBaseValueLength + 2),
    testResult.luhnChar.padEnd(maxLuhnCharLength + 2),
    testResult.validValue,
  );
});
