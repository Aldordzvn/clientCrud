export interface ICliente{
    id?: string;
    nombre: string,
    apellido: string,
    genero: string,
    direccion:{
        fracc: string,
        calle: string,
        numero: string
    }
}

