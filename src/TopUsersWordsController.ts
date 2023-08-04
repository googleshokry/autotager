import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import * as _ from 'lodash';

@Controller('top-users-words')
export class TopUsersWordsController {
  @Get()
  async getTopUsersWords() {
    const response = await axios.get(
      'https://hacker-news.firebaseio.com/v0/newstories.json',
    );
    const stories = await Promise.all(
      _.take(response.data, 300).map(async (id) => {
        const storyResponse = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        );
        return storyResponse.data;
      }),
    );

     const users = await Promise.all(
          stories.map(async (store) => {
            const userResponse = await axios.get( `https://hacker-news.firebaseio.com/v0/user/${store.by}.json`);
            if(userResponse.data.karma >= 10000)
            return {'karma':userResponse.data.karma,'title':store.title,'store':store,'user':userResponse.data};
          })
        );
        const filter = users.filter(x => x != null) as string[];
        const topUsers = _.take(_.orderBy(_.uniqBy(filter,'store.by'), 'karma', 'desc'),10).map(x => x.title);
       const words = _.words(topUsers.join(' '));

          const myArray = _.map(_.countBy(words), (value, key) => ({ key, value }));

          const topWords = _.take(_.orderBy(myArray,'value','desc'),10);
             return  topWords ;
  }
}