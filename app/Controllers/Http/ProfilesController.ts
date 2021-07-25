import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { nanoid } from 'nanoid'

export default class ProfilesController {
    public async index({view, params, auth}:HttpContextContract){
      const username = params.username
      const user = await User.findBy('username', username)
      if(!user){
        return view.render('errors.not-found')
      }


      await user.preload('posts')
      await auth.user.preload('followings')
      const followors = await auth.user?.followers()
      console.log(followors)
      return view.render('profile', {user, followors})
    }

    public async edit({ view }:HttpContextContract) {
      return view.render('accounts/edit')
    }

    public async update({auth, request , response}:HttpContextContract) {
      const user = auth.user
      const avatar = request.file('avatar')
      
      if (!user) {
        return response.status(401).redirect('/')
      }
      if(avatar){
        const imageName = new Date().getTime().toString() + nanoid() + `.${avatar.extname}`
        await avatar.move(Application.publicPath('images'),{
          name: imageName
        })
        user.avatar = `images/${imageName}`
      }
      
      let paramDetails = request.only(['details'])
      user.details = paramDetails?.details
      console.log(user.details)
      
      await user.save()
      console.log(user)
      return response.redirect(`/${user.username}`)
    }
}
