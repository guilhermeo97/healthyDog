import type { NextFunction, Request, Response } from "express";
import SchoolModel from "../models/school.model";
import type { School } from "../models/types/school";
import CreateSchoolDto from "./dto/create-school.dto";
import { validate } from "class-validator";
import UpdateSchoolDto from "./dto/update-school.dto";

export default class SchoolController {
  schoolModel: SchoolModel;
  constructor() {
    this.schoolModel = new SchoolModel();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados da escola do corpo da requisição
      Validar os dados recebidos
        Se inválidos, retornar erro 400 com mensagens de validação
      Chamar o método create do modelo de escola para inserir os dados no banco
      Retornar a escola criada com status 201 ou um erro apropriado
    */

    try {
      const { name, cnpj, email, phone, address } = req.body;
      const dto = new CreateSchoolDto(name, cnpj, email, phone, address);
      const valid = await validate(dto).then((errors) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          return res.status(400).json({ errors: messages });
        }
      });
      if (valid) return valid;
      const school: School = dto;
      const createSchool = await this.schoolModel.create(school);
      const findNewSchool = await this.schoolModel.getId(
        createSchool.rows.insertId
      );
      if (!findNewSchool) {
        return res
          .status(404)
          .json({ message: "School not found after creation" });
      }
      return res.status(201).json(findNewSchool);
    } catch (error) {
      next(error);
    }
  }

  async getSchoolById(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID da escola dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método getId do modelo de escola para buscar a escola no banco
        Se nenhuma escola for encontrada, retornar status 204
      Retornar a escola encontrada com status 200 ou um erro apropriado
    */

    try {
      const id = +req.params.id;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const findSchool = await this.schoolModel.getId(id);
      if (!findSchool) {
        return res.status(204).send();
      }
      return res.status(200).json(findSchool);
    } catch (error) {
      next(error);
    }
  }

  async getSchools(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o status das escolas dos parâmetros da requisição
      Validar o status recebido
        Se inválido, retornar erro 400
      Chamar o método getAll do modelo de escola para buscar as escolas no banco
        Se nenhuma escola for encontrada, retornar status 204
      Retornar as escolas encontradas com status 200 ou um erro apropriado
    */

    try {
      const status = +req.params.status;
      if (status !== 1 && status !== 0 && status !== 3) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const findSchools = await this.schoolModel.getAll(status);
      if (!findSchools) {
        return res.status(204).send();
      }
      return res.status(200).json(findSchools);
    } catch (error) {
      next(error);
    }
  }

  async updateSchool(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID da escola dos parâmetros da requisição
        Se inválido, retornar erro 400
      Receber os dados atualizados da escola do corpo da requisição
        Se inválidos, retornar erro 400 com mensagens de validação
      Validar o ID e os dados recebidos
      Chamar o método update do modelo de escola para atualizar os dados no banco
        Se nenhuma escola for atualizada, retornar status 204
      Retornar a escola atualizada com status 200 ou um erro apropriado
    */

    try {
      const id = +req.params.id;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const { name, cnpj, email, phone, address } = req.body;
      const dto = new UpdateSchoolDto(name, cnpj, email, phone, address);
      const valid = await validate(dto).then((errors) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          return res.status(400).json({ errors: messages });
        }
      });
      if (valid) return valid;
      const school: Partial<School> = { id, name, cnpj, email, phone, address };
      const update = await this.schoolModel.update(school);
      if (!update) {
        return res.status(204).send();
      }
      return res.status(200).send(update);
    } catch (error) {
      next(error);
    }
  }

  async deleteSchool(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID da escola dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método delete do modelo de escola para remover a escola do banco
        Se nenhuma escola for deletada, retornar erro 400
      Retornar status 204 se a exclusão for bem-sucedida ou um erro apropriado
    */

    try {
      const id = +req.params.id;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const deleteResult = await this.schoolModel.delete(id);
      if (!deleteResult) {
        return res
          .status(400)
          .json({ message: "School not found or could not be deleted" });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
