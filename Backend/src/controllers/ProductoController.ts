import { Request, Response } from "express";
import { ProductoServices } from "../services/ProductoServices";
import { AppError } from "../errors/AppError";

export class ProductoController {
  constructor(private service: ProductoServices) {}

  listar = async (req: Request, res: Response) => {
    try {
      
      const empresa_id = (req as any).user.empresa_id;
      const productos = await this.service.listar(empresa_id);
      res.json(productos);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  obtener = async (req: Request, res: Response) => {
    try {
      const empresa_id = (req as any).user.empresa_id;
      const id = Number(req.params.id);
      const prod = await this.service.obtener(empresa_id, id);
      res.json(prod);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  crear = async (req: Request, res: Response) => {
   
    try {
      const empresa_id = (req as any).user.empresa_id;
      const { stock , stock_minimo } = req.body;
      if (stock < 0) {
          return res.status(400).json({ error: "El stock no puede ser negativo" });
      }

      if (stock_minimo < 0) {
          return res.status(400).json({ error: "El stock mínimo no puede ser negativo" });
      }


      const prod = await this.service.crear(empresa_id, req.body);
      res.json(prod);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  actualizar = async (req: Request, res: Response) => {
    try {
      
      console.log(req.body)
      const empresa_id = (req as any).user.empresa_id;
      const id = Number(req.params.id);
      
      
      const { stock_minimo } = req.body;
      if (stock_minimo < 0) {
          return res.status(400).json({ error: "El stock mínimo no puede ser negativo" });
      }

      const prod = await this.service.actualizar( id,empresa_id, req.body);
      res.json(prod);
    } catch (error: any) {
      if (error instanceof AppError) {
        

      return res.status(error.statusCode).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: "Error interno del servidor"
    });
    }
  };

  eliminar = async (req: Request, res: Response) => {
    try {
           

     const empresa_id = (req as any).user.empresa_id;
     const id = Number(req.params.id);
    
     await this.service.eliminar(id,empresa_id);
    
    res.json({ mensaje: "Producto eliminado" });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: "Error interno del servidor"
    });
     

    }
  };
}
