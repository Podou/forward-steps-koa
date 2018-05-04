import Koa from 'koa';
// import Router from 'koa-router';

import router from './routes';

const app = new Koa();
// const router = new Router();

// router.get('/', (ctx, next) => {
//   ctx.body = 'Hello World';
// });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log('Request http://localhost:3000');
