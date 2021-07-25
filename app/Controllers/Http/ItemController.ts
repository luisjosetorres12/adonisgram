import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ItemsController {
  public index(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        title: 'Llaves'
      }, 
      {
        id: 2,
        title: 'Celular'
      }
    ]
  }
}