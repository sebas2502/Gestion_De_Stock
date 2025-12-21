export class AppError extends Error{
    
    public statusCode : number;

    constructor(mensaje:string , statusCode:number){
        super(mensaje);
        this.statusCode = statusCode;
    }

}