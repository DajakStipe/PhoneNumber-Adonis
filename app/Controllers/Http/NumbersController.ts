import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import Number from "App/Models/Number";

export default class NumbersController {
  public async index({ request }) {
    const page = request.input("page", 1);
    const limit = request.input("per_page", 10);
    return Number.query().paginate(page, limit);
  }
  public async store({ request, response, auth }: HttpContextContract) {
    const userr = auth.user!.id;
    const validations = await schema.create({
      number: schema.string({}, [
        rules.unique({ table: "numbers", column: "number" }),
      ]),
    });

    await request.validate({ schema: validations });

    Number.create({
      number: request.input("number"),
      is_favorite: false,
      user: userr,
    });

    return response.status(201).json({ created: true });
  }
  public async getOnlyMyNumbers({ response, auth }: HttpContextContract) {
    const userr = auth.user!.id;

    const myNumbers = await Number.query().where("user", userr);

    return response.status(201).json(myNumbers);
  }

  public async update({
    request,
    response,
    params,
    auth,
  }: HttpContextContract) {
    const number = await Number.findOrFail(params.id);

    const userr = auth.user!.id;

    if (number.user !== userr) {
      return response
        .status(200)
        .json({ error: "That number does not belong to you" });
    }

    number.number = request.input("number");
    number.is_favorite = request.input("is_favorite");
    number.save();
    return response.status(202).send(number);
  }
  public async delete({ response, params, auth }: HttpContextContract) {
    const number = await Number.findOrFail(params.id);

    const userr = auth.user!.id;

    if (number.user !== userr) {
      return response
        .status(400)
        .json({ error: "You can not delete number that isn't yours" });
    }
    number.delete();
    return response.status(200).json({ deleted: "success" });
  }
}
