import {HttpServices} from "./HttpServices";
import * as _ from 'lodash';

export class HackerNewsServices {
    private httpServices: HttpServices;

    constructor() {
        this.httpServices = new HttpServices();
        this.httpServices.createInstance('https://hacker-news.firebaseio.com/v0/');
    }

    async getTopWords(storiesCount: number, titleCount: number) {
        const {data} = await this.httpServices.get('newstories.json');
        const stories = await Promise.all(
            _.take(data, storiesCount).map(async (id: number) => {
                const {data} = await this.httpServices.get(`item/${id}.json`);
                return data.title;
            }),
        );
        const words = _.words(stories.join(' '));
        //
        const myArray = _.map(_.countBy(words), (value, key) => ({key, value}));
        //
        return _.take(_.orderBy(myArray, 'value', 'desc'), titleCount);
    }

    async getTopUsersStories(storiesCount:number,titleCount: number) {

        const {data} = await this.httpServices.get('newstories.json');
        const stories = await Promise.all(
            _.take(data, storiesCount).map(async (id: number) => {
                const {data} = await this.httpServices.get(`item/${id}.json`);
                return data;
            }),
        );
        _.uniqBy(stories, 'store.by');
        const users = await Promise.all(
            stories.map(async (store: any) => {
                const {data} = await this.httpServices.get(`user/${store.by}.json`);
                if (data.karma >= 10000)
                    return {
                        'karma': data.karma,
                        'title': store.title,
                        'store': store,
                        'user': data
                    };
            })
        );
        const filter = users.filter(x => x != null) as string[];
        const topUsers = _.orderBy(filter, 'karma', 'desc').map(x => x.title);
        const words = _.words(topUsers.join(' '));

        const myArray = _.map(_.countBy(words), (value, key) => ({key, value}));

        return _.take(_.orderBy(myArray, 'value', 'desc'), titleCount);

    }
}