(function (ns) {
    ns.responseForm = function me() {
        me.fullName = ko.observable();
        me.phone = ko.observable();
        me.email = ko.observable();
        me.subject = ko.observable();
        me.message = ko.observable();

        me.hasError = ko.observable(false);
        me.hasResponse = ko.observable(false);
        me.responseMessage = ko.observable();

        me.btn_click_submit = function () {
            // get form data
            var data = JSON.stringify({
                source: "247up.nl",
                fullName: me.fullName(),
                phone: me.phone(),
                email: me.email(),
                subject: me.subject(),
                message: me.message()
            });

            // reset form
            me.fullName("");
            me.phone("");
            me.email("");
            me.subject("");
            me.message("");
            me.responseMessage("");
            me.hasError(false);
            me.hasResponse(false);

            // send message
            var url = "https://script.google.com/macros/s/AKfycbwsxEZYpqh4aieArLo03rQsf3UFln5oG1HM5UTgyhExwSmJkJI/exec";
            url += "?data=" + encodeURIComponent(data);
            $.ajaxSetup({ crossOrigin: true });
            $.ajax({
                crossDomain: true,
                url: url,
                method: "GET",
                dataType: "jsonp",
                success: function (args) {
                    me.hasError(args.hasError);
                    me.hasResponse(true);
                    var o = $.parseJSON(args);
                    me.responseMessage(o.responseMessage);
                },
                error: function(args) {
                    me.hasError(true);
                    me.hasResponse(true);
                    me.responseMessage(args.statusText);
                    console.error(args.statusText);
                }
            });
        }

        return me;
    }();
  
    $(document).ready(function() {
        ko.applyBindings(ns.responseForm, $("#contactForm")[0]);
    });
})(this);