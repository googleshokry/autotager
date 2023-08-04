import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import * as _ from 'lodash';

@Controller('top-words')
export class TopWordsController {
  @Get()
  async getTopWords() {
    const response = await axios.get(
      'https://hacker-news.firebaseio.com/v0/newstories.json',
    );
    const stories = await Promise.all(
      _.take(response.data, 25).map(async (id) => {
        const storyResponse = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        );
        return storyResponse.data.title;
      }),
    );
    return stories;
    const words = _.words(stories.join(' '));

    const myArray = _.map(_.countBy(words), (value, key) => ({ key, value }));

    const topWords = _.take(_.orderBy(myArray,'value','desc'),10);
       return  topWords ;
  }
}