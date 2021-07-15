        $(function() {
            function notify(input) {
                var msg = "Selected " + $.trim(input.data("tooltip-title") || input.text());
                $("<div>")
                    .appendTo(document.body)
                    .text(msg)
                    .addClass("notification ui-state-default ui-corner-bottom")
                    .position({
                        my: "center top",
                        at: "center top",
                        of: window
                    })
                    .show({
                        effect: "blind"
                    })
                    .delay(1000)
                    .hide({
                        effect: "blind",
                        duration: "slow"
                    }, function() {
                        $(this).remove();
                    });
            }

            $("button").each(function() {
                var button = $(this).button({
                    icons: {
                        primary: $(this).data("icon")
                    },
                    text: !!$(this).attr("title")
                });
                button.not(".menu").on("click", function() {
                    notify(button);
                });
            });
            $(".set").controlgroup({
                items: {
                    "button": "button"
                }
            });

            $("button.menu")
                .on("click", function() {
                    $(document).tooltip("close", {
                        currentTarget: this
                    });
                    var menu = $(this).next().show().position({
                        my: "left top",
                        at: "left bottom",
                        of: this
                    });
                    $(document).one("click", function() {
                        menu.hide();
                    });
                    return false;
                })
                .next()
                .hide()
                .menu({
                    selected: function(event, ui) {
                        notify(ui.item);
                    }
                });

            $(document).tooltip({
                position: {
                    my: "center top",
                    at: "center bottom+5",
                },
                show: {
                    duration: "fast"
                },
                hide: {
                    effect: "hide"
                }
            });
        });


        /*Progressbar*/


        $(function() {
            var progressbar = $("#progressbar").progressbar();
            var progressText = $("#progress-text");
            $("#progressbar").progressbar({

                value: 10,

                change: function(event, ui) {

                    progressText.text(
                        progressbar.progressbar("value") + "%"
                    );
                },

                complete: function(event, ui) {

                    alert("Du hast 100% erreicht");
                }

            });

            function progress() {

                var value = progressbar.progressbar("value");
                progressbar.progressbar("value", value + 1);
                if (value < 99) {
                    setTimeout(progress, 100);
                }
            }
            setTimeout(progress, 2000);
        })