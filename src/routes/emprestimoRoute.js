import controller from '../controllers/emprestimoController'

export default (app) => {
	app.delete('/emprestimo/:id', controller.destroy)
	app.get('/emprestimo', controller.get)
	app.get('/emprestimo/:id', controller.get)
	app.post('/emprestimo', controller.persist)
	app.patch('/emprestimo/:id', controller.persist)
	app.post('/emprestimo/verificar/:id', controller.verificar)
}