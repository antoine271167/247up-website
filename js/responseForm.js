(function(ns) {
    ns.responseForm = function me() {
        me.fullName = ko.observable();
        me.phone = ko.observable();
        me.email = ko.observable();
        me.subject = ko.observable();
        me.message = ko.observable();

        me.hasError = ko.observable(false);
        me.hasResponse = ko.observable(false);
        me.responseMessage = ko.observable();

        me.btn_click_submit = function() {
            // reset form
            me.hasError(false);
            me.hasResponse(false);

            // send message
            $.ajax({
                url: me.createUrl(),
                method: "GET",
                dataType: "jsonp",
                success: function(args) {
                    me.hasResponse(true);
                    me.hasError(args.hasError);
                    me.responseMessage(args.responseMessage);
                    if (me.hasError()) {
                        console.error(args);
                    } else {
                        console.log(args);
                        me.clearForm();
                    }
                },
                error: function(args) {
                    me.hasResponse(true);
                    me.hasError(true);
                    me.responseMessage(args.statusText);
                    console.error(args.statusText);
                }
            });
        };
        me.clearForm = function() {
            me.fullName("");
            me.phone("");
            me.email("");
            me.subject("");
            me.message("");
        };
        me.createUrl = function() {
            var url = "https://script.google.com/macros/s/AKfycbxkHbRnC3vCNziulyP5GG-5sME2b5q5-_9l3DgWMcYGtO39splv/exec";
            url += "?source=" + encodeURIComponent("247up.nl");
            url += "&fullName=" + encodeURIComponent(me.fullName());
            url += "&phone=" + encodeURIComponent(me.phone());
            url += "&email=" + encodeURIComponent(me.email());
            url += "&subject=" + encodeURIComponent(me.subject());
            url += "&message=" + encodeURIComponent(me.message());
            return url;
        };
        return me;
    }();

    $(document)
        .ready(function() {
            ko.applyBindings(ns.responseForm, $("#contactForm")[0]);
        });
})(this);