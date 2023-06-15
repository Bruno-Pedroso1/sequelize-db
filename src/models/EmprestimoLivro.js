import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import Emprestimo from "./Emprestimo";
import Livros from "./Livro";

const EmprestimoLivros = sequelize.define(
  'emprestimo_livros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Emprestimo.belongsToMany(Livros, {
  through: EmprestimoLivros,
  as: 'livros',
  foreignKey: {
    name: 'idEmprestimo',
    field: 'id_emprestimo',
    allowNull: false
  }
});

Livros.belongsToMany(Emprestimo, {
  through: EmprestimoLivros,
  as: 'emprestimos',
  foreignKey: {
    name: 'idLivro',
    field: 'id_livro',
    allowNull: false
  }
});

export default EmprestimoLivros;