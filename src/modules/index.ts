import { Application } from 'express'

import main from './main.routes'
import { AuthRoutes } from './auth/auth.routes'
import { UserRoutes } from './user/user.routes'

export function modules(app: Application) {

    app.use(main())
    app.use('/auth', AuthRoutes())
    app.use('/user', UserRoutes())


    return app
}