import type { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import type { User } from "../models/types/user";
import CreateUserDto from "./dto/create-user.dto";
import UpdateUserDto from "./dto/update-user.dto";
import { validate } from "class-validator";

export default class UserController {
  userModel: UserModel;
  constructor() {
    this.userModel = new UserModel();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados do usuário do corpo da requisição
      Validar os dados recebidos
      Chamar o método create do modelo de usuário para inserir os dados no banco
      Retornar o usuário criado com status 201 ou um erro apropriado
    */
    try {
      const {
        school,
        fullName,
        cpf,
        birthDate,
        acessType,
        email,
        phone,
        address,
        password,
        guideDog,
      } = req.body;

      const dto = new CreateUserDto(
        school,
        fullName,
        cpf,
        birthDate,
        acessType,
        email,
        phone,
        address,
        password,
        guideDog,
      );
      const valid = await validate(dto).then((errors) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          return res.status(400).json({ errors: messages });
        }
      });
      if (valid) return valid;
      console.log("Creating user with data:", dto);
      const user: User = {
        school: dto.school,
        fullName: dto.fullName,
        cpf: dto.cpf,
        birthDate: dto.birthDate,
        acessType: dto.acessType,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        password: dto.password,
        guideDog: dto.guideDog,
        state: true,
        created: new Date(),
      };
      const createResult = await this.userModel.create(user);
      if (!createResult) {
        return res
          .status(404)
          .json({ message: "User not found after creation" });
      }
      return res.status(201).json(createResult);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do usuário dos parâmetros da requisição
      Validar o ID recebido
      Chamar o método getId do modelo de usuário para buscar o usuário no banco
      Retornar o usuário encontrado com status 200 ou um erro apropriado
    */
    try {
      const id = +req.params.id;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const user = await this.userModel.getId(id);
      if (!user) {
        return res.status(204).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o status dos usuários dos parâmetros da requisição
      Validar o status recebido
      Chamar o método getAll do modelo de usuário para buscar os usuários no banco
      Retornar os usuários encontrados com status 200 ou um erro apropriado
    */
    try {
      const status = +req.params.status;
      if (status !== 1 && status !== 0 && status !== 3) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const users = await this.userModel.getAll(status);
      if (!users) {
        return res.status(204).json({ message: "No users found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do usuário dos parâmetros da requisição
      Receber os dados atualizados do usuário do corpo da requisição
      Validar o ID e os dados recebidos
      Chamar o método update do modelo de usuário para atualizar os dados no banco
      Retornar o usuário atualizado com status 200 ou um erro apropriado
    */
    try {
      const id = +req.params.id;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const {
        school,
        fullName,
        cpf,
        birthDate,
        acessType,
        email,
        phone,
        password,
        guideDog,
        state,
      } = req.body;

      const dto = new UpdateUserDto(
        school,
        fullName,
        cpf,
        birthDate,
        acessType,
        email,
        phone,
        password,
        guideDog,
        state,
      );

      const valid = await validate(dto).then((errors) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          return res.status(400).json({ errors: messages });
        }
      });
      if (valid) return valid;

      const user: Partial<User> = {
        id,
        school: dto.school,
        fullName: dto.fullName,
        cpf: dto.cpf,
        birthDate: dto.birthDate,
        acessType: dto.acessType,
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        guideDog: dto.guideDog,
        state: dto.state,
      };
      const updated = await this.userModel.update(user);
      if (!updated) {
        return res
          .status(204)
          .json({ message: "User not found or no changes made" });
      }
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do usuário dos parâmetros da requisição
      Validar o ID recebido
      Chamar o método delete do modelo de usuário para remover o usuário do banco
      Retornar status 204 se a exclusão for bem-sucedida ou um erro apropriado
    */
    try {
      const id = +req.params.id;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const result = await this.userModel.delete(id);
      if (!result) {
        return res
          .status(400)
          .json({ message: "User not found or could not be deleted" });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
