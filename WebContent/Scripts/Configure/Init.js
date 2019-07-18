/// <reference path="../Configure/typings/kendo-ui/kendo-ui.d.ts" />
/// <reference path="../Configure/typings/jquery/jquery.d.ts" />
/// <reference path="../Configure/typings/headjs/headjs.d.ts" />
/// <reference path="../Configure/typings/filesaver/filesaver.d.ts" />
/// <reference path="../Configure/typings/cryptojs/cryptojs.d.ts" />
/// <reference path="../Configure/Proxy.ts" />
/// <reference path="../Configure/Utilities.ts" />
var idleTime = 0;
// primero cargo Jquery
head.load("../libs/kendo-ui/js/jquery.min.js", "../Config.js", "../Scripts/Configure/Utilities.js", "../Scripts/Configure/Proxy.js", "../Scripts/Configure/Clases.js", function () {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    // valida sesión
    if ((filename != 'Login.html' && filename != "RecuperarClave.html" && filename != "ActivacionUsuario.html") &&
        (sessionStorage.getItem("logged") == undefined || sessionStorage.getItem("logged") == "0")) {
        window.location.assign('Login.html');
    }
    else {
        // Luego inicializo la cabecera y detalle del sitio
        if ($('#header').length > 0)
            $("#header").load("../Views/Navigation/Header.html", function () {
            });
        if ($('#menu').length > 0) {
            $("#menu").load("../Views/Navigation/Menu.html", function () {
            });
        }
        if ($('#footer').length > 0)
            $("#footer").load("../Views/Navigation/Footer.html", function () {
                $('#year').html((new Date()).getFullYear().toString());
            });
        // Luego cargo Kendo UI y el Estilo principal del sitio
        head.load("../libs/kendo-ui/js/kendo.all.min.js", "../libs/kendo-ui/js/cultures/kendo.culture.es-EC.min.js", "../libs/kendo-ui/js/messages/kendo.messages.es-EC.min.js", "../Scripts/Configure/Proxy.js", "../libs/filesaver/FileSaver.js", "../libs/cryptojs/src/core.js", "../libs/cryptojs/src/enc-base64.js", "../libs/cryptojs/src/md5.js", "../libs/cryptojs/src/evpkdf.js", "../libs/cryptojs/src/cipher-core.js", "../libs/cryptojs/src/aes.js", "../libs/slick/slick/slick.min.js", "../Styles/Site.css", '../libs/kendo-ui/styles/kendo.common-material.min.css', '../libs/kendo-ui/styles/kendo.material.min.css', '../libs/kendo-ui/styles/kendo.material.mobile.min.css', '//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', "../libs/kendo-ui/js/jszip.min.js", function () {
            // Luego cargo los archivos de js y css específicos de la pantalla
            head.load('../Scripts/' + filename.replace('.html', '.js'), '../Styles/' + filename.replace('.html', '.css'), function () {
                //inicializar la cultura
                //console.log("es-EC " + kendo.getCulture().name);
                kendo.culture("es-EC");
                //console.log("es-EC " + kendo.getCulture().name);
                //TODO: Proceso con menus
                $('#mlinks').html($('#links>ul').clone());
                $('#links>ul').attr("id", "menuPrincipal");
                $('#mlinks>ul').attr("id", "mobileMenu");
                // Inicializo variables de cabecera y pie
                if ($("#menuPrincipal").length > 0) {
                    $("#menuPrincipal").kendoMenu();
                }
                if ($("#mobileMenu").length > 0) {
                    var treeView = $("#mobileMenu").kendoTreeView().data("kendoTreeView");
                    treeView.expand(".k-item");
                    $('#mobileMenu').hide();
                }
                if ($('#btn_mmenu').length > 0) {
                    $('#btn_mmenu').kendoButton();
                    $('#btn_mmenu').show();
                    $('#btn_mmenu').click(function () {
                        $('#mobileMenu').toggle();
                    });
                }
                if ($('#header').length > 0) {
                    if ($("#lbl_UsuarioLogueado").length > 0) {
                        var UsuarioLogueado = UsuarioSesion();
                        if (UsuarioLogueado != null) {
                            $("#lbl_UsuarioLogueado").html(UsuarioLogueado.nombres + '' + UsuarioLogueado.apellidos);
                        }
                    }
                }
                //Increment the idle time counter every minute.
                var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
                //Zero the idle timer on mouse movement.
                $(this).mousemove(function (e) {
                    idleTime = 0;
                });
                $(this).keypress(function (e) {
                    idleTime = 0;
                });
            });
        });
    }
});
//llamada a servicio
function Callback(Address, argsPOST, argsGET, argsup, callDone, callFail) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var argumentsArray = [].slice.apply(argsup);
    argumentsArray.pop(); // retiro
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: Address + '' + partsOfFunctionName[1] + '/' + partsOfFunctionName[2] + (argsGET != null ? "?" + $.param(argsGET) : ""),
        type: partsOfFunctionName[0].toString().toUpperCase(),
        dataType: 'text',
        data: argsPOST,
        contentType: 'application/json; charset=UTF-8',
        mimeType: 'application/json',
        crossDomain: false,
        cache: false,
        timeout: 1200000,
        headers: {
            'CodigoAplicacion': '3',
            'DispositivoNavegador': 'Chrome',
            'DireccionIP': '1.1.1.1',
            'SistemaOperativo': 'Windows',
            'Token': '123',
            'CodigoPlataforma': '7'
        },
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result == null && result == undefined) {
            alert('No se obtuvo respuesta del servicio');
            Loading_Hide();
        }
        else if (typeof callDone === "function") {
            // if (res.Results.length == 1) {
            //     callback(res.Results[0].ReturnObject);
            // }
            callDone(result);
            Loading_Hide();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.readyState == 4) {
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
            if (jqXHR.statusText == "timeout") {
                alert('Tiempo de espera de respuesta de servicio agotado.');
            }
            else if (jqXHR.responseText != undefined) {
                try {
                    var result = JSON.parse(jqXHR.responseText);
                    // Si hay un error en el servidor
                    if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
                        alert(result.Mensajes.join());
                    }
                }
                catch (ex) {
                    alert(jqXHR.responseText);
                }
            }
            else {
                alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
            }
        }
        else if (jqXHR.readyState == 0) {
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
            alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
        }
        else {
        }
        if (typeof callFail === "function") {
            // if (res.Results.length == 1) {
            //     callback(res.Results[0].ReturnObject);
            // }
            callFail(result);
        }
        Loading_Hide();
    }).always(function () {
        Loading_Hide();
    });
}
//llamada para descargar archivos 
function Callback2(Address, argsPOST, argsGET, argsup, callDone, callFail) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var Array = [].slice.apply(argsup);
    argumentsArray.pop(); // retiro
    //setup ajax
    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
            if (settings.dataType === 'binary') {
                settings.xhr().responseType = 'arraybuffer';
                settings.processData = false;
            }
        }
    });
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: Address + partsOfFunctionName[2] + (argsGET != null ? "?" + $.param(argsGET) : ""),
        type: partsOfFunctionName[0].toString().toUpperCase(),
        dataType: 'binary',
        processData: false,
        data: argsPOST,
        contentType: 'application/json; charset=UTF-8',
        mimeType: 'application/json',
        crossDomain: false,
        cache: false,
        timeout: 600000,
        headers: {
            'CodigoAplicacion': '3',
            'DispositivoNavegador': 'Chrome',
            'DireccionIP': '1.1.1.1',
            'SistemaOperativo': 'Windows',
            'CodigoPlataforma': '7',
            'X-Page-Number': '1',
            'X-Page-Size': '0'
        },
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = PostReturn;
        callDone(result);
        Loading_Hide();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.readyState == 4) {
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
            if (jqXHR.statusText == "timeout") {
                alert('Tiempo de espera de respuesta de servicio agotado.');
            }
            else if (jqXHR.responseText != undefined) {
                try {
                    //var result = <Msg>JSON.parse(jqXHR.responseText);
                    var result = jqXHR.responseText;
                    // Si hay un error en el servidor
                    if (result == undefined || result == null) {
                        alert(result);
                    }
                    else {
                        return result;
                    }
                }
                catch (ex) {
                    alert(jqXHR.responseText);
                }
            }
            else {
                alert('No se ha recibido respuesta del servidor, #: ' + jqXHR.status);
            }
        }
        else if (jqXHR.readyState == 0) {
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
            alert('Ha ocurrido un error de conexión con el servidor. Por favor intente más tarde.');
        }
        else {
        }
        if (typeof callFail === "function") {
            // if (res.Results.length == 1) {
            //     callback(res.Results[0].ReturnObject);
            // }
            callFail(result);
        }
        Loading_Hide();
    }).always(function () {
        Loading_Hide();
    });
}
function CerrarSesion() {
    sessionStorage.setItem("logged", "0");
    sessionStorage.setItem("user", "");
    window.location.assign('Login.html');
}
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > SessionTimeOut - 1) {
        // Cierra sesión
        CerrarSesion();
    }
}
function UsuarioSesion() {
    if (sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == undefined || sessionStorage.getItem("user") == "") {
        //document.location.assign('Login.html'); // Si no está logueado, cambia la página al login //Comentado mientras se espera integracion.... para pruebas.
        return null;
    }
    return JSON.parse(Decrypt(sessionStorage.getItem("user").toString()));
}
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
