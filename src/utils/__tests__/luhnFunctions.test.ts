import { generateCheckCharacter, validateCheckCharacter } from '../luhnFunctions';

describe('Luhn Functions', () => {
  describe('generateCheckCharacter', () => {
    describe('numeric mode', () => {
      it('should generate correct check character for numeric input', () => {
        expect(generateCheckCharacter('7992739871', 'numeric')).toBe('3');
        expect(generateCheckCharacter('123456789', 'numeric')).toBe('7');
        expect(generateCheckCharacter('000000000', 'numeric')).toBe('0');
      });

      it('should handle single digit', () => {
        expect(generateCheckCharacter('0', 'numeric')).toBe('0');
        expect(generateCheckCharacter('5', 'numeric')).toBe('9');
      });
    });

    describe('hex mode', () => {
      it('should generate correct check character for hex input', () => {
        expect(generateCheckCharacter('ABCDEF', 'hex')).toBe('B');
        expect(generateCheckCharacter('123ABC', 'hex')).toBe('F');
      });
    });

    describe('alpha-numeric mode', () => {
      it('should generate correct check character for alpha-numeric input', () => {
        // Test cases verified from actual algorithm output
        expect(generateCheckCharacter('250107Z0510001', 'alpha-numeric')).toBe('0');
        expect(generateCheckCharacter('250107Z0510002', 'alpha-numeric')).toBe('Y');
        expect(generateCheckCharacter('250107Z0510003', 'alpha-numeric')).toBe('W');
        expect(generateCheckCharacter('250107Z0510004', 'alpha-numeric')).toBe('U');
        expect(generateCheckCharacter('250107Z0510005', 'alpha-numeric')).toBe('S');
        expect(generateCheckCharacter('250109Z0510001', 'alpha-numeric')).toBe('W');
        expect(generateCheckCharacter('250109Z0510002', 'alpha-numeric')).toBe('U');
        expect(generateCheckCharacter('250109Z0510003', 'alpha-numeric')).toBe('S');
        expect(generateCheckCharacter('250109Z0510004', 'alpha-numeric')).toBe('Q');
        expect(generateCheckCharacter('250109Z0510005', 'alpha-numeric')).toBe('O');
      });
    });

    describe('error handling', () => {
      it('should throw error for invalid characters in numeric mode', () => {
        expect(() => generateCheckCharacter('123A', 'numeric')).toThrow('Error unexpected characters in 123A');
      });

      it('should throw error for invalid characters in hex mode', () => {
        expect(() => generateCheckCharacter('123G', 'hex')).toThrow('Error unexpected characters in 123G');
      });

      it('should throw error for lowercase in alpha-numeric mode', () => {
        expect(() => generateCheckCharacter('abc', 'alpha-numeric')).toThrow('Error unexpected characters in abc');
      });
    });
  });

  describe('validateCheckCharacter', () => {
    describe('numeric mode', () => {
      it('should validate correct numeric values', () => {
        expect(validateCheckCharacter('79927398713', 'numeric')).toBe(true);
        expect(validateCheckCharacter('1234567897', 'numeric')).toBe(true);
        expect(validateCheckCharacter('0000000000', 'numeric')).toBe(true);
      });

      it('should reject incorrect numeric values', () => {
        expect(validateCheckCharacter('79927398710', 'numeric')).toBe(false);
        expect(validateCheckCharacter('1234567890', 'numeric')).toBe(false);
      });
    });

    describe('hex mode', () => {
      it('should validate correct hex values', () => {
        expect(validateCheckCharacter('ABCDEFB', 'hex')).toBe(true);
        expect(validateCheckCharacter('123ABCF', 'hex')).toBe(true);
      });

      it('should reject incorrect hex values', () => {
        expect(validateCheckCharacter('ABCDEF0', 'hex')).toBe(false);
        expect(validateCheckCharacter('ABCDEF1', 'hex')).toBe(false);
        expect(validateCheckCharacter('123ABC7', 'hex')).toBe(false);
      });
    });

    describe('alpha-numeric mode', () => {
      it('should validate correct alpha-numeric values', () => {
        // Test cases verified from actual algorithm output
        expect(validateCheckCharacter('250107Z05100010', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250107Z0510002Y', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250107Z0510003W', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250107Z0510004U', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250107Z0510005S', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250109Z0510001W', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250109Z0510002U', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250109Z0510003S', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250109Z0510004Q', 'alpha-numeric')).toBe(true);
        expect(validateCheckCharacter('250109Z0510005O', 'alpha-numeric')).toBe(true);
      });

      it('should reject incorrect alpha-numeric values', () => {
        expect(validateCheckCharacter('250107Z05100017', 'alpha-numeric')).toBe(false);
        expect(validateCheckCharacter('250107Z05100026', 'alpha-numeric')).toBe(false);
        expect(validateCheckCharacter('250109Z0510001X', 'alpha-numeric')).toBe(false);
      });
    });

    describe('error handling', () => {
      it('should throw error for invalid characters', () => {
        expect(() => validateCheckCharacter('123A', 'numeric')).toThrow('Error unexpected characters in 123A');
        expect(() => validateCheckCharacter('123G', 'hex')).toThrow('Error unexpected characters in 123G');
      });
    });
  });

  describe('round-trip validation', () => {
    it('should generate and validate numeric values', () => {
      const base = '12345678';
      const checkChar = generateCheckCharacter(base, 'numeric');
      const full = base + checkChar;
      expect(validateCheckCharacter(full, 'numeric')).toBe(true);
    });

    it('should generate and validate hex values', () => {
      const base = 'DEADBEEF';
      const checkChar = generateCheckCharacter(base, 'hex');
      const full = base + checkChar;
      expect(validateCheckCharacter(full, 'hex')).toBe(true);
    });

    it('should generate and validate alpha-numeric values', () => {
      const base = 'ABC123XYZ';
      const checkChar = generateCheckCharacter(base, 'alpha-numeric');
      const full = base + checkChar;
      expect(validateCheckCharacter(full, 'alpha-numeric')).toBe(true);
    });
  });
});
