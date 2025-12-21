import { Request, Response } from "express";
import { CategoriaServices } from "../services/CategoriaServices";

export class CategoriaController {
  constructor(private service: CategoriaServices) {}

  listar = async (req: Request, res: Response) => {
    try {
      const empresa_id = (req as any).user.empresa_id;
   
      const data = await this.service.listar(empresa_id);
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  obtener = async (req: Request, res: Response) => {
    try {
      const empresa_id = (req as any).user.empresa_id;
      const id = Number(req.params.id);
      const data = await this.service.obtener(empresa_id, id);
      res.json(data);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  crear = async (req: Request, res: Response) => {
    try {
      const empresa_id = (req as any).user.empresa_id;
      const data = await this.service.crear(empresa_id, req.body);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  actualizar = async (req: Request, res: Response) => {
    try {
      const empresa_id = (req as any).user.empresa_id;
      const id = Number(req.params.id);
      const data = await this.service.actualizar(empresa_id, id, req.body);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  eliminar = async (req: Request, res: Response) => {
    try {
      const empresa_id = (req as any).user.empresa_id;
      const id = Number(req.params.id);
      await this.service.eliminar(empresa_id, id);
      res.json({ mensaje: "Categoría eliminada" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
}
