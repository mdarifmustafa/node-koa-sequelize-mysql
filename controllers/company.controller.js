module.exports = {
  async create(ctx) {
    try {
      const { name, city, address } = ctx.request.body;

      ctx.body = await ctx.db.Company.create({
        name,
        city,
        address,
        UserId: ctx.state.user,
      });
    } catch (err) {
      ctx.throw(500, `${err} company db creation failed!`);
    }
  },

  /**
   * @api {get} /companies get all companies
   * @apiGroup Companies
   * @apiName companyAll
   */
  async find(ctx) {
    try {
      ctx.body = await ctx.db.Company.findAll({
        UserId: ctx.state.user,
        include: {
          model: ctx.db.Job,
        },
      });
    } catch (err) {
      ctx.throw(500, `${err} companies fetching failed!`);
    }
  },

  /**
   * @api {get} /companies/id get specific company by id
   * @apiGroup Companies
   * @apiName companyGet
   * @apiParam {String} id Please provide company id in params
   */
  async findOne(ctx) {
    try {
      const company = await ctx.db.Company.findOne({
        where: { id: +ctx.params.id },
      });

      if (!company || company?.id !== +ctx.params.id)
        ctx.throw(404, "company id is invalid!");

      ctx.body = company;
    } catch (err) {
      ctx.throw(404, `${err?.message}`);
    }
  },

  /**
   * @api {delete} /companies/id remove specific company by id
   * @apiGroup Companies
   * @apiName companyDelete
   * @apiParam {String} id Please provide company id in params
   */
  async remove(ctx) {
    try {
      const result = await ctx.db.Company.destroy({
        where: { id: +ctx.params.id },
      });

      if (!result) {
        ctx.throw(404, "company id is invalid!");
      } else {
        ctx.body = `company with id ${+ctx.params.id} is deleted!`;
      }
    } catch (err) {
      ctx.throw(404, `${err?.message}`);
    }
  },

  /**
   * @api {put} /companies/id update company specific by id
   * @apiGroup Companies
   * @apiName companyUpdate
   * @apiParam {String} id Please provide company id in params
   */
  async update(ctx) {
    try {
      const { name, city, address } = ctx.request.body;

      const result = await ctx.db.Company.update(
        {
          name,
          city,
          address,
        },
        { where: { id: +ctx.params.id } }
      );

      if (!result) {
        ctx.throw(404, "company id is invalid!");
      } else {
        ctx.body = `company with id ${ctx.params.id} have been updated!`;
      }
    } catch (err) {
      ctx.throw(404, `${err?.message}`);
    }
  },
};
