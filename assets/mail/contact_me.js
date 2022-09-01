$(document).ready(function(){
    $("#sendMessageButton").click(function (event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#nombre").val();
        var email = $("input#correo").val();
        var phone = $("input#telefono").val();
        var message = $("textarea#mensaje").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(" ") >= 0) {
            firstName = name.split(" ").slice(0, -1).join(" ");
        }
        $this = $("#sendMessageButton");
        var valid_data = validateData(name,email,phone,message);
        console.log(valid_data);
        if(valid_data!==false && typeof valid_data !== undefined)
        {
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "assets/mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                },
                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div id='alert-msg' class='alert alert-success bg-green-300 border border-green-500 my-2 mx-5 rounded-lg'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' id='close-alert' class='close inline-flex items-center justify-center text-xl mx-2 my-2' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong class='text-lg'>¡Tu mensaje ha sido enviado con éxito!.</strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    $('#close-alert').click(function()
                    {
                        $('#success').empty();
                    });
                    //clear all fields
                    $("#contact-form").trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#success").html("<div id='alert-msg' class='alert alert-danger bg-red-300 border border-red-500 my-2 mx-5 rounded-lg'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' id='close-alert' class='close inline-flex items-center justify-center text-xl mx-2 my-2' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong class='text-lg'>").text(
                            "Lo sentimos " +
                                firstName +
                                ", parece ser que el servidor de correo no está respondiendo. ¡Intentalo más tarde!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    $('#close-alert').click(function()
                    {
                        $('#success').empty();
                    });
                    //clear all fields
                    $("#contact-form").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        }
        function validateData(name,email,phone,message)
        {
            var dataArray = {};
            var characterRegName = /^\s*[a-zA-Z0-9_ ,\s]+\s*$/;
            var numericRegPhone = /^\s*?[0-9]{10,}\s*$/;
            var emailRegEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            dataArray['name']=validateName();
            dataArray['email']=validateMail();
            dataArray['phone']=validatePhone();
            dataArray['message']=validateMessage();
            function validateName()
            {
                if(name=="")
                {
                    if($("#contact-form #nombre-contact-div").after)
                        $("#contact-form #nombre-contact-div").next('span').remove();
                    
                    $("#contact-form #nombre").addClass('required-field');
                    $("#contact-form #nombre").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                    $("#contact-form #nombre-contact-div").after('<span class="text-red-600" id="alert-message">Por favor, introduce tu nombre.</span>');
                    return false;
                }
                else
                {
                    if(!characterRegName.test(name))
                    {
                        if($("#contact-form #nombre-contact-div").after)
                            $("#contact-form #nombre-contact-div").next('span').remove();

                        $("input#nombre").addClass('required-field');
                        $("input#nombre").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                        $("#contact-form #nombre-contact-div").after('<span class="text-red-600">Los caracteres especiales no están permitidos. Por favor, introduce un nombre válido</span>');
                        return false;
                    }
                    else
                        return true;
                }
            }
            function validateMail()
            {
                if(email=="")
                {
                    if($("#contact-form #correo-contact-div").after)
                        $("#contact-form #correo-contact-div").next('span').remove();
                    
                    $("#contact-form #correo").addClass('required-field');
                    $("#contact-form #correo").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                    $("#contact-form #correo-contact-div").after('<span class="text-red-600" id="alert-message">Por favor, introduce un e-mail.</span>');
                    return false;
                }
                else
                {
                    if(!emailRegEmail.test(email))
                    {
                        if($("contact-form #correo-contact-div").after)
                            $("contact-form #correo-contact-div").next('span').remove();

                        $("input#correo").addClass('required-field');
                        $("input#correo").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                        $("contact-form #correo-contact-div").after('<span class="text-red-600">Formato de E-mail no válido. Por favor, introduce una dirección de correo válida.</span>');
                        return false;
                    }
                    else
                        return true;
                }
            }
            function validatePhone()
            {
                if(phone=="")
                {
                    if($("#contact-form #telefono-contact-div").after)
                        $("#contact-form #telefono-contact-div").next('span').remove();
                    
                    $("#contact-form #telefono").addClass('required-field');
                    $("#contact-form #telefono").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                    $("#contact-form #telefono-contact-div").after('<span class="text-red-600" id="alert-message">Por favor, introduce un número telefónico.</span>');
                    return false;
                }
                else
                {
                    if(!numericRegPhone.test(phone))
                    {
                        if($("phone-contact-div").after)
                            $("phone-contact-div").next('span').remove();

                        $("input#telefono").addClass('required-field');
                        $("input#telefono").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                        $("contact-form #telefono-contact-div").after('<span class="text-red-600">Formato de número telefónico no válido. Por favor, introduce un número válido.</span>');
                        return false;
                    }
                    else
                        return true;
                }
            }
            function validateMessage()
            {
                if(message=='')
                {
                    if($("#contact-form #mensaje-contact-div").after)
                        $("#contact-form #mensaje-contact-div").next('span').remove();
                    
                    $("#contact-form #mensaje").addClass('required-field');
                    $("#contact-form #mensaje").css({"background-color":"rgb(255,177,177)","border-color":"#FF0000","border-width":"1px"});
                    $("#contact-form #mensaje-contact-div").after('<span class="text-red-600" id="alert-message">Por favor, introduce un mensaje.</span>');
                    return false;
                }
                else
                {
                    return true;
                }
            }
            if(Object.keys(dataArray).every((k) => dataArray[k]))
                return true;
            else
                return false;
        }
    });
    $("#contact-form input").focus(function (event) {
        if($(this).hasClass('required-field'))
        {
            $(this).removeAttr('style');
            $(this).parent().next('span').remove();
            $(this).removeClass('required-field');
        }
    });
    $("#contact-form textarea").focus(function (event) {
        if($(this).hasClass('required-field'))
        {
            $(this).removeAttr('style');
            $(this).parent().next('span').remove();
            $(this).removeClass('required-field');
        }
    });
});

/*When clicking on Full hide fail/success boxes */
$("#nombre").focus(function () {
    $("#success").html("");
});
