const Router = require("koa-router");
const {
  CompanyController,
  JobController,
  ApplicationController,
  UserController,
} = require("../controllers");

const authenticationPolicy = require("../policies/authentication.policy");

const router = new Router();

// define all your company routes
router.post("/companies", authenticationPolicy, CompanyController.create);

router.get("/companies", authenticationPolicy, CompanyController.find);

router.get("/companies/:id", authenticationPolicy, CompanyController.findOne);

router.delete("/companies/:id", authenticationPolicy, CompanyController.remove);

router.put("/companies/:id", authenticationPolicy, CompanyController.update);

// define all your job routes
router.post("/jobs", authenticationPolicy, JobController.create);

router.get("/jobs", authenticationPolicy, JobController.find);

router.get("/jobs/:id", authenticationPolicy, JobController.findOne);

router.delete("/jobs/:id", authenticationPolicy, JobController.remove);

router.put("/jobs/:id", authenticationPolicy, JobController.update);

// define all your application routes
router.post(
  "/applications",
  authenticationPolicy,
  ApplicationController.create
);

// router.get("/applications", ApplicationController.find);

// router.get("/applications/:id", ApplicationController.findOne);

// define all your user routes
router.post("/signup", UserController.signup);

router.get("/login", UserController.login);

module.exports = router;
