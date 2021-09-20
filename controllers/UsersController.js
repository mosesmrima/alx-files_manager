import DBClient from '../utils/db';
import RedisClient from '../utils/redis';
import sha1 from 'sha1';

const { ObjectId } = require("mongodb");


class UsersController {
    static async postNew(request, response) {
	const newEmail = request.body.email;
	if(!newEmail) return response.status(400).send({ error: 'Missing email' });

	const password = request.body.password;
	if(!password) return response.status(400).send({error: 'Missing password'});

	const oldEmail = await DBClient.db.collection('users').findOne({email: newEmail});
	if(oldEmail) return response.status(400).send({error: 'Already exist'});

	const passwordHash = sha1(password);

	const result = await DBClient.db.collection('users').insertOne({email: newEmail, password: passwordHash});
	return response.status(200).send({id: result.insertedId, email: newEmail});
    }
}

module.exports = UsersController;
