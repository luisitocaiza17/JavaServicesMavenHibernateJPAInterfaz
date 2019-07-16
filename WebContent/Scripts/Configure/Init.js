/// <reference path="../Configure/typings/kendo-ui/kendo-ui.d.ts" />
/// <reference path="../Configure/typings/jquery/jquery.d.ts" />
/// <reference path="../Configure/typings/headjs/headjs.d.ts" />
/// <reference path="../Configure/typings/filesaver/filesaver.d.ts" />
/// <reference path="../Configure/typings/cryptojs/cryptojs.d.ts" />
/// <reference path="../Configure/Proxy.ts" />
function Loading_Show() {
    Loading_MsgClear();
    $('#loading-container').show(null);
}
function Loading_Hide(p) {
    if (p == true) {
        if (!$('#principal').is(":visible"))
            $('#principal').fadeIn("slow");
    }
    else {
        $('#loading-container').hide(null);
        if (!$('#principal').is(":visible"))
            $('#principal').fadeIn("slow");
    }
}
function Loading_Msg(message) {
    $('#loading-msg').append('<br>' + message);
}
function Loading_MsgClear() {
    $('#loading-msg').html('');
}
function CerrarSesion() {
    sessionStorage.setItem("logged", "0");
    sessionStorage.setItem("user", "");
    window.location.assign('Login.html');
}
var idleTime = 0;
// primero cargo Jquery
head.load("../libs/kendo-ui/js/jquery.min.js", "../Config.js", function () {
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
            $("#header").load("../Navigation/Header.html", function () {
            });
        if ($('#menu').length > 0) {
            $("#menu").load("../Navigation/Menu.html", function () {
            });
        }
        if ($('#footer').length > 0)
            $("#footer").load("../Navigation/Footer.html", function () {
                $('#year').html((new Date()).getFullYear().toString());
            });
        //["core", "enc-base64", "md5", "evpkdf", "cipher-core", "aes"]
        // Luego cargo Kendo UI y el Estilo principal del sitio
        head.load("../libs/kendo-ui/js/kendo.all.min.js", "../libs/kendo-ui/js/cultures/kendo.culture.es-EC.min.js", "../libs/kendo-ui/js/messages/kendo.messages.es-EC.min.js", "../Scripts/Configure/Proxy.js", "../libs/filesaver/FileSaver.js", "../libs/cryptojs/src/core.js", "../libs/cryptojs/src/enc-base64.js", "../libs/cryptojs/src/md5.js", "../libs/cryptojs/src/evpkdf.js", "../libs/cryptojs/src/cipher-core.js", "../libs/cryptojs/src/aes.js", "../libs/slick/slick/slick.min.js", "../Styles/Site.css", '../libs/kendo-ui/styles/kendo.common-material.min.css', '../libs/kendo-ui/styles/kendo.material.min.css', '../libs/kendo-ui/styles/kendo.material.mobile.min.css', '//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', "../libs/kendo-ui/js/jszip.min.js", function () {
            // Luego cargo los archivos de js y css específicos de la pantalla
            head.load('../Scripts/' + filename.replace('.html', '.js'), '../Styles/' + filename.replace('.html', '.css'), function () {
                //inicializar la cultura
                //console.log("es-EC " + kendo.getCulture().name);
                kendo.culture("es-EC");
                //console.log("es-EC " + kendo.getCulture().name);
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
function Callback(args, argsup, callDone, callFail, timeout) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var argumentsArray = [].slice.apply(argsup);
    argumentsArray.pop(); // retiro
    // hago la llamada al servicio y obtengo el encriptado de retorno
    //$.get(servicioFuncionalidades + partsOfFunctionName[1] + '/' + partsOfFunctionName[2] + '?usuario=admin&password=123456', function (data) {
    //    alert(data);
    //}).fail(function (jqXHR, textStatus, error) {
    //    console.log("Post error: " + error);
    //    });
    $.ajax({
        url: servicioFuncionalidades + partsOfFunctionName[1] + '/' + partsOfFunctionName[2],
        type: 'GET',
        dataType: "text",
        data: args,
        contentType: 'application/json; charset=UTF-8',
        mimeType: 'application/json',
        cache: false,
        timeout: timeout == undefined ? 300000 : timeout // 5 min por reporteria
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
            alert(result.Mensajes);
            Loading_Hide();
        }
        else if (typeof callDone === "function") {
            Loading_Hide();
            var ret = callDone(result);
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
        //Loading_Hide();
    });
}
function Callback2(args, argsup, callDone, callFail) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var argumentsArray = [].slice.apply(argsup);
    argumentsArray.pop(); // retiro
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: servicioFuncionalidades + partsOfFunctionName[1] + '/' + partsOfFunctionName[2],
        type: partsOfFunctionName[0].toString().toUpperCase(),
        dataType: 'text',
        data: args,
        contentType: 'application/json; charset=UTF-8',
        mimeType: 'application/json',
        crossDomain: false,
        cache: false,
        timeout: 60000,
        headers: {
            'CodigoAplicacion': '3',
            'DispositivoNavegador': 'Chrome',
            'DireccionIP': '1.1.1.1',
            'SistemaOperativo': 'Windows',
            'CodigoPlataforma': '7'
        },
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
            alert(result.Mensajes.join());
            Loading_Hide();
        }
        else if (typeof callDone === "function") {
            // if (res.Results.length == 1) {
            //     callback(res.Results[0].ReturnObject);
            // }
            Loading_Hide();
            callDone(result);
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
        //Loading_Hide();
    });
}
//http://localhost:5150/SC/api/portalcorporativo/ObtenerClientesEmpresaIdentificacion/43739/1719103820
function Callback3(args, argsbody, argsup, callDone, callFail) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var argumentsArray = [].slice.apply(argsup);
    argumentsArray.pop(); // retiro
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: servicioFuncionalidades + partsOfFunctionName[1] + '/' + partsOfFunctionName[2] + args,
        type: partsOfFunctionName[0].toString().toUpperCase(),
        dataType: 'text',
        data: argsbody,
        contentType: 'application/json; charset=UTF-8',
        mimeType: 'application/json',
        crossDomain: false,
        cache: false,
        timeout: 60000,
        headers: {
            'CodigoAplicacion': '3',
            'DispositivoNavegador': 'Chrome',
            'DireccionIP': '1.1.1.1',
            'SistemaOperativo': 'Windows',
            'CodigoPlataforma': '7'
        },
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
            alert(result.Mensajes.join());
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
function Callback4(Address, argsPOST, argsGET, argsup, callDone, callFail) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var argumentsArray = [].slice.apply(argsup);
    argumentsArray.pop(); // retiro
    // hago la llamada al servicio y obtengo el encriptado de retorno
    $.ajax({
        url: Address + partsOfFunctionName[2] + (argsGET != null ? "?" + $.param(argsGET) : ""),
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
            'CodigoPlataforma': '7'
        },
    }).done(function (PostReturn) {
        if (!PostReturn) {
            throw ('No se ha recibido respuesta del servidor.');
        }
        var result = JSON.parse(PostReturn);
        // Si hay un error en el servidor
        if (result != null && result.Mensajes != undefined && result.Mensajes.length > 0 && result.Mensajes[0] != null) {
            alert(result.Mensajes.join());
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
function Callback5(Address, argsPOST, argsGET, argsup, callDone, callFail) {
    Loading_Show();
    var partsOfFunctionName = argsup.callee.name.split('$');
    var argumentsArray = [].slice.apply(argsup);
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
function serializeGETpars(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > SessionTimeOut - 1) {
        // Cierra sesión
        CerrarSesion();
    }
}
function GetRawfromMasked(maskfieldName) {
    "use strict";
    var f = $('#' + maskfieldName).data('kendoMaskedTextBox');
    var lEmptyMask = f._emptyMask;
    var lValue = f.value();
    var i = lEmptyMask.length;
    while (i--) {
        if (lEmptyMask[i] === lValue[i]) {
            lValue = lValue.slice(0, i) + lValue.slice(i + 1);
        }
    }
    return lValue;
}
;
//https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
//formato dd/MM/yyyy
function getFormattedDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date('' + date);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
}
// funcion para  convertir date a formato YYYY-MM-dd
function getInternationalFomat(date) {
    return '' + date.getFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
}
function getFormattedDateymd(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date('' + date);
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '/' + month + '/' + day;
}
function Encrypt(data) {
    return CryptoJS.AES.encrypt(data, EncryptionPassword).toString();
}
function Decrypt(encrypted) {
    return CryptoJS.AES.decrypt(encrypted, EncryptionPassword).toString(CryptoJS.enc.Utf8);
}
function UsuarioSesion() {
    if (sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == undefined || sessionStorage.getItem("user") == "") {
        //document.location.assign('Login.html'); // Si no está logueado, cambia la página al login //Comentado mientras se espera integracion.... para pruebas.
        return null;
    }
    return JSON.parse(Decrypt(sessionStorage.getItem("user").toString()));
}
// https://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
var _validFileExtensions = [".xlsx"];
function ValidateSingleInput(oInput) {
    if (oInput.type == "file") {
        var sFileName = oInput.value;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
            if (!blnValid) {
                //alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                oInput.value = "";
                return false;
            }
        }
    }
    return true;
}
function rainbow() {
    var size = 12;
    var rainbow = new Array(size);
    for (var i = 0; i < size; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3, size); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3, size); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3, size); // 240 deg
        rainbow[i] = "#" + red + green + blue;
    }
    return rainbow;
}
function sin_to_hex(i, phase, size) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
/**

 * Esta función calcula la edad de una persona y los meses

 * La fecha la tiene que tener el formato yyyy-mm-dd que es

 * metodo que por defecto lo devuelve el <input type="date">

 */
function calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad
    var values = fecha.split("-");
    var dia = Number(values[2]);
    var mes = Number(values[1]);
    var ano = Number(values[0]);
    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getFullYear();
    var ahora_mes = fecha_hoy.getUTCMonth() + 1;
    var ahora_dia = fecha_hoy.getUTCDate();
    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }
    // calculamos los meses
    var meses = 0;
    if (ahora_mes > mes)
        meses = ahora_mes - mes;
    if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;
    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    return edad;
    //document.getElementById("result").innerHTML = "Tienes " + edad + " años, " + meses + " meses y " + dias + " días";
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
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//funcion generica para ordenar array de objetos por  paramettra y asc o desc
//const bands = [
//    { genre: 'Rap', band: 'Migos', albums: 2 },
//    { genre: 'Pop', band: 'Coldplay', albums: 4 },
//    {
//        genre: 'Rock', band: 'Breaking Benjamins',
//        albums: 1
//    }
//];
//function compareValues(key, order = 'asc') {
//    return function (a, b) {
//        if (!a.hasOwnProperty(key) ||
//            !b.hasOwnProperty(key)) {
//            return 0;
//        }
//        const varA = (typeof a[key] === 'string') ?
//            a[key].toUpperCase() : a[key];
//        const varB = (typeof b[key] === 'string') ?
//            b[key].toUpperCase() : b[key];
//        let comparison = 0;
//        if (varA > varB) {
//            comparison = 1;
//        } else if (varA < varB) {
//            comparison = -1;
//        }
//        return (
//            (order == 'desc') ?
//                (comparison * -1) : comparison
//        );
//    };
//}
//console.log(
//    bands.sort(compareValues('albums', 'asc'))
//); 
function compareValues(key, order) {
    if (order === void 0) { order = 'asc'; }
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }
        var varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        var varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];
        var comparison = 0;
        if (varA > varB) {
            comparison = 1;
        }
        else if (varA < varB) {
            comparison = -1;
        }
        return ((order == 'desc') ?
            (comparison * -1) : comparison);
    };
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
function Confirmation(text, fOk, fCancel) {
    ConfirmationConf("", text, "Aceptar", "Cancelar", fOk, fCancel);
}
function ConfirmationConf(header, text, OkText, CancelText, fOk, fCancel) {
    var nid = makeid();
    $('body').append('<div id="' + nid + '"></div>');
    $('#' + nid).kendoConfirm({
        content: text,
        messages: {
            okText: OkText,
            cancel: CancelText
        }
    }).data("kendoConfirm").result.done(fOk).fail(fCancel);
}
function calcularFechas(fecha) {
    // Si la fecha es correcta, calculamos la edad
    var values = fecha.split("-");
    var dia = Number(values[2]);
    var mes = Number(values[1]);
    var ano = Number(values[0]);
    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getFullYear();
    var ahora_mes = fecha_hoy.getUTCMonth() + 1;
    var ahora_dia = fecha_hoy.getUTCDate();
    // realizamos el calculo
    var edad = ahora_ano - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }
    // calculamos los meses
    var meses = 0;
    if (ahora_mes > mes)
        meses = ahora_mes - mes;
    if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;
    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }
    return edad + ' años -' + meses + ' meses';
    //document.getElementById("result").innerHTML = "Tienes " + edad + " años, " + meses + " meses y " + dias + " días";
}
//validar solo numeros en inputs
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    }
    else if (key < 48 || key > 57) {
        return false;
    }
    else {
        return true;
    }
}
;
