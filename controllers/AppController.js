import RedisClient from '../utils/redis';
import DBClient from '../utils/redis';

class AppController {
    static getStatus(request, response) {
        const status = {redis: RedisClient.isAlive(), db: DBClient.isAlive()};
    }

    static async getStats(request, response) {
        const nbUser = await DBClient.nbUsers();
        const nbFiles = await DBClient.nbFiles();

        response.status(200).send({ users: nbUser, files: nbFiles });
    }
}

export default AppController