import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Number extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public number: number;

  @column()
  public user: number;

  @column()
  public is_favorite: boolean;

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => value.toFormat("yyyy LLL dd"),
  })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => value.toFormat("yyyy LLL dd"),
  })
  public updatedAt: DateTime;
}
