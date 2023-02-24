import { SearchService } from './search.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':type')
  querySearch(@Param('type') type: string) {
    return this.searchService.querySearch(type);
  }
}
