import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TagService } from "./tag/tag.service";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tagService = app.get(TagService);

  const tags = [
    { tagName: "Floor Plans" },
    { tagName: "Manuals" },
    { tagName: "Blueprints" },
    { tagName: "Receipts" },
    { tagName: "Misc" },
  ];

  await Promise.all(tags.map(tag => tagService.createTag(tag)));

  await app.close();
}

seed();
