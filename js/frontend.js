head.js("js/external/json2.js", "js/external/jquery.js", "js/external/jquery-ui.js", "js/external/underscore.js", "js/external/backbone.js", "js/external/mustache.js", "js/utility.js", "js/player_view.js", "js/videos_view.js", "js/audio_view.js", "js/home_view.js",
    function() {
        $(document).ready(function() {
            load_template("home.tmpl", function(data) {
                $("#content").empty();
                var home = new HomeView({
                    el: $("<div>")
                });
                home.set_template(data);
                home.render();
                $("#content").append(home.el);
            });
        });
    }
);
