const bcrypt = require('bcrypt');
const { sequelize } = require('./db');
const { User } = require('./models');

const SALT_COUNT = 10;

const run = async () => {
  try {

    /* *************** SETUP *************** */
    await sequelize.sync({force: true});
    const userJohn = {username: 'johnDoe', password: 'test123'};
    const userJohn2 = {username: 'johnDoe2', password: 'test123'};

    console.log("Let's start hashing some passwords!");

    /* *************** START DEMO *************** */
    const hashedPassword = await bcrypt.hash(userJohn.password, SALT_COUNT)
    const hashedPassword2 = await bcrypt.hash(userJohn2.password, SALT_COUNT)
    console.log('hashedPassword: ', hashedPassword)
    console.log('hashedPassword2: ', hashedPassword2)


    const isAMatch = await bcrypt.compare(userJohn.password, hashedPassword)
    if (isAMatch === true) {
      console.log("passwords match!")
    } else if (isAMatch === false) {
      console.log("incorrect password")
    }

    const hashedPassswordForUser = await bcrypt.hash(userJohn.password, SALT_COUNT)
    const safeUser = await User.create({
      username: userJohn.username,
      password: hashedPasswordForUser
    })
    console.log(">>>>>>>>>>> safeUser", safeUser.get({plain:true}))


    const unsafeUser = await User.create({
      username: userJohn2.username,
      password: userJohn2.password
    })
    console.log(">>>>>>>>>>>> unsafeUser", unsafeUser.get({plain:true}))



  } catch (error) {
    console.error(error)
  } finally {
    sequelize.close();
  }
}


run();
