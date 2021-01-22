import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Number from "App/Models/Number";

import User from "App/Models/User";

export default class UsersController {
  public async index() {
    return User.all();
  }

  public async update({ request, response, params }: HttpContextContract) {
    const user = await User.find(params.id);

    if (user) {
      user.email = request.input("email");
      user.password = request.input("password");
      user.save();
      return response.status(202).send(user);
    } else {
      return response.status(200).json({ error: "User not found" });
    }
  }
  public async single({ response, params }: HttpContextContract) {
    const user = await User.find(params.id);
    if (user) {
      return response.status(200).json(user);
    } else {
      return response.status(200).json({ error: "User not found" });
    }
  }
  public async delete({ response, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);

    // delete all numbers whose owner is the user who is about to get deleted
    await Number.query().where("user", user.id).delete();

    user.delete();
    return response.status(200).json({ deleted: "success" });
  }
}
