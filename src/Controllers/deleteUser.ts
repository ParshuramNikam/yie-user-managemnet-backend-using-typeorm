import { Profile } from "../entity/Profile";
import { User } from "../entity/User";

module.exports = async (req, res) => {
    try {

        const id = req.params.id;

        const connection = res.locals.connection;
        const userRepository = connection.getRepository(User);
        const profileRepository = connection.getRepository(Profile);

        const isUserDeleted = await userRepository.findOne(
            {
                where: { id: id },
                relations: ['profile', 'school']
            }
        );

        console.log("user deleted : ", isUserDeleted);

        if (!isUserDeleted) {
            res.status(400).send({ status: "failed", message: `User not found!` })
            return;
        }

        console.log(">>>>>>>>>> "+ isUserDeleted.profile.id );
        
        await profileRepository.delete({
            id: isUserDeleted.profile.id
        })

        await userRepository.delete({
            id: id
        }).then(() => console.log("deleted..."));

        console.log(`user with id=${id} deleted sucessfully!`);
        res.status(200).send({ status: "success", message: `user with id= ${id} deleted sucessfully!` })

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while deleteing a user"
        });
    }
}
