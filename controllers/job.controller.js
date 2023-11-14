module.exports = {
  async create(ctx) {
    try {
      const { title, companyId } = ctx.request.body;

      ctx.body = await ctx.db.Job.create({
        title,
        CompanyId: companyId
      });
    } catch (err) {
      ctx.throw(500, `${err} job db creation failed!`);
    }
  },
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Job.findAll()
    } catch (err) {
      ctx.throw(500, `${err} jobs fetching failed!`);
    }
  },
  async findOne(ctx) {
    try {
      const job = await ctx.db.Job.findOne({ where: {id: +ctx.params.id }})

      if (!job || job?.id !== +ctx.params.id) ctx.throw(404, 'job id is invalid!')

      ctx.body = job
    } catch (err) {
      ctx.throw(404, `${err?.message}`);
    }
  },
  async remove(ctx) {
    try {
      const result = await ctx.db.Job.destroy({ where: {id: +ctx.params.id }})

      if (!result) {
        ctx.throw(404, 'job id is invalid!')
      } else {
        ctx.body = `job with id ${+ctx.params.id} is deleted!`
      }
    } catch (err) {
      ctx.throw(404, `${err?.message}`)
    }
  },
  async update(ctx) {
    try {
      const { title, companyId } = ctx.request.body

      const result = await ctx.db.Job.update({
        title, 
        CompanyId: companyId
      }, { where: { id: +ctx.params.id }})

      if (!result) {
        ctx.throw(404, 'job id is invalid!')
      } else {
        ctx.body = `job with id ${ctx.params.id} have been updated!`
      }

    } catch (err) {
      ctx.throw(404, `${err?.message}`)
    }
  }
};
