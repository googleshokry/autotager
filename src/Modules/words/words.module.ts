import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import {HackerNewsServices} from "../../Services/HackerNewsServices";

@Module({
  imports:[],
  controllers: [WordsController],
  providers: [WordsService,HackerNewsServices]
})
export class WordsModule {}
