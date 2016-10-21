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
            // reset form
            me.hasError(false);
            me.hasResponse(false);

            // send message
            var url = "https://script.google.com/macros/s/AKfycbwsxEZYpqh4aieArLo03rQsf3UFln5oG1HM5UTgyhExwSmJkJI/exec";
            url += "?source=" + encodeURIComponent("247up.nl");
            url += "&fullName=" + encodeURIComponent(me.fullName());
            url += "&phone=" + encodeURIComponent(me.phone());
            url += "&email=" + encodeURIComponent(me.email());
            url += "&subject=" + encodeURIComponent(me.subject());
            url += "&message=" + encodeURIComponent(me.message());
            $.ajaxSetup({ crossOrigin: true });
            $.ajax({
                crossDomain: true,
                url: url,
                method: "GET",
                dataType: "jsonp",
                success: function (args) {
                    me.fullName("");
                    me.phone("");
                    me.email("");
                    me.subject("");
                    me.message("");

                    me.hasError(args.hasError);
                    me.hasResponse(true);
                    me.responseMessage($.parseJSON(args).responseMessage);
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