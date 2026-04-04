import type { GuideDogTransfer } from "./types/guide_dog_transfers";

export default class GuideDogTransferModel {
  constructor() {}

  async creWate(guideDogTransfer: GuideDogTransfer) {}
  async getId(id: number) {}
  async getAll() {}
  async update(guideDogTransfer: Partial<GuideDogTransfer>) {}
  async delete(id: number) {}
}
