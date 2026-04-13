import type { NextFunction, Request, Response } from "express";
import GuideDogModel from "../models/guide-dog.model";
import type { GuideDog } from "../models/types/guide-dog";
import CreateGuideDogDto from "./dto/create-guide-dog.dto";
import UpdateGuideDogDto from "./dto/update-guide-dog.dto";
import { validate } from "class-validator";

export default class GuideDogController {
  guideDogModel: GuideDogModel;

  constructor() {
    this.guideDogModel = new GuideDogModel();
  }

  async createGuideDog(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados do guia de cão no corpo da requisição
      Validar os dados recebidos
      Chamar o método create do modelo de guide-dog para inserir os dados no banco
      Retornar o registro criado com status 201 ou um erro apropriado
    */
    try {
      const {
        schoolId,
        userId,
        name,
        gender,
        breed,
        birthDate,
        deathDate,
        retirementDate,
        weight,
      } = req.body;
      const dto = new CreateGuideDogDto(
        schoolId,
        userId,
        name,
        gender,
        breed,
        birthDate,
        deathDate,
        retirementDate,
        weight,
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
      const guideDog: GuideDog = {
        schoolId: dto.schoolId,
        userId: dto.userId,
        name: dto.name,
        gender: dto.gender,
        breed: dto.breed,
        birthDate: dto.birthDate,
        deathDate: dto.deathDate,
        retirementDate: dto.retirementDate,
        weight: dto.weight,
        state: true,
        created: new Date(),
      };
      const createGuideDog = await this.guideDogModel.create(guideDog);
      if (!createGuideDog) {
        return res
          .status(404)
          .json({ message: "Guide dog not found after creation" });
      }
      return res.status(201).json(createGuideDog);
    } catch (error) {
      next(error);
    }
  }

  async getGuideDogById(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do guia de cão nos parâmetros da requisição
      Validar o ID recebido
      Chamar o método getId do modelo para buscar no banco
      Retornar o registro encontrado com status 200 ou um erro apropriado
    */
    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const findGuideDog = await this.guideDogModel.getId(id);
      if (!findGuideDog) {
        return res.status(200).json([]);
      }
      return res.status(200).json(findGuideDog);
    } catch (error) {
      next(error);
    }
  }

  async getGuideDogs(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o status nos parâmetros da requisição
      Validar o status recebido
      Chamar o método getAll do modelo para buscar no banco
      Retornar os registros encontrados com status 200 ou um erro apropriado
    */
    try {
      const status = Number(req.params.status);
      if (status !== 1 && status !== 0 && status !== 3) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const findGuideDogs = await this.guideDogModel.getAll(status);
      return res.status(200).json(findGuideDogs);
    } catch (error) {
      next(error);
    }
  }

  async updateGuideDog(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID nos parâmetros da requisição
      Receber os dados atualizados no corpo
      Validar ID e dados
      Chamar método update do modelo
      Retornar o registro atualizado com status 200 ou erro apropriado
    */
    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const {
        schoolId,
        userId,
        name,
        gender,
        breed,
        birthDate,
        deathDate,
        retirementDate,
        weight,
        state,
      } = req.body;
      const dto = new UpdateGuideDogDto(
        schoolId,
        userId,
        name,
        gender,
        breed,
        birthDate,
        deathDate,
        retirementDate,
        weight,
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
      const guideDog: Partial<GuideDog> = {
        id,
        schoolId: dto.schoolId,
        userId: dto.userId,
        name: dto.name,
        gender: dto.gender,
        breed: dto.breed,
        birthDate: dto.birthDate,
        deathDate: dto.deathDate,
        retirementDate: dto.retirementDate,
        weight: dto.weight,
        state: dto.state,
      };
      const updated = await this.guideDogModel.update(guideDog);
      if (!updated) {
        return res.status(404).json({ message: "Guide dog not found" });
      }
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteGuideDog(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID nos parâmetros da requisição
      Validar o ID recebido
      Chamar método delete do modelo
      Retornar status 204 se exclusão bem‑sucedida ou erro apropriado
    */
    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const deleteGuideDog = await this.guideDogModel.delete(id);
      if (!deleteGuideDog) {
        return res
          .status(404)
          .json({ message: "Guide dog not found or could not be deleted" });
      }
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
