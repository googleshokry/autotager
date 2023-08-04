import { Module } from '@nestjs/common';
import { RecentWordsController } from './RecentWordsController';
import { TopUsersWordsController } from './TopUsersWordsController';
import { TopWordsController } from './TopWordsController';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [TopWordsController,TopUsersWordsController,RecentWordsController],
  providers: [AppService],
})
export class AppModule {}
