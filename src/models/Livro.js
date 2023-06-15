import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import Categorias from "./Categoria";
import Autores from "./Autor";

const Livros = sequelize.define(
  'livros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    sinopse: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Livros.belongsTo(Categorias, {
  as: 'categorias',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idCategoria',
    field: 'id_categoria',
    allowNull: false
  }
});

Livros.belongsTo(Autores, {
  as: 'autores',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
  foreignKey: {
    name: 'idAutor',
    field: 'id_autor',
    allowNull: false
  }
});

export default Livros;