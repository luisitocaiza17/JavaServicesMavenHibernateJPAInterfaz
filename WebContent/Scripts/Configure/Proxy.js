var UsuarioEntity = (function () {
    function UsuarioEntity() {
    }
    return UsuarioEntity;
}());
var Msg = (function () {
    function Msg(Estado, Datos, Mensajes) {
        this.Estado = Estado;
        this.Datos = Datos;
        this.Mensajes = Mensajes;
    }
    return Msg;
}());
var TokenInfo = (function () {
    function TokenInfo() {
    }
    return TokenInfo;
}());
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
function get$Login$LoginVerificacion(usuario, password, callDone, callFail) {
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
var VULNERABILIDADES = (function () {
    function VULNERABILIDADES() {
    }
    return VULNERABILIDADES;
}());
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
var ESCALA_DEGRADACION = (function () {
    function ESCALA_DEGRADACION() {
    }
    return ESCALA_DEGRADACION;
}());
var ACTIVO_GENERAL = (function () {
    function ACTIVO_GENERAL() {
    }
    return ACTIVO_GENERAL;
}());
var RIESGO_GENERAL = (function () {
    function RIESGO_GENERAL() {
    }
    return RIESGO_GENERAL;
}());
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
var AMENAZAS = (function () {
    function AMENAZAS() {
    }
    return AMENAZAS;
}());
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
var ESCALA_FRECUENCIA = (function () {
    function ESCALA_FRECUENCIA() {
    }
    return ESCALA_FRECUENCIA;
}());
