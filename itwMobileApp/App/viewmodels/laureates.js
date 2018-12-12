define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
        self.className = 'LaureadoIndividuos';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for laureates and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.laureates = ko.observableArray([]);
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        //--- External functions (accessible outside)
        getLaureates = function () {
            console.log('CALL: LaureadoIndividuos...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureates(data);
            });
        };

        //---- initial call
        getLaureates();
    };
    return vm;
});
