// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index() {
    return { hello: "adonis api" };
  }
}
