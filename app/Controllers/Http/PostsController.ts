import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { nanoid } from 'nanoid'
import Application from '@ioc:Adonis/Core/Application'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({view}: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store ({request, auth, response}: HttpContextContract) {
    
    const req = await request.validate({
      schema: schema.create({
        caption: schema.string(),
        image: schema.file()
      }),
      messages: {
        'caption.required' : 'Por favor ingrese una descripcion',
        'image.required' : 'Por favor adjunte una imagen'
      }
    }) 
    const archive = req.image
    
    if (!auth.user) {
      return response.redirect().back()
    }

    const imageName = new Date().getTime().toString() + nanoid() + `.${archive.extname}`
    await archive.move(Application.publicPath('images'),{
      name: imageName
    })


    const post = new Post()
    post.image = `images/${imageName}`
    post.caption = request.input('caption')
    post.userId = auth.user.id
    post.save()

    return response.redirect(`/${auth.user.username}`)
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
