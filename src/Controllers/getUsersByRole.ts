import UserRoles from "../Data/UserRoles";
import { User } from "../entity/User";


module.exports = async (req, res) => {
    try {

        const role = req.params.role;

        const isRoleValid = UserRoles.includes(role);
        if (!isRoleValid) return res.status(400).send({ status: "failed", message: `${role} is a invalid role!`, validRoles: UserRoles })

        const connection = res.locals.connection;
        const userRepository = connection.getRepository(User);
        const users = await userRepository.find({ where: { role: role }, relations: ['profile', 'school'] });

        res.status(200).send(users);

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while getting user by role."
        });
    }
}
