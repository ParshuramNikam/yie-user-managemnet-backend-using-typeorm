import "reflect-metadata";
import { createConnection } from "typeorm";
import { Institute } from "./entity/Institute";
import { Profile } from "./entity/Profile";
import { School } from "./entity/School";
import { User } from "./entity/User";

createConnection().then(async connection => {

    const userRepository = connection.getRepository(User);
    const profileRepository = connection.getRepository(Profile);

    const instituteRepo = connection.getRepository(Institute);
    const SchoolRepo = connection.getRepository(School);

    const profile1 = new Profile();
    profile1.age = 25;
    profile1.address = "ahaha";
    profile1.fullName = "AAA BBB CCC";
    profile1.parentName = "Aaa";
    profile1.contactNumber = "1256425";

    const user1 = new User();
    user1.email = "abcd@gmail.com";
    user1.password = "Parshu@123";
    user1.username = "aaaa"

    const school1 = new School();
    school1.name = "aahah";

    const institute1 = new Institute();
    institute1.name = "ABCD";
    institute1.address = "aagag";

    user1.profile = profile1;
    user1.school = [school1];
    school1.institute = institute1;
    institute1.schools = [school1];
    
    await profileRepository.save(profile1);
    await instituteRepo.save(institute1);
    await SchoolRepo.save(school1);
    
    await userRepository.save(user1);
    
    let userDetails = await userRepository.find({ relations: ['profile', 'school'] })

    console.log(userDetails);


}).catch(error => console.log(error));
