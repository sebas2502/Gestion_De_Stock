import { Request, Response } from "express";
import { DashboardServices } from "../services/DashboardServices";

export class DashboardController {
  private service = new DashboardServices();

  constructor(){
    this.getDashboard = this.getDashboard.bind(this);
  }    
  
  async getDashboard(req: Request, res: Response) {
    try {
      const empresa_id = (req as any).user.empresa_id;

      const data = await this.service.getDashboardData(empresa_id);
      
      return res.json(data);
    } catch (error: any) {
      console.error("Error en el controlador del dashboard:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}
