import { User } from "../entity/User";


module.exports = async (req, res) => {
    try {

        const id = req.params.id;

        const connection = res.locals.connection;
        const userRepository = connection.getRepository(User);

        const user = await userRepository.findOne({ where: { id: id }, relations: ['profile', 'school'] });

        if (!user) return res.status(400).send({ status: "failed", message: "User not found!" });

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while getting single user."
        });
    }
}