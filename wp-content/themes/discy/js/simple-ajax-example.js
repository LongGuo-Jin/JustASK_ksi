//my custom ajax


jQuery(document).ready( function($) {
    // mobile css custom js
    jQuery('.discy-container .mobile-menu  .mobile-menu-click i').css('font-size','30px');
    jQuery('.discy-container .mobile-menu  .mobile-menu-click i').css('color','#8dc21f');
    jQuery('.mobile-menu').css('padding-top', '6px');
    
    jQuery('#pass_id_for_register').on('input', function(){
        jQuery('#register_button').css('background-color','#81b441');
        jQuery('#register_button').removeAttr('disabled');
    });
    var width = $(window).width();
    
    if (width < 782) {
        //width is larger than 500px and smaller than 900px
        jQuery('.call-action-unlogged.call-action-light.call-action-style_1').attr('style','height:250px !important');
    }
    
    
    // jQuery('.call-action-unlogged.call-action-light.call-action-style_1').addClass('mobile_response_landpage');
    $('#profile_search #related_search').on( 'click', function () {
        
        if($('#profile_search #sfirst_name').val() == ""){
            // swal("Success Message Title", "Well done, you pressed a button", "success");
            // document.getElementsByClassName('sweet-alert')[0].style.visibility = "visible";
            alert('Please enter first name.');
            
        }
        else if($('#profile_search #slast_name').val() == ""){
            alert('Please enter last name.');
        }
        else if($('#profile_search #snric').val() == ""){
            alert('Please enter at least 4 last nric.');
        }else{
            $.ajax({
                url: ajaxurl,
                type: "POST",
                dataType: 'html',
                data: {
                    action: 'retrieveUsersData',
                    first:$('#profile_search #sfirst_name').val(),
                    last:$('#profile_search #slast_name').val(),
                    nric:$('#profile_search #snric').val(),
                },
                
                success:function(data) {
                    if(data != 1)
                        window.location.href = data;
                    
                    console.log(data);
                },
                error: function(errorThrown){
                    console.log(errorThrown);
                }
            });
        }
    });
});


jQuery(document).ready( function($) {

    $('div.panel-pop-content p#email_field input').on( 'change', function () {
        
        var res = "";
        jQuery('#register_button').attr('disabled','disabled');
        $.ajax({
            url: example_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
            data: {
                'action': 'example_ajax_request',
                'email_val' : $('p#email_field input').val()
            },
            cache: false,
            async:false,
            success:function(data) {
                // This outputs the result of the ajax request
                
                var temp = $('p#email_field input').val().split('@');
                var username = "";
                if(temp.length == 2){
                    username =  temp[1][0] + temp[0];
                }
                else{
                    username =  temp[0];
                }
                $('p.user_role_field input').val(username);
                // console.log(typeof(data));    
                res = data;
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });  
        
        if(res == -1){
            $('p#email_field').attr('aria-label', 'Enter your email.');
            $('p#email_field').blur();
        }else{
            $('p#email_field').attr('aria-label', res);
            $('p#email_field').focus();
        }
        jQuery('#register_button').removeAttr('disabled');
    });
});

jQuery(document).ready( function($) {
    $('div.page-section.page-section-basic p.email_field input').attr("readonly", "readonly");
});

