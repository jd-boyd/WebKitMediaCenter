var HomeView = Backbone.View.extend({
    tag: "div",
    events: {
        "click #videos_link": "select_videos",
        "click #images_link": "select_images",
        "click #music_link": "select_music"
    },
    initialize: function() {
        _.bindAll(this, "render");
        _.bindAll(this, "select_images");
        _.bindAll(this, "select_videos");
        _.bindAll(this, "select_music");
    },
    select_videos: function(event) {
        event.preventDefault();
        $("#overlay").empty();
        if (!_.isNull(this.video_view)) {
            delete this.video_view;
            this.video_view = null;
        }
        load_template("videos.tmpl", function(data) {
            this.video_view = new VideosView({
                el: $("<div>"),
                model: new VideosModel({
                    file_list: JSON.parse(videos.root())
                })
            });
            this.video_view.set_template(data);
            this.video_view.render();
            $("#overlay").append(this.video_view.el);
            $("#content").fadeOut(250);
            setTimeout('$("#overlay").fadeIn(250);', 250);
        });
    },
    select_images: function(event) {
        event.preventDefault();
    },
    select_music: function(event) {
        event.preventDefault();
        $("#overlay").empty();
        if (!_.isNull(this.audio_view)) {
            delete this.audio_view;
            this.audio_view = null;
        }
        load_template("audio.tmpl", function(data) {
            this.audio_view = new AudioView({
                el: $("<div>"),
                model: new AudioModel({
                    file_list: JSON.parse(audio.root())
                })
            });
            this.audio_view.set_template(data);
            this.audio_view.render();
            $("#overlay").append(this.audio_view.el);
            $("#content").fadeOut(250);
            setTimeout('$("#overlay").fadeIn(250);', 250);
        });

    },
    set_template: function(template_data) {
        this.template = template_data;
    },
    render: function() {
        var template_data = {};

        var html = $(Mustache.to_html(this.template, template_data));
        $(this.el).append(html);

        this.$('a').hover(
            function() {
                $(this).switchClass('home_link', 'home_link_hover', 300);
            },
            function() {
                $(this).switchClass('home_link_hover', 'home_link', 300);
            }
        );
    }
});
