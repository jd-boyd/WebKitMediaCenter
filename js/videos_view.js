var VideosModel = Backbone.Model.extend({
    initialize: function() {
        this.navigation_path = '';
    }
});

var VideosView = Backbone.View.extend({
    tag: "div",
    events: {
        "click #home_button": "back"
    },
    initialize: function() {
        _.bindAll(this, "render");
        _.bindAll(this, "back");
        _.bindAll(this, "play_video");
        _.bindAll(this, "close_video");
    },
    play_video: function(filename) {
        $(".video_player").empty();
        var player = new VideoPlayer({
            el: $("<div>"),
            model: new PlayerModel({
                filename: filename
            })
        });
        player.render();
        player.bind("video_closed", this.close_video);
        $(".video_player").append(player.el);
        $(".video_player").show();
        //external_player.play(filename);
    },
    close_video: function() {
        $(".video_player").empty();
        $(".video_player").hide();
        console.log("VIDEO PLAYER CLOSED");
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
            item_link.addClass("video_link");
            item_element.append(item_link);
            file_list_ul.append(item_element);
            var button_view = new ButtonView({
                el: $(item_link),
                val: list_element
            });
            button_view.bind("btn_click", this.play_video);
        }
        this.$("#videos_browser").append(file_list_ul);
    }
});
