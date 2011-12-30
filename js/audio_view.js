var AudioModel = Backbone.Model.extend({
    initialize: function() {
        this.navigation_path = '';
    }
});

var AudioView = Backbone.View.extend({
    tag: "div",
    events: {
        "click #home_button": "back"
    },
    initialize: function() {
        _.bindAll(this, "render");
        _.bindAll(this, "back");
        _.bindAll(this, "play_audio");
        _.bindAll(this, "close_audio");
    },
    play_audio: function(filename) {
        alert("PA");
        $(".audio_player").empty();
        var player = new PlayerView({
            el: $("<div>"),
            model: new PlayerModel({
                filename: filename
            })
        });
        player.render();
        player.bind("audio_closed", this.close_audio);
        $(".audio_player").append(player.el);
        $(".audio_player").show();
    },
    close_audio: function() {
        $(".audio_player").empty();
        $(".audio_player").hide();
        console.log("AUDIO PLAYER CLOSED");
    },
    back: function(event) {
        event.preventDefault();
        $(this.el).remove();
        $("#overlay").fadeOut(250);
        setTimeout('$("#content").fadeIn(250);', 250);
    },
    set_template: function(template_data) {
        this.template = template_data;
    },
    render: function() {
        $(this.el).html(this.template);

        this.$('#home_button').hover(
            function() {
                $(this).switchClass('back_button', 'back_button_hover', 300);
            },
            function() {
                $(this).switchClass('back_button_hover', 'back_button', 300);
            }
        );

        var file_list_ul = $("<ul>");
        var list_element = null;
        var i = 0;
        var file_list_json = this.model.toJSON();
        console.log(file_list_json);
        var file_list = file_list_json.file_list;
        for (i = 0; i < file_list.length; i++) {
            list_element = file_list[i];
            var item_element = $("<li>");
            var item_link = $("<a>");
            item_link.html(list_element);
            item_link.addClass("audio_link");
            item_element.append(item_link);
            file_list_ul.append(item_element);
            var button_view = new ButtonView({
                el: $(item_link),
                val: list_element
            });
            button_view.bind("btn_click", this.play_audio);
        }
        this.$("#audio_browser").append(file_list_ul);
    }
});
