import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async(req: Request, res: Response) => {
  const usuario = await Usuario.findAll()
  res.json({
    'registros': usuario.length,
    usuario
  })
}
export const getUsuario = async(req: Request, res: Response) => {
  const {id} = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: 'Usuario not found'
    })
  }
  res.json({
    usuario
  })
}
export const postUsuario = async(req: Request, res: Response) => {
  const body = req.body;
  try {
    const existeEmail = await Usuario.findOne({
      where: { email: body.email }
    })
    if (existeEmail) { 
      return res.status(400).json({
        msg: 'El usuario ya existe'
      })
    }

    await Usuario.create(body)
    res.json(body);
  } catch (error) {
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}
export const putUsuario = async(req: Request, res: Response) => {
  const {id} = req.params;
  const {body} = req;
  try {
    const usuario = await Usuario.findByPk( id );
    if(!usuario) {
      return res.status(404).json({
        msg: 'El usuario que busca actualizar no existe'
      })
    }
    await usuario.update(body);
    res.json({
      msg: 'postUsuario',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}
export const deleteUsuario = async(req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const usuario = await Usuario.findByPk( id );
    if(!usuario) {
      return res.status(404).json({
        msg: 'El usuario que busca actualizar no existe'
      })
    }
    await usuario.update({estado: false});
    res.json({
      msg: 'deleteUsuario',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}