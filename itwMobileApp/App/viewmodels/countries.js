define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/PremioNobels';
        self.className = 'PremioNobels';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for prizes and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.prizes = ko.observableArray([]);
        self.categories = ko.observableArray([]);
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
        //var cat = [];
        //--- Externel functions (accessible outside)
        getPrizes = function () {
            console.log('CALL: PremioNobels...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizes(data);
                //for(var i = 0; i<data.length;i++){
                //    for (var j = 0; j < cat.length; j++){
                //        if (! data[i].Categoria.Nome in cat) {
                //            cat.push(data[i].Categoria.Nome);
                //        };
                //    };
                //};
                //console.log(cat);
            });
        };
       
        //---- initial call
        getPrizes();
    };
    return vm;
});
