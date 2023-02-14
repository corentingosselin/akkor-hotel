import {registerDecorator, ValidationArguments, ValidationOptions} from 'class-validator';
import { isPasswordSecure } from './regex-utils';

export function IsPasswordSecure(validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
      registerDecorator({
        name: 'isPasswordSecure',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return isPasswordSecure(value);
          },
        },
      });
    };
  }

export function Match(property: string, validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
      registerDecorator({
        name: 'match',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [relatedPropertyName] = args.constraints;
            const relatedValue = (args.object as any)[relatedPropertyName];
            return relatedValue === value;
          },
        },
      });
    };
  }