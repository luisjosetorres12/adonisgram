import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Followings extends BaseSchema {
  protected tableName = 'followings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.integer('following_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
