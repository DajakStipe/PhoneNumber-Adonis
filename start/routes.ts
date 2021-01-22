/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "HomeController.index");

Route.group(() => {
  Route.group(() => {
    Route.get("/number", "NumbersController.index");
    Route.get("/myNumbers", "NumbersController.getOnlyMyNumbers");
    Route.post("/number", "NumbersController.store");
    Route.patch("/number/:id", "NumbersController.update");
    Route.delete("/number/:id", "NumbersController.delete");
  }).middleware("auth");

  Route.group(() => {
    Route.get("/user", "UsersController.index");
    Route.get("/user/:id", "UsersController.single");
    Route.patch("/user/:id", "UsersController.update");
    Route.delete("/user/:id", "UsersController.delete");
  });

  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.login");
}).prefix("api");
