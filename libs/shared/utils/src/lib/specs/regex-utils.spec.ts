import { isEmailValid, isPasswordSecure } from '../regex-utils';

describe('Regex utils', () => {
  describe('isPasswordSecure', () => {
    it('should return true with secure and matched password"', () => {
      expect(isPasswordSecure("Ab5&sefesf")).toEqual(true);
    });
    it('should return error with not secure password"', () => {
      expect(isPasswordSecure("Afsf")).toEqual(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true with valid email"', () => {
      expect(isEmailValid("test@gmail.com")).toEqual(true);
    });
    it('should return false without valid email"', () => {
      expect(isEmailValid("test@gmail")).toEqual(false);
    });
  });
});
