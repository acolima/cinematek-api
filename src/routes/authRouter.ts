import { Request, Response, Router } from 'express'

const authRouter = Router()

authRouter.post('/sign-in', (req: Request, res: Response) => res.send('oi'))

export default authRouter
