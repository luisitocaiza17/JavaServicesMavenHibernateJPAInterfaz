class UsuarioEntity {
    public id:number;
    public nombres: string;
    public apellidos: string;
}

class Msg {
    constructor(
        public status: string,
        public data: any,
        public message: string[]
    ) { }
}


class TokenInfo {
    public access_token: string;
    public expires_in: number;
    public refresh_token: string;
    public token_type: string;
    public user_data: string;
    public error: string;
    public error_description: string;
    public token_retrieve: number;
}

class Login {
    public id:number;
    public nombre:string;
    public password: string;
    public esCorrecto: boolean;
    public persona:persona;
}

class persona {
    public nombres:number;
    public apellidos: string;
    public id: string;
}