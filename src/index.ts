import 'reflect-metadata'
import { createConnection, InsertResult } from 'typeorm'
import express, { Request, Response } from 'express'
import { validate } from 'class-validator'

import { User } from './entity/User'
import { School } from './entity/School'
import { Institute } from './entity/Institute'
import { Profile } from './entity/Profile'

import cors from 'cors';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();

const corsOptions = {
  // origin: '*', 
  origin: process.env.FRONTEND_BASE_URL,
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Origin",
};
// intercept pre-flight check for all routes
app.options("*", cors(corsOptions));	// OR // app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  next();
});

app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import demo from './middleware/demo';
import UserRouter from './router/UserRouter'

createConnection()
  .then(async (connection) => {
    app.listen(5000, () => console.log('Server up at http://localhost:5000'));

    // creating a middleware to pass connection to all routes in database as a local variable
    // connection is require to get repositories -> will be use in middlewares/ routers.
    const dbConnection = (req: Request, res: Response, next) => {
      // console.log("setting connection as locals variable");
      res.locals.connection = connection;
      next();
    }
    app.use(dbConnection);

    app.use('/user', UserRouter);

    app.get('/', demo, (req: Request, res: Response) => {
      res.send("Welcome to YIE User management.")
    })

     
    const userRepository = connection.getRepository(User);
    const profileRepository = connection.getRepository(Profile);
    const instituteRepo = connection.getRepository(Institute);
    const SchoolRepo = connection.getRepository(School);

    // const user1 = new User();
    // user1.email = "abcd@gmail.com";
    // user1.password = "Parshu@123";
    // user1.username = "ABCD";

    // const profile1 = new Profile();
    // profile1.fullName = "ABCD";
    // profile1.address = "aBBBBBBB";
    // profile1.contactNumber = "2564568975";
    // profile1.age = 25;
    // profile1.parentName = "AAA BBB CCC";

    // user1.profile = profile1;

    // const school = new School();
    // school.name = "bababa";
    // school.users = [user1]; 

    // user1.school = school;

    // const institute = new Institute();
    // institute.address = "ajaja";
    // institute.name = "hshshs";
    // institute.schools = [school];

    // await profileRepository.save(profile1);
    // await SchoolRepo.save(school);
    // await userRepository.save(user1);
    // await instituteRepo.save(institute);

    // const schoolNew = await SchoolRepo.findOne({ where: { id: 'acbe6497-af89-4111-bbc9-52b86057890c'} });

    // ====================================

    // const instituteOld = await instituteRepo.findOne({ where: {id: 'ff48f44d-c8cf-48d9-a29c-00557999538a'} });

    // const school = new School();
    // school.name = "AAAAA";
    // school.institute = instituteOld;

    // await SchoolRepo.save(school);

    // ====================================


    const user = await userRepository.find({ relations: ['profile', 'school'] });
    const schools = await SchoolRepo.find({ relations: ['institute'] });
    const institutes = await instituteRepo.find({});
    console.log(user);
    console.log(schools);
    console.log(institutes);

  })
  .catch((error) => console.log(error))
