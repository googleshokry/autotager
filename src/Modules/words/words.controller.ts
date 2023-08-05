import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {WordsService} from './words.service';
@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) {
    }

    @Get('/last-stories')
    lastStories() {
        try {
            return this.wordsService.lastStories();
        } catch (error) {
            throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/last-top-user-stories')
    getTopUsersStories() {
        try {
            return this.wordsService.getTopUsersStories();
        } catch (error) {
            throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
        }
    }


}
