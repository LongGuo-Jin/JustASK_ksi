jQuery(document).ready(function($) {
    var data = {
        'action': 'my_action',
        'whatever': 1
    };

    $.post(ajax_object.ajax_url, data, function(response) {
        alert('Got this from the server: ' + response);
    });
});