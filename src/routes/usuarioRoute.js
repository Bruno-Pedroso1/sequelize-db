import controller from '../controllers/usuarioController'

export default (app) => {
	app.delete('/usuario/:id', controller.destroy)
	app.get('/usuario', controller.get)
	app.get('/usuario/:id', controller.get)
	app.post('/usuario', controller.persist)
	app.patch('/usuario/:id', controller.persist)
}