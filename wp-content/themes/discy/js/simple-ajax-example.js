//my custom ajax


jQuery(document).ready( function($) {
    // mobile css custom js
    jQuery('.discy-container .mobile-menu  .mobile-menu-click i').css('font-size','30px');
    jQuery('.discy-container .mobile-menu  .mobile-menu-click i').css('color','#8dc21f');
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

    $('div.panel-pop-content p#email_field input').on( 'input', function () {
        
        var res = "";
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
            $('p#email_field').attr('aria-label', 'Success!');
        }else{
            $('p#email_field').attr('aria-label', res);
            // $('p#email_field input').val('');
        }
    });
});

jQuery(document).ready( function($) {
    $('div.page-section.page-section-basic p.email_field input').attr("readonly", "readonly");
});

