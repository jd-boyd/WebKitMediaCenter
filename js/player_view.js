var PlayerModel = Backbone.Model.extend({
    initialize: function() {
        //
    }
});

var VideoPlayer = Backbone.View.extend({
    tag: "div",
    events: {
        "click #video_back_button": "back"
    },
    initialize: function() {
        _.bindAll(this, "back");
        _.bindAll(this, "render");
        _.bindAll(this, "video_type");
        this.video_type_string = '';
    },
    back: function() {
        this.trigger("video_closed");
    },
    video_type: function() {
        if (this.video_type_string === '') {
            var json_data = this.model.toJSON();
            console.log(json_data);
            this.video_type_string = json_data.filename.substr(json_data.filename.lastIndexOf('.') + 1) || null;
        }
        return this.video_type_string;
    },
    render: function() {
        $(this.el).empty();
        var video = $("<video>");
        video.attr("width", "100%");
        video.attr("height", "100%");
        video.attr("controls", "cotrols");
        video.attr("autoplay", "autoplay");
        var source = $("<source>");
        source.attr("src", this.model.toJSON().filename);
        video.append(source);
        var back_button = $("<div>");
        back_button.attr("id", "video_back_button");
        back_button.addClass("video_player_back");
        $(this.el).append(video);
        $(this.el).append(back_button);

        this.$('#video_back_button').hover(
            function() {
                $(this).switchClass('video_player_back', 'video_player_back_hover', 300);
            },
            function() {
                $(this).switchClass('video_player_back_hover', 'video_player_back', 300);
            }
        );
    }
});
