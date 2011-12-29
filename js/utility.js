function load_template(template_filename, success_callback) {
    var req_obj = {
        url: "tmpl/" + template_filename,
        type: "GET",
        error: function (jqXHR, textStatus, errorThrown) {
            switch(jqXHR.status){
            case 401:
                console.log("Session expired, redirecting to login");
                window.location="/";
                break;
            default:
                console.log("GET failed (" + jqXHR.status + "): " + errorThrown);
                break;
            }
        },
        success: success_callback,
        dataType: "text"
    };
    $.ajax(req_obj);
}

var ButtonView = Backbone.View.extend({
    events: {
        "click": "btn_click"
    },
    initialize: function (args) {
        _.bindAll(this, "btn_click");
        this.val = args.val;
    },
    btn_click: function () {
        console.log("BV Click", this.val);
        this.trigger("btn_click", this.val);
    }
});
