const Users = require('../models/user')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign, refreshSign } = require("../utils/jwt")


module.exports.signupUser = (email, password, userName) => {
    return new Promise(async (resolve, reject) => {
        console.log('hai')

        const user = await Users.findOne({ where: { email: email, isActive: "true" } })

        if (!user) {

            data = {
                email: email,
                userName: userName
            }

            bcrypt.hash(password, saltRounds, async function (err, hash) {
                data.password = hash


                await Users.create(data).then((res) => {
                    if (res) {
                        return resolve({

                            message: "User SignUp Successfully",
                            code: "Success",
                        });
                    } else {
                        return reject({
                            message: "Error in Saving Data",
                            code: "ErrDataNotSaved"
                        })
                    }
                }).catch((err) => {
                    return reject({ message: err.message, code: "ERR" })
                })


            })
        } else {

            return reject({ message: "User Already Exists", code: "userAlreadyExist" });
        }

    });
};


module.exports.loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {

        const user = await Users.findOne({ where: { email: email, isActive: "true" } })

        if (user) {

            bcrypt.compare(password, user.password, async function (err, result) {
                if (result) {

                    let { token, refreshToken } = await sign(user);

                    // UsersRefreshToken.findOne({ where: { userid: user.id, isActive: true } }).then((res) => {
                    //     if (res) {
                    //         res.update({
                    //             refreshToken: sequelize.fn('array_append', sequelize.col('refreshToken'), refreshToken),
                    //             isActive: true
                    //         });
                    //     } else {
                    //         UsersRefreshToken.create({
                    //             userid: user.id,
                    //             refreshToken: [refreshToken],
                    //             isActive: true
                    //         });
                    //     }
                    // })


                    return resolve({
                        user: {
                            token,
                            refreshToken,
                        },
                        message: "User Login Successfull",
                        code: "Success",
                    });

                } else {
                    return reject({ message: "Password is wrong", code: "WrongPassword" })
                }
            })
        } else {
            return reject({ message: "User Not Found", code: "userNotFound" });
        }


    });
};