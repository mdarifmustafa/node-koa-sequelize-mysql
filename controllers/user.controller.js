const UtilService = require("../services/util.service");
const JwtService = require("../services/jwt.service");

module.exports = {
  async signup(ctx) {
    try {
      let { email, password } = ctx.request.body;

      if (!email) ctx.throw(400, "please provide the email");

      if (!password) ctx.throw(400, "please provide the password");

      const encryptedPassword = await UtilService.hashPassword(password);

      await ctx.db.User.create({
        email,
        password: encryptedPassword,
      });

      ctx.body = "SignUp Successful!";
    } catch (err) {
      ctx.throw(500, `${err.message}`);
    }
  },
  async login(ctx) {
    try {
      let { email, password } = ctx.request.body;

      if (!email) ctx.throw(400, "please provide the email");

      if (!password) ctx.throw(400, "please provide the password");

      const user = ctx.db.User.findOne({ where: { email } });

      const matched = await UtilService.comparedPassword(
        password,
        user.password
      );

      if (matched) {
        const token = JwtService.issue(
          {
            payload: {
              user: user.id,
              firstName: user.firstName,
              email: user.email,
            },
          },
          "1 day"
        );

        ctx.body = token;
      } else {
        ctx.throw(500, "invalid login credentials!");
      }
    } catch (err) {
      ctx.throw(500, `${err.message}`);
    }
  },
};
