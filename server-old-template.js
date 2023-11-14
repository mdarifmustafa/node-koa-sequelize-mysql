const Koa = require("koa");
const Router = require("koa-router");
const posts = require("./mocks/posts");
const koaParser = require("koa-parser");

const _ = require("lodash");

const app = new Koa();
const router = new Router();

const PORT = 4000;

router.get("/", async (ctx, next) => {
  ctx.body = "Welcome to Koa Router";
  return await next();
});

router.get("/posts", async (ctx, next) => {
  ctx.body = posts;
  return await next();
});

router.get("/posts/:id", async (ctx, next) => {
  const post = posts.find((post) => post.id === +ctx.params.id);

  if (!post) ctx.throw(400, "post not found!");

  ctx.body = post;

  return await next();
});

router.delete("/posts/:id", async (ctx, next) => {
  const post = posts.find((post) => post.id === +ctx.params.id);

  if (!post) ctx.throw(400, "post not found!");

  ctx.body = _.remove(posts, (p) => p.id === +ctx.params.id);

  return await next();
});

router.post("/posts", async (ctx, next) => {
  if (!ctx.request.body) ctx.throw(400, "request is required objet");

  const { userId, id, title, body } = ctx.request.body;

  if (!userId) ctx.throw(400, "userId is required field");

  if (!id) ctx.throw(400, "id is required field");

  if (!title) ctx.throw(400, "title is required field");

  if (!body) ctx.throw(400, "body is required field");

  posts.push({ userId, id, title, body });

  ctx.body = posts;

  return await next();
});

router.put("/posts/:id", async (ctx, next) => {
  if (!ctx.request.body) ctx.throw(400, "request is required objet");

  const { body } = ctx.request.body;

  if (!body) ctx.throw(400, "body is required field");

  const index = _.findIndex(posts, { id: +ctx.params.id})

  if (index !== -1) {
    ctx.body = _.merge(posts[index], { ...posts[index], body: body })
  } else {
    ctx.throw(400, "post not found!");
  }

  return await next();
});

app.use(koaParser()).use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
console.log(`Server is listening on PORT ${PORT}`);
