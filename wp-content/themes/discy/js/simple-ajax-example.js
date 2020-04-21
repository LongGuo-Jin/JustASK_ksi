//my custom ajax
jQuery(document).ready( function($) {

    $('div.panel-pop-content p.email_field input').on( 'change', function () {
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
    $('div.panel-pop-content p.userrole_field input').val('student');
    $('div.panel-pop-content p.user_role_field select').on( 'change', function () {
        var temp =$('div.panel-pop-content p.user_role_field select').val();
        console.log(temp);
        $('div.panel-pop-content p.userrole_field input').val(temp);
    });
});

jQuery(document).ready( function($) {
    $('div.page-section.page-section-basic p.email_field input').attr("readonly", "readonly");
});

