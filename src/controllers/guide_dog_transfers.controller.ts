import type { NextFunction, Request, Response } from "express";
import GuideDogTransferModel from "../models/guide_dog_transfers.model";
import type { GuideDogTransfer } from "../models/types/guide_dog_transfers";
import CreateGuideDogTransferDto from "./dto/create-guide-dog-transfer.dto";
import { validate } from "class-validator";
import UpdateGuideDogTransferDto from "./dto/update-guide-dog-transfer.dto";

export default class GuideDogTransferController {
  guideDogTransferModel: GuideDogTransferModel;
  constructor() {
    this.guideDogTransferModel = new GuideDogTransferModel();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados da transferência de guia de cão do corpo da requisição
      Validar os dados recebidos
        Se inválidos, retornar erro 400 com mensagens de validação
      Chamar o método create do modelo de transferência para inserir os dados no banco
      Retornar a transferência criada com status 201 ou um erro apropriado
    */

    try {
      const { guideDogId, userId, startDate, endDate, transferReason } =
        req.body;
      console.log("Received data for creating guide dog transfer:", req.body);
      const dto = new CreateGuideDogTransferDto(
        guideDogId,
        userId,
        startDate,
        transferReason,
        endDate,
      );
      console.log(dto);
      const valid = await validate(dto).then((errors) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          return res.status(400).json({ errors: messages });
        }
      });
      if (valid) return valid;
      const guideDogTransfer: GuideDogTransfer = {
        guideDogId: dto.guideDogId,
        userId: dto.userId,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate,
        transferReason: dto.transferReason,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createGuideDogTransfer =
        await this.guideDogTransferModel.create(guideDogTransfer);
      if (!createGuideDogTransfer) {
        return res
          .status(404)
          .json({ message: "Guide dog transfer not found after creation" });
      }
      return res.status(201).json(createGuideDogTransfer);
    } catch (error) {
      next(error);
    }
  }

  async getGuideDogTransferById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Receber o ID da transferência de guia de cão dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método getId do modelo de transferência para buscar a transferência no banco
        Se nenhuma transferência for encontrada, retornar status 204
      Retornar a transferência encontrada com status 200 ou um erro apropriado
    */

    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const findGuideDogTransfer = await this.guideDogTransferModel.getId(id);
      if (!findGuideDogTransfer) {
        return res.status(200).json([]);
      }
      return res.status(200).json(findGuideDogTransfer);
    } catch (error) {
      next(error);
    }
  }

  async getGuideDogTransfers(req: Request, res: Response, next: NextFunction) {
    /*
      Chamar o método getAll do modelo de transferência para buscar as transferências no banco
        Se nenhuma transferência for encontrada, retornar status 204
      Retornar as transferências encontradas com status 200 ou um erro apropriado
    */

    try {
      const findGuideDogTransfers = await this.guideDogTransferModel.getAll();
      return res.status(200).json(findGuideDogTransfers);
    } catch (error) {
      next(error);
    }
  }

  async updateGuideDogTransfer(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Receber o ID da transferência de guia de cão dos parâmetros da requisição
        Se inválido, retornar erro 400
      Receber os dados atualizados da transferência do corpo da requisição
        Se inválidos, retornar erro 400 com mensagens de validação
      Validar o ID e os dados recebidos
      Chamar o método update do modelo de transferência para atualizar os dados no banco
        Se nenhuma transferência for atualizada, retornar status 204
      Retornar a transferência atualizada com status 200 ou um erro apropriado
    */

    try {
      const id = Number(req.params.id);
      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const { guideDogId, userId, startDate, endDate, transferReason } =
        req.body;
      const dto = new UpdateGuideDogTransferDto(
        guideDogId,
        userId,
        startDate,
        endDate,
        transferReason,
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
      const guideDogTransfer: Partial<GuideDogTransfer> = {
        id,
        guideDogId: dto.guideDogId,
        userId: dto.userId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        transferReason: dto.transferReason,
        updatedAt: new Date(),
      };
      const update = await this.guideDogTransferModel.update(guideDogTransfer);
      if (!update) {
        return res
          .status(404)
          .json({ message: "Guide dog transfer not found" });
      }
      return res.status(200).json(update);
    } catch (error) {
      next(error);
    }
  }

  async deleteGuideDogTransfer(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    /*
      Receber o ID da transferência de guia de cão dos parâmetros da requisição
      Validar o ID recebido
        Se inválido, retornar erro 400
      Chamar o método delete do modelo de transferência para remover a transferência do banco
        Se nenhuma transferência for deletada, retornar erro 400
      Retornar status 204 se a exclusão for bem-sucedida ou um erro apropriado
    */

    try {
      const id = Number(req.params.id);

      if (!id || id <= 0 || isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      const deleteResult = await this.guideDogTransferModel.delete(id);
      if (!deleteResult) {
        return res.status(404).json({
          message: "Guide dog transfer not found or could not be deleted",
        });
      }
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
