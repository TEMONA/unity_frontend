import express from 'express'
const router = express.Router()
const app = express()

router.use((req: any, res: any, next) => {
	Object.setPrototypeOf(req, app.request)
	Object.setPrototypeOf(res, app.response)
	req.res = res
	res.req = req
	next()
})

router.post('/login', (req: any, res: any) => {
	if (req.body.authorization) {
		req.session.authorization = req.body.authorization
		return res.json(req.body.authorization)
	}
	res.status(401).json({ message: 'ログイン情報がありません' })
})

router.delete('/logout', (req: any, res: any) => {
	delete req.session.authorization
	res.json({ message: 'OK' })
})

export default {
	path: '/api',
	handler: router,
}
