//my custom ajax
jQuery(document).ready( function($) {

    $('p.email_field input').on( 'change', function () {
        var res = "";
        $.ajax({
            url: example_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
            data: {
                'action': 'example_ajax_request',
                'email_val' : $('p.email_field input').val()
            },
            cache: false,
            async:false,
            success:function(data) {
                // This outputs the result of the ajax request
                
                var temp = $('p.email_field input').val().split('@');
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
            console.log("success");
        }else{
            alert(res);
            $('p.email_field input').val('');
        }
    });
});