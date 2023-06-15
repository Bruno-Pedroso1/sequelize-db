import Livros from "../models/Livro";
import Livro from "../models/Livro";
const { Op } = require("sequelize");

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      let response = await Livro.findAll({
        order: [['id', 'asc']]
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response
      });
    };

    let response = await Livro.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: []
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}

const persist = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res)
    }

    return await update(id, req.body, res)
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error
    });
  }
}

const create = async (dados, res) => {
  let { id, titulo, sinopse } = dados;

  let response = await Livro.create({
    id,
    titulo,
    sinopse
  });

  return res.status(200).send({
    type: 'success',
    message: `Cadastro realizado com sucesso`,
    data: response
  });
}

const update = async (id, dados, res) => {
  let response = await Livro.findOne({ where: { id } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: []
    });
  }

  Object.keys(dados).forEach(field => response[field] = dados[field]);

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response
  });
}

const destroy = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: `Informe um id para deletar o registro`,
        data: []
      });
    }

    let response = await Livro.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: []
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: []
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message
    });
  }
}



const getLivrosDisp = async (req, res) => {
  try {
    let livros = await Livro.findAll();
    let livrosDisponiveis = [];
    for (let livro of livros) {
      let emprestimos = await livro.getEmprestimos({
        where: {
          devolucao: {
            [Op.is]: null
          }
        }
      });
      if (!emprestimos.length) {
        livrosDisponiveis.push(livro)
      }
    };
    return res.status(200).send(livrosDisponiveis);
  } catch (error) {
    return res.status(400).send(error);
  }
}

const getStatus = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    let livros = await Livro.findOne({ where: { id } });
    let emprestimos = await livros.getEmprestimos({
      where: {
        devolucao: {
          [Op.is]: null
        }
      }
    });
    let livro = livros.toJSON();
    if (!emprestimos.length) {
      livro.status = 'disponivel'
    } else {
      livro.status = 'indisponivel'
    }
    return res.status(200).send({
      type: 'sucess',
      message: 'oi',
      data: livro
    })
      ;
  } catch (error) {
    return res.status(400).send({
      type: 'error',
      message: 'deu erro',
      error: error.message
    });
  }
}


export default {
  get,
  persist,
  destroy,
  getLivrosDisp,
  getStatus
}