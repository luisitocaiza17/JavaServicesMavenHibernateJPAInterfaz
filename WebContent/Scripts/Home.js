/// <reference path="Configure/Proxy.ts" />
head.ready(function () {
    //este es mi comentario
    var UsuarioLogueado = UsuarioSesion();
    alert('Usuario' + UsuarioLogueado.nombres);
    Loading_Hide();
});
