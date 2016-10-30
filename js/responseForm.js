(function(ns) {
    ns.responseForm = function me() {
        me.fullName = ko.observable();
        me.fullNameValid = ko.observable(true);
        me.phone = ko.observable();
        me.phoneValid = ko.observable(true);
        me.email = ko.observable();
        me.emailValid = ko.observable(true);
        me.subject = ko.observable();
        me.subjectValid = ko.observable(true);
        me.message = ko.observable();
        me.messageValid = ko.observable(true);

        me.hasError = ko.observable(false);
        me.hasResponse = ko.observable(false);
        me.responseMessage = ko.observable();

        me.btn_click_submit = function () {
            if (me.validateForm()) {
                me.sendForm();
            }
        };
        me.validateForm = function () {
            var isValid = true;

            // fullName
            me.fullNameValid(true);
            if (!me.fullName()) {
                isValid = false;
                me.fullNameValid(false);
            }

            // phone
            me.phoneValid(true);
            if (!me.phone()) {
                isValid = false;
                me.phoneValid(false);
            }

            // email
            me.emailValid(true);
            if (!me.email()) {
                isValid = false;
                me.emailValid(false);
            }

            // subject
            me.subjectValid(true);
            if (!me.subject()) {
                isValid = false;
                me.subjectValid(false);
            }

            // message
            me.messageValid(true);
            if (!me.message()) {
                isValid = false;
                me.messageValid(false);
            }

            return isValid;
        };
        me.sendForm = function() {
            // reset form
            me.hasError(false);
            me.hasResponse(false);

            // send message
            $.blockUI({
                css: {
                    border: 'none', backgroundColor: '#00C6FF', color: '#fff'
                }
            });
            $.ajax({
                url: me.createUrl(),
                method: "GET",
                dataType: "jsonp",
                success: function (args) {
                    me.hasResponse(true);
                    me.hasError(args.hasError);
                    me.responseMessage(args.responseMessage);
                    if (me.hasError()) {
                        console.error(args);
                    } else {
                        console.log(args);
                        me.clearForm();
                    }
                    $.unblockUI();
                },
                error: function (args) {
                    me.hasResponse(true);
                    me.hasError(true);
                    me.responseMessage(args.statusText);
                    console.error(args.statusText);
                    $.unblockUI();
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
            if (me.fullName()) {
                url += "&fullName=" + encodeURIComponent(me.fullName());
            }
            if (me.phone()) {
                url += "&phone=" + encodeURIComponent(me.phone());
            }
            if (me.email()) {
                url += "&email=" + encodeURIComponent(me.email());
            }
            if (me.subject()) {
                url += "&subject=" + encodeURIComponent(me.subject());
            }
            if (me.message()) {
                url += "&message=" + encodeURIComponent(me.message());
            }
            return url;
        };
        return me;
    }();

    $(document)
        .ready(function() {
            ko.applyBindings(ns.responseForm, $("#contactForm")[0]);
        });
})(this);