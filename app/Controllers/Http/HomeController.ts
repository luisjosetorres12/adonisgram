 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class HomeController {
    public async index({view, auth}: HttpContextContract) {
        await auth.user?.preload('followings')
        const followings = auth.user?.followings.map(f => f.followingId)
        const userIds = [auth.user?.id, ...followings ?? []]
        const posts = await Post.query().whereIn('user_id', userIds).preload('user')
        return view.render('welcome', {posts})
    }
}
