import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {
  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
