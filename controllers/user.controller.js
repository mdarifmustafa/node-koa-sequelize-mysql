const UtilService = require("../services/util.service");
const JwtService = require("../services/jwt.service");

module.exports = {

  /**
   * @api {post} /signup user signup
   * @apiGroup Users
   * @apiName userSignup
   * @apiBody {String} email User must provide email
   * @apiBody {String} password User must provide password
   * @apiParamExample {json} Request Body
   * {
   *   "email": "email_id",
   *   "password": "password" 
   * }
   * @apiParam {String} email User must provide email
   * @apiParam {String} [password] User must provide password
   * @apiSuccess {String} message: Sign up Successful!
   * @apiError {String} email Please check your <code>email</code>.
   * @apiError {String} password Please check your <code>password</code>.
   */
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
  /**
   * @api {get} /login user login
   * @apiGroup Users
   * @apiName userLogin
   * @apiBody {String} email User must provide email
   * @apiBody {String} password User must provide password
   * @apiParamExample {json} Request Body
   * {
   *   "email": "email_id",
   *   "password": "password" 
   * }
   * @apiSuccess {String} token: bearer "token_value"
   * @apiError {String} email invalid login credentials!
   * @apiError {String} password invalid login credentials!
   */
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
