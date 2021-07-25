import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export const UserFactory = Factory
    .define(User, ({ faker })  => {
        return {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            username: faker.internet.userName(),
            avatar: faker.image.avatar(),
            details: faker.lorem.paragraph(1),
            password: faker.internet.password(),
            email_verified_at: DateTime.local()
        }
    })
    .relation('posts', () => PostFactory)
    .build()

export const PostFactory = Factory
    .define(Post, ({ faker })  => {
        return {
            image: faker.image.sports(),
            caption: faker.lorem.paragraph(1)
        }
    })
    .build()