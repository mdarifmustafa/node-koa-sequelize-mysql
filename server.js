const Koa = require("koa");
const bodyParser = require("koa-parser");
const router = require("./routes");

const app = new Koa();

const db = require("./models");

db.sequelize
// .sync({ force: true })
  .sync()
  .then(() => console.log("models synced"))
  .catch((err) => console.log(err));

app.context.db = db;

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());

const PORT = 4000;
app.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);
