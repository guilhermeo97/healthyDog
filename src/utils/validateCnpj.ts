import { registerDecorator, type ValidationOptions } from "class-validator";

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsCNPJ",
      target: object.constructor,
      propertyName: propertyName,
      ...(validationOptions ? { options: validationOptions } : {}),
      validator: {
        validate(cnpj: string, args) {
          if (!args || !args.object) return false;

          const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6];
          let soma = 0;
          let soma2 = 0;
          const cnpjLimpo = cnpj.replace(/[^\d]+/g, "");
          if (cnpjLimpo.length !== 14) {
            return false;
          }
          const digitos = cnpjLimpo.substring(0, 12);
          const inverso = digitos.split("").reverse().join("");
          for (let i = 0; i < inverso.length; i++) {
            const digito = parseInt(inverso[i]);
            const multiplicador = multiplicadores[i];
            const resultado = digito * multiplicador;
            soma += resultado;
          }
          soma = soma % 11;
          soma = 11 - soma;
          if (soma >= 10) {
            soma = 0;
          }
          if (soma !== parseInt(cnpjLimpo[12])) {
            return false;
          }

          const digitos2 = cnpjLimpo.substring(0, 13);
          const inverso2 = digitos2.split("").reverse().join("");
          for (let i = 0; i < inverso2.length; i++) {
            const digito = parseInt(inverso2[i]);
            const multiplicador = multiplicadores[i];
            const resultado = digito * multiplicador;
            soma2 += resultado;
          }
          soma2 = soma2 % 11;
          soma2 = 11 - soma2;
          if (soma2 >= 10) {
            soma2 = 0;
          }
          if (soma2 !== parseInt(cnpjLimpo[13])) {
            return false;
          }

          return true;
        },
        defaultMessage(args) {
          if (!args || !args.constraints) return "";
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must be longer than ${relatedPropertyName}`;
        },
      },
    });
  };
}
