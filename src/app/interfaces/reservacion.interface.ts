export interface Reservacion {
    id: number;
    fechainicio: string;
    fechasalida: string;
    user_id: number;
    fechareserva: string;
    hospedaje_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    hospedaje: {
        created_at: string;
        deleted_at: string;
        descripcion: string;
        id: number;
        image:  string;
        precio: number;
        tipo:  string;
        updated_at: string;
        };
    es_de_usuario: {
        admin:  string;
        apellido:  string;
        cedula:  string;
        created_at:  string;
        deleted_at: string;
        direccion:  string;
        email:  string;
        email_verified_at:  string;
        id:  number;
        nombre:  string;
        telefono:  string;
        updated_at:  string;
        verified: string;
        };
}
