import { User } from "../entity/User";


module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, schoolId, age, address, contactNo, parentName, className } = req.body;

        const connection = res.locals.connection;
        const userRepository = connection.getRepository(User);

        const user = await userRepository.find({id});


        const profile = await userRepository.update({id})
        const users = await userRepository.update({id}, {});


        const user = new User();
        // user
        //  continue....
        
        const isUsernameAlreadyExits = await User.findOne({ where: { username } })
        console.log(">>>>>>>>>>", isUsernameAlreadyExits, "<<<<<<<<<<<<");

        if(isUsernameAlreadyExits) {
            return res.status(400).send({status: "failed", message: "Username is not available! Try for another username."})
        }

        User.findOne({
            where: { id: id }
        })
            .then(user => {
                if (user) {
                    const updateUserdetails = { username, schoolId, age, address, contactNo, parentName, className };

                    user.update(updateUserdetails)
                        .then(function (updatedUser) {
                            console.log(updatedUser);
                            res.status(200).send(updatedUser);
                        })
                        .catch(err => {
                            res.status(500).send({ status: "failed", message: err.message || "some error ocurred while updaring a user" });
                        });
                } else {
                    console.log("user not found");
                    return res.status(400).send({ status: "failed", message: `User not found with id= ${id}` })
                }


            })

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: error.message || "Some error occurred while updating a user."
        });
    }
}