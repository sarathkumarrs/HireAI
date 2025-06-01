const userModule = require('../modules/user')

module.exports.signupUser = async (req, res, next) => {
    console.log('haii')
  try {
    let { email, password, userName } = req.body;
    let data = await userModule.signupUser(email, password, userName);
    return res.json(data);
  } catch (error) {
    res
      .status(422)
      .json({ errors: { body: [error.message], code: [error.code] } });
  }
};

module.exports.loginUser = async (req, res, next) => {
    console.log('user login clickd')
  try {
    let { email, password } = req.body;
    let data = await userModule.loginUser(email, password);
    return res.json(data);
  } catch (error) {
    res
      .status(422)
      .json({ errors: { body: [error.message], code: [error.code] } });
  }
};
