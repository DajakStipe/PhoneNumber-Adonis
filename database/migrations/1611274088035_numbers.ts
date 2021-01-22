import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Numbers extends BaseSchema {
  protected tableName = "numbers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("number");
      table.boolean("is_favorite");
      table.integer("user");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
