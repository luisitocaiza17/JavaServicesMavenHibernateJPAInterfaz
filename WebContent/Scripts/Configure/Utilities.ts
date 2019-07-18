/// <reference path="../Configure/typings/kendo-ui/kendo-ui.d.ts" />
/// <reference path="../Configure/typings/jquery/jquery.d.ts" />


function Loading_Show() {
    Loading_MsgClear();
    $('#loading-container').show(null);
}

function Loading_Hide(p?: boolean) {
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

function serializeGETpars(obj): string {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
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
};


//https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
//formato dd/MM/yyyy
function getFormattedDate(date: Date): string {

    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date(''+date);

    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}

// funcion para  convertir date a formato YYYY-MM-dd
function getInternationalFomat(date: Date) {
    return '' + date.getFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate();
}

function getFormattedDateymd(date: Date): string {

    if (Object.prototype.toString.call(date) !== '[object Date]')
        date = new Date(''+date);

    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '/' + month + '/' + day;
}

function Encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, EncryptionPassword).toString();
}

function Decrypt(encrypted: string): string {
    return CryptoJS.AES.decrypt(encrypted, EncryptionPassword).toString(CryptoJS.enc.Utf8);
}


//https://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
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

function rainbow(): Array<string> {
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

function calcularEdad(fecha: string) {
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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ?
                (comparison * -1) : comparison
        );
    };
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function Confirmation(text: string, fOk, fCancel) {
    ConfirmationConf("", text, "Aceptar", "Cancelar", fOk, fCancel);
}

function ConfirmationConf(header:string, text: string, OkText:string, CancelText:string, fOk, fCancel) {
    var nid = makeid();
    $('body').append('<div id="' + nid + '"></div>')
    $('#' + nid).kendoConfirm({
        content: text,
        messages: {
            okText: OkText,
            cancel: CancelText
        }
    }).data("kendoConfirm").result.done(fOk).fail(fCancel);
}


function calcularFechas(fecha: string) {
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
    return edad+' años -'+meses+' meses';
    //document.getElementById("result").innerHTML = "Tienes " + edad + " años, " + meses + " meses y " + dias + " días";

}

//validar solo numeros en inputs
function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
};