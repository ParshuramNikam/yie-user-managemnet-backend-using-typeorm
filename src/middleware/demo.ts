import { User } from "../entity/User";

const demo = async (req, res, next) => {

    const connection = res.locals.connection;

    const userRepository = connection.getRepository(User);
    const user = await userRepository.find({ relations: ['profile', 'school'] });

    res.send(user);
    return;

    console.log(" >>> " + res.locals.connection);
    next();
}

export default demo;