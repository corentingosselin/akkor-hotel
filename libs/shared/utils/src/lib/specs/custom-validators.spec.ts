import { validate } from 'class-validator';
import { IsPasswordSecure, Match } from '../custom-validators.utils';

class SecurePassword {
  @IsPasswordSecure()
  password = 'Ab5&fsefs';
}

class NotSecurePassword {
  @IsPasswordSecure()
  password = 'd&sfef';
}
class MatchingPassword {
  password = 'Ab5&fsefs';
  @Match('password')
  confirmPassword = 'Ab5&fsefs';
}

class MismatchedPassword {
  password = 'Ab5&fsefs';
  @Match('password')
  confirmPassword ='Ab5&sfefs';
}

describe('CustomValidator', () => {
  describe('Password Validation', () => {
    it('should validate that the NotSecurePassword is not secure', async () => {
      const notSecurePassword = new NotSecurePassword();
      const errors = await validate(notSecurePassword);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toEqual('password');
    });

    it('should validate that the SecurePassword is secure', async () => {
      const securePassword = new SecurePassword();
      const errors = await validate(securePassword);
      expect(errors.length).toEqual(0);
    });
  });

  describe('Password Matching', () => {
    it('should validate password and confirmPassword match', async () => {
      const matchingPassword = new MatchingPassword();
      const errors = await validate(matchingPassword);
      console.log(errors);
      expect(errors.length).toEqual(0);
    });

    it('should validate that the MismatchedPassword password and confirmPassword do not match', async () => {
      const mismatchedPassword = new MismatchedPassword();
      const errors = await validate(mismatchedPassword);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].property).toEqual('confirmPassword');
    });
  });
});
