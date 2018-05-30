const prefix = '/blockchain';

export default (router) => {
  router.get([`${prefix}`, `${prefix}/`], (ctx) => {
    ctx.body = 'This is blockchain test api.';
  });
};
