/// <reference path="../Config.ts" />

head.ready(function () {
    var UsuarioLogueado: UsuarioEntity;
    // Inicializaciones
    $('#btn_Ingresar').kendoButton();
    
    $('#txt_username').on("keypress", function (e) {
        if (e.keyCode == 13) {
            // Cancel the default action on keypress event
            e.preventDefault();
            Ingresar();
        }
    });

    $('#txt_password').on("keypress", function (e) {
        if (e.keyCode == 13) {
            // Cancel the default action on keypress event
            e.preventDefault();
            Ingresar();
        }
    });

       
    //Regresar
    $('#btn_Ingresar').click(function () {
        Ingresar();
    });
        
    function Ingresar() {

        var usr: UsuarioEntity = new UsuarioEntity();
        var usuario = $('#txt_username').val().toString();
        var password = $('#txt_password').val().toString();
        if (usuario == null || usuario == '' || password == null || password == '')
            return alert('El usuario y contraseña deben estar llenos.');
        get$Login$LoginVerificacion(usuario, password, function (result: Msg) {
            if (result == undefined) 
                return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
            if (result.Estado == 'False')
                return alert('EL usuario o contraseña son incorrectos');
            UsuarioLogueado = <UsuarioEntity>result.Datos;
            TerminarInicioSesion();
            
        }, function (error: Msg) {
            //// almacena variables de sesión
            //sessionStorage.setItem("logged", "1");

            //// redirección a la ventana interna
            //window.location = 'Home.html';
        });
    }

   
    

    function TerminarInicioSesion() {       
        // serializa los datos del usuario y lo coloca en sesión.
        sessionStorage.setItem("user", Encrypt(JSON.stringify(UsuarioLogueado)));
        sessionStorage.setItem("access", "total");
        sessionStorage.setItem("id", ''+UsuarioLogueado.id);
        sessionStorage.setItem("logged", "1");                
        window.location.assign('Home.html');
    }
    
    Loading_Hide();
});
