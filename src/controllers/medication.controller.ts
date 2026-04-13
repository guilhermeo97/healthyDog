import type { NextFunction, Request, Response } from "express";
import type { Medication, MedicationType } from "../models/types/medication";
import MedicationModel from "../models/medicantion.model";
import CreateMedicationDto from "./dto/create-medication.dto";
import { validate } from "class-validator";
import UpdateMedicationDto from "./dto/update-medication.dto";

export default class MedicationController {
  medicationModel: MedicationModel;

  constructor() {
    this.medicationModel = new MedicationModel();
  }

  async createMedication(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados da medicamento do corpo da requisição
      Validar os dados recebidos
        Se inválidos, retornar erro 400 com mensagens de validação
      Chamar o método create do modelo de medicamento para inserir os dados no banco
      Retornar a medicamento criada com status 201 ou um erro apropriado
    */
    try {
      const {
        guideDogId,
        userId,
        manufacturer,
        applicationDate,
        expirationDate,
        isMandatory,
        veterinarianCrmv,
        veterinarianName,
        medicationType,
      } = req.body;
      const dto = new CreateMedicationDto(
        guideDogId,
        userId,
        manufacturer,
        applicationDate,
        expirationDate,
        isMandatory,
        veterinarianCrmv,
        veterinarianName,
        medicationType,
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
      const medication: Medication = {
        guideDogId: dto.guideDogId,
        userId: dto.userId,
        manufacturer: dto.manufacturer,
        applicationDate: dto.applicationDate,
        expirationDate: dto.expirationDate,
        isMandatory: dto.isMandatory,
        veterinarianCrmv: dto.veterinarianCrmv,
        veterinarianName: dto.veterinarianName,
        medicationType: dto.medicationType,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createMedication = await this.medicationModel.create(medication);
      if (!createMedication) {
        return res
          .status(404)
          .json({ message: "Medication not found after creation" });
      }
      return res.status(201).json(createMedication);
    } catch (error) {
      next(error);
    }
  }

  async getMedicationById(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID da medicamento dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método getId do modelo de medicamento para buscar a medicamento no banco
        Se nenhuma medicamento for encontrada, retornar status 204
      Retornar a medicamento encontrada com status 200 ou um erro apropriado
    */
    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const findMedication = await this.medicationModel.getId(id);
      if (!findMedication) {
        return res.status(200).json([]);
      }
      return res.status(200).json(findMedication);
    } catch (error) {
      next(error);
    }
  }

  async getAllMedications(req: Request, res: Response, next: NextFunction) {
    /*
      Chamar o método getAll do modelo de medicamento para buscar as medicamentos no banco
        Se nenhuma medicamento for encontrada, retornar status 204
      Retornar os medicamentos encontradas com status 200 ou um erro apropriado
    */
    try {
      const findMedications = await this.medicationModel.getAll();
      return res.status(200).json(findMedications);
    } catch (error) {
      next(error);
    }
  }

  async updateMedication(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID da medicamento dos parâmetros da requisição
        Se inválido, retornar erro 400
      Receber os dados atualizados da medicamento do corpo da requisição
        Se inválidos, retornar erro 400 com mensagens de validação
      Validar o ID e os dados recebidos
      Chamar o método update do modelo de medicamento para atualizar os dados no banco
        Se nenhuma medicamento for atualizada, retornar status 204
      Retornar a medicamento atualizada com status 200 ou um erro apropriado
    */
    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const {
        guideDogId,
        userId,
        manufacturer,
        applicationDate,
        expirationDate,
        isMandatory,
        veterinarianCrmv,
        veterinarianName,
        medicationType,
      } = req.body;
      const dto = new UpdateMedicationDto(
        guideDogId,
        userId,
        manufacturer,
        applicationDate,
        expirationDate,
        isMandatory,
        veterinarianCrmv,
        veterinarianName,
        medicationType,
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
      const medication: Partial<Medication> = {
        id,
        guideDogId: dto.guideDogId,
        userId: dto.userId,
        manufacturer: dto.manufacturer,
        applicationDate: dto.applicationDate,
        expirationDate: dto.expirationDate,
        isMandatory: dto.isMandatory,
        veterinarianCrmv: dto.veterinarianCrmv,
        veterinarianName: dto.veterinarianName,
        medicationType: dto.medicationType,
      };
      const update = await this.medicationModel.update(medication);
      if (!update) {
        return res.status(404).json({ message: "School not found" });
      }
      return res.status(200).json(update);
    } catch (error) {
      next(error);
    }
  }

  async deleteMedication(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID da medicamento dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método delete do modelo de medicamento para remover a medicamento do banco
        Se nenhuma medicamento for deletada, retornar erro 400
      Retornar status 204 se a exclusão for bem-sucedida ou um erro apropriado
    */
    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const deleteResult = await this.medicationModel.delete(id);
      if (!deleteResult) {
        return res
          .status(404)
          .json({ message: "Medication not found or could not be deleted" });
      }
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
