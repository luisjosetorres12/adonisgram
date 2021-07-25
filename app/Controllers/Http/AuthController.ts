import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules,schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  
  public async signup({request, response}:HttpContextContract ){
    const val = await request.validate({
        schema: schema.create({
        name: schema.string(),
        email: schema.string({},[
          rules.email()
        ]),
        password: schema.string({},[
          rules.confirmed()
        ]),
        username: schema.string()
        }
      ),
      messages: {
        'name.required' : 'Por favor ingrese un nombre',
        'email.required' : 'Por favor ingrese un email',
        'password.required' : 'Por favor ingrese un password',
        'password.confirmed' : 'Los passwords son diferentes',
        'username.required' : 'Por favor ingrese un nombre de usuario'
      }
    })

    const user = new User()
    user.name = val.name
    user.password = val.password
    user.email = val.email
    user.username = val.username
    await user.save();

    //Send Verification Emails
    user?.sendVerificationEmail()

    return response.redirect('/')
  }

  public async login({request, response, auth}:HttpContextContract) {
    const req = await request.validate({ schema:schema.create({
        email: schema.string({}, [
          rules.email()
        ]),
        password: schema.string({},[
          rules.minLength(8)
        ])
      }),
      messages: {
        'email.required' : 'Por favor ingrese un email',
        'password.required' : 'Por favor ingrese un password',
        'password.minLength':'Password deberia ser minimo 8 caracteres'
      }
    })

    const email = req.email
    const password = req.password
    const user = await auth.attempt(email, password)
    return response.redirect(`/${user.username}`);
  }

  public async logout({auth, response}:HttpContextContract){
    await auth.logout()

    return response.redirect('/')
  }
}
