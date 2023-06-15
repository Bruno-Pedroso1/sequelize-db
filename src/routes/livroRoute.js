import controller from '../controllers/livroController'

export default (app) => {
	app.delete('/livro/:id', controller.destroy)
	app.get('/livro', controller.get)
	app.get('/livro/:id', controller.get)
	app.post('/livro', controller.persist)
	app.patch('/livro/:id', controller.persist)
	app.get('/livro-disp', controller.getLivrosDisp)
	app.get('/livro/status/:id', controller.getStatus)
}