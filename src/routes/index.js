import categoriasRoute from "./categoriasRoute"
import autorRoute from "./autorRoute"
import emprestimoLivroRoute from "./emprestimoLivroRoute"
import emprestimoRoute from "./emprestimoRoute"
import livroRoute from "./livroRoute"
import usuarioRoute from "./usuarioRoute"


export function Routes(app){
  categoriasRoute(app);
  autorRoute(app);
  emprestimoLivroRoute(app);
  emprestimoRoute(app);
  livroRoute(app);
  usuarioRoute(app);
}