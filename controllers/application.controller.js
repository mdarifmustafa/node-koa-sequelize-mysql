module.exports = {
  async create(ctx) {
    try {
      const { firstName, lastName, email, jobId } = ctx.request.body;

      const candidate = await ctx.db.Candidate.create({
        firstName,
        lastName,
        email,
      });

      ctx.body = await ctx.db.Application.create({
        JobId: jobId,
        CandidateId: candidate.id
      })

    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
