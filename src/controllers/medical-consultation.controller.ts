import type { NextFunction, Request, Response } from "express";
import MedicalConsultationModel from "../models/medical-consultation.model";
import type { MedicalConsultation } from "../models/types/medical-consultation";
import CreateMedicalConsultationDto from "./dto/create-medical-consultation.dto";
import { validate } from "class-validator";
import UpdateMedicalConsultationDto from "./dto/update-medical-consultation.dto";

export default class MedicalConsultationController {
  medicalConsultationModel: MedicalConsultationModel;
  constructor() {
    this.medicalConsultationModel = new MedicalConsultationModel();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados da consulta médica do corpo da requisição
      Validar os dados recebidos
        Se inválidos, retornar erro 400 com mensagens de validação
      Chamar o método create do modelo de consulta médica para inserir os dados no banco
      Retornar a consulta médica criada com status 201 ou um erro apropriado
    */

    try {
      const {
        guideDogId,
        userId,
        consultationDate,
        veterinarianCrmv,
        veterinarianName,
        consultationNotes,
      } = req.body;
      const dto = new CreateMedicalConsultationDto(
        guideDogId,
        userId,
        consultationDate,
        veterinarianCrmv,
        veterinarianName,
        consultationNotes,
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
      const medicalConsultation: MedicalConsultation = {
        guideDogId: dto.guideDogId,
        userId: dto.userId,
        consultationDate: dto.consultationDate,
        veterinarianCrmv: dto.veterinarianCrmv,
        veterinarianName: dto.veterinarianName,
        consultationNotes: dto.consultationNotes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createMedicalConsultation =
        await this.medicalConsultationModel.create(medicalConsultation);
      if (!createMedicalConsultation) {
        return res
          .status(404)
          .json({ message: "Medical consultation not found after creation" });
      }
      return res.status(201).json(createMedicalConsultation);
    } catch (error) {
      next(error);
    }
  }

  async getMedicalConsultationById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Receber o ID da consulta médica dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método getId do modelo de consulta médica para buscar a consulta no banco
        Se nenhuma consulta for encontrada, retornar status 204
      Retornar a consulta encontrada com status 200 ou um erro apropriado
    */

    try {
      const id = +req.params.id;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const findMedicalConsultation =
        await this.medicalConsultationModel.getId(id);
      if (!findMedicalConsultation) {
        return res
          .status(204)
          .json({ message: "Medical consultation not found" });
      }
      return res.status(200).json(findMedicalConsultation);
    } catch (error) {
      next(error);
    }
  }

  async getMedicalConsultations(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Chamar o método getAll do modelo de consulta médica para buscar as consultas no banco
        Se nenhuma consulta for encontrada, retornar status 204
      Retornar as consultas encontradas com status 200 ou um erro apropriado
    */

    try {
      const findMedicalConsultations =
        await this.medicalConsultationModel.getAll();
      if (!findMedicalConsultations) {
        return res.status(204).send();
      }
      return res.status(200).json(findMedicalConsultations);
    } catch (error) {
      next(error);
    }
  }

  async updateMedicalConsultation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Receber o ID da consulta médica dos parâmetros da requisição
        Se inválido, retornar erro 400
      Receber os dados atualizados da consulta médica do corpo da requisição
        Se inválidos, retornar erro 400 com mensagens de validação
      Validar o ID e os dados recebidos
      Chamar o método update do modelo de consulta médica para atualizar os dados no banco
        Se nenhuma consulta for atualizada, retornar status 204
      Retornar a consulta atualizada com status 200 ou um erro apropriado
    */

    try {
      const id = +req.params.id;
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const {
        guideDogId,
        userId,
        consultationDate,
        veterinarianCrmv,
        veterinarianName,
        consultationNotes,
      } = req.body;
      const dto = new UpdateMedicalConsultationDto(
        guideDogId,
        userId,
        consultationDate,
        veterinarianCrmv,
        veterinarianName,
        consultationNotes,
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
      const medicalConsultation: Partial<MedicalConsultation> = {
        id,
        guideDogId: dto.guideDogId,
        userId: dto.userId,
        consultationDate: dto.consultationDate,
        veterinarianCrmv: dto.veterinarianCrmv,
        veterinarianName: dto.veterinarianName,
        consultationNotes: dto.consultationNotes,
        updatedAt: new Date(),
      };
      const update =
        await this.medicalConsultationModel.update(medicalConsultation);
      if (!update) {
        return res
          .status(204)
          .json({ message: "Medical consultation not found" });
      }
      return res.status(200).send(update);
    } catch (error) {
      next(error);
    }
  }

  async deleteMedicalConsultation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Receber o ID da consulta médica dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método delete do modelo de consulta médica para remover a consulta do banco
        Se nenhuma consulta for deletada, retornar erro 400
      Retornar status 204 se a exclusão for bem-sucedida ou um erro apropriado
    */

    try {
      const id = +req.params.id;

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const deleteResult = await this.medicalConsultationModel.delete(id);
      if (!deleteResult) {
        return res.status(400).json({
          message: "Medical consultation not found or could not be deleted",
        });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
