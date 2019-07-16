 class UsuarioEntity {
    public id:number;
    public nombres: string;
    public apellidos: string;
}

class Msg {
    constructor(
        public Estado: string,
        public Datos: any,
        public Mensajes: string[]
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

 /// ya le cache
 /// <summary>
 /// En la cabezaran van los parametros que se solicitaran
 /// </summary>
 /// <param name="usuario">Cabecera de la llamada</param>
 /// <param name="password"></param>
 /// <returns>
 /// HttpResponseMessage
 /// </returns>
 /// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
 /// <response code="400">Error datos enviados en la cabecera</response>
 /// <response code="500">Si existe un error interno</response>
 /// [Route("LoginVerificacion")]
 function get$Login$LoginVerificacion(usuario: string, password:string, callDone, callFail) {
     Callback({ "usuario": usuario, "password": password }, arguments, callDone, callFail);
}

 /// <summary>
 /// En la cabezaran van los parametros que se solicitaran
 /// </summary>
 /// <returns>
 /// HttpResponseMessage
 /// </returns>
 /// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
 /// <response code="400">Error datos enviados en la cabecera</response>
 /// <response code="500">Si existe un error interno</response>
 /// [Route("TraerVulnerabilidades")]
 function get$Vulnerabilidad$TraerVulnerabilidades(callDone, callFail) {
     Callback({}, arguments, callDone, callFail);
 }

 class VULNERABILIDADES {
     public ID_VULNERABILIDAD: number;
     public V_NOMBRE: string;
     public V_DESCRIPCION: string;
 }

 /// <summary>
 /// En la cabezaran van los parametros que se solicitaran
 /// </summary>
 /// <returns>
 /// HttpResponseMessage
 /// </returns>
 /// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
 /// <response code="400">Error datos enviados en la cabecera</response>
 /// <response code="500">Si existe un error interno</response>
 /// [Route("TraerEscalaDegradacion")]
 function get$EscalaDegradacion$TraerEscalaDegradacion(callDone, callFail) {
     Callback({}, arguments, callDone, callFail);
 }

 class ESCALA_DEGRADACION {
     public ID_ESCALA_DEGRADACION: number;
     public E_D_NOMBRE: string;
     public E_D_VALOR: number;
     public E_D_FECHA_CREACION: number;
 }

 class ACTIVO_GENERAL {
     public ID: number;
     public ACTIVO: string;
     public VULNERABILIDAD: string;
     public DISPONIBILIDAD: number;
     public CONFIDENCIALIDAD: number;
     public INTEGRIDAD: number;
     public CRITICIDAD: number;
     public PROMEDIO_IMPACTO: number;
     public AMENAZA: string;

 }

class RIESGO_GENERAL {
    public ID: number;
    public VULNERABILIDAD: string;
    public VULNERABILIDADES_REPETIDAS: number;
    public PROMEDIO_IMPACTO: number;
    public AMENAZA: string;
    public FRECUENCIA: number;
    public AMENAZA_PROMEDIO: number;

}

 /// <summary>
 /// En la cabezaran van los parametros que se solicitaran
 /// </summary>
 /// <returns>
 /// HttpResponseMessage
 /// </returns>
 /// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
 /// <response code="400">Error datos enviados en la cabecera</response>
 /// <response code="500">Si existe un error interno</response>
 /// [Route("TraerAmenazas")]
 function get$Amenaza$TraerAmenazas(callDone, callFail) {
     Callback({}, arguments, callDone, callFail);
 }

 class AMENAZAS
 {
     public ID_AMENAZA: number;
     public AM_NOMBRE: string;
     public AM_DESCRIPCION: string
     public AM_FECHA_CREACION: Date;
 }

 /// <summary>
 /// En la cabezaran van los parametros que se solicitaran
 /// </summary>
 /// <returns>
 /// HttpResponseMessage
 /// </returns>
 /// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
 /// <response code="400">Error datos enviados en la cabecera</response>
 /// <response code="500">Si existe un error interno</response>
 /// [Route("TraerFrecuencias")]
 function get$Frecuencia$TraerFrecuencias(callDone, callFail) {
     Callback({}, arguments, callDone, callFail);
 }

 class ESCALA_FRECUENCIA {
     public ID_ESCALA_FRECUENCIA: number;
     public E_F_NOMBRE: string;
     public E_F_DESCRIPCION: string;
     public E_F_FECHA_CREACION: Date;
     public E_F_VALOR_LETRA: string;
     public E_F_VALOR: number;
    }