import { User } from "../entity/User";


module.exports = async (req, res) => {
    try {
        const connection = res.locals.connection;
        const userRepository = connection.getRepository(User);
        const users = await userRepository.find({ relations: ['profile', 'school'] });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while getting all users."
        });
    }
}
