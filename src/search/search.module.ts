import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
