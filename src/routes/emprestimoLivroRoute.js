import controller from '../controllers/emprestimoLivroController'

export default (app) => {
	app.delete('/emprestimolivro/:id', controller.destroy)
	app.get('/emprestimolivro', controller.get)
	app.get('/emprestimolivro/:id', controller.get)
	app.post('/emprestimolivro', controller.persist)
	app.patch('/emprestimolivro/:id', controller.persist)
}