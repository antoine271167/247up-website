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
            var url = "https://script.google.com/macros/s/AKfycbylBuCkhBdG3jH6H2h3T4cQPnF41X4_DXv275n1J5i75IQ_35Rz/exec";
            //var url = "https://script.google.com/macros/s/AKfycbz9G0kaTHSeqSAatNdf3LOu_1mqnIK9o_zKz634sTJK/dev";
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