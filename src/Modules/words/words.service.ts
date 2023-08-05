import {Injectable} from '@nestjs/common';
import {HackerNewsServices} from "../../Services/HackerNewsServices";


@Injectable()
export class WordsService {

    private hackerNewsServices: HackerNewsServices;

    constructor(hackerNewsServices: HackerNewsServices) {
        this.hackerNewsServices = hackerNewsServices;
    }

    lastStories() {
        return this.hackerNewsServices.getTopWords(25, 10);
    }

    getTopUsersStories() {
        return this.hackerNewsServices.getTopUsersStories(100, 10);

    }
}
