import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import * as _ from 'lodash';

@Controller('recent-words')
export class RecentWordsController {
  @Get()
  async getRecentWords() {
    const timestampLastWeek = Math.floor(Date.now() / 1000) - 604800;
    const timestampNow = Math.floor(Date.now() / 1000);
    //Referance https://hn.algolia.com/api
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i%3E${timestampLastWeek}%2Ccreated_at_i%3C${timestampNow}`,
    );
    const stories = response.data.hits.map((hit) => hit.title);
    const words = _.words(stories.join(' '));
    const myArray = _.map(_.countBy(words), (value, key) => ({ key, value }));
    const topWords = _.take(_.orderBy(myArray,'value','desc'),10);
    return { topWords };
  }
}