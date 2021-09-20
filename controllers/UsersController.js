import sha1 from 'sha1';
import DBClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const newEmail = request.body.email;
    if (!newEmail) return response.status(400).send({ error: 'Missing email' });

    const newPassword = request.body.password;
    if (!newPassword) return response.status(400).send({ error: 'Missing password' });

    const oldEmail = await DBClient.db.collection('users').findOne({ email: newEmail });
    if (oldEmail) return response.status(400).send({ error: 'Already exist' });

    const passwordHash = sha1(newPassword);

    const result = await DBClient.db.collection('users').insertOne({ email: newEmail, password: passwordHash });
    return response.status(201).send({ id: result.insertedId, email: newEmail });
  }
}

module.exports = UsersController;
