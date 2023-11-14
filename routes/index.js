const Router = require('koa-router')
const { CompanyController, JobController } = require('../controllers')

const router = new Router()

// define all your company routes
router.post('/companies', CompanyController.create)

router.get('/companies', CompanyController.find)

router.get('/companies/:id', CompanyController.findOne)

router.delete('/companies/:id', CompanyController.remove)

router.put('/companies/:id', CompanyController.update)

// define all your job routes
router.post('/jobs', JobController.create)

router.get('/jobs', JobController.find)

router.get('/jobs/:id', JobController.findOne)

router.delete('/jobs/:id', JobController.remove)

router.put('/jobs/:id', JobController.update)


module.exports = router