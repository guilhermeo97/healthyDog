import type { NextFunction, Request, Response } from "express";

export default class UserController {
  constructor() {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    /*
      Receber os dados do usuário do corpo da requisição
      Validar os dados recebidos
      Chamar o método create do modelo de usuário para inserir os dados no banco
      Retornar o usuário criado com status 201 ou um erro apropriado
    */
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do usuário dos parâmetros da requisição
      Validar o ID recebido
      Chamar o método getId do modelo de usuário para buscar o usuário no banco
      Retornar o usuário encontrado com status 200 ou um erro apropriado
    */
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o status dos usuários dos parâmetros da requisição
      Validar o status recebido
      Chamar o método getAll do modelo de usuário para buscar os usuários no banco
      Retornar os usuários encontrados com status 200 ou um erro apropriado
    */
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do usuário dos parâmetros da requisição
      Receber os dados atualizados do usuário do corpo da requisição
      Validar o ID e os dados recebidos
      Chamar o método update do modelo de usuário para atualizar os dados no banco
      Retornar o usuário atualizado com status 200 ou um erro apropriado
    */
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    /*
      Receber o ID do usuário dos parâmetros da requisição
      Validar o ID recebido
      Chamar o método delete do modelo de usuário para remover o usuário do banco
      Retornar status 204 se a exclusão for bem-sucedida ou um erro apropriado
    */
  }
}
