define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/PremioNobels';
        self.className = 'Nobel Prizes';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for prizes and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.prizes = ko.observableArray([]);
        self.prizeDetails = ko.observableArray([]);
        var originalPrizes = [];
        var allPrizesDetails = [];


        self.catSelection = function(category){
            var dataDetails = [];
            allPrizesDetails = [];
            ajaxHelper(baseUri+'?Category='+category+'&SortBy=Ano', 'GET').done(function (data) {
                //console.log(data);
                self.prizes(data);
                for(var n = 0; n < data.length; n++){
                    ajaxHelper(baseUri+'/'+data[n].PremioNobelId, 'GET').done(function (data) {
                        dataDetails.push(data);
                    });
                }
                allPrizesDetails = dataDetails;
            });

        };

        self.setDetails = function(prizeId){
            var aux = allPrizesDetails;
            for(var i = 0; i < aux.length; i++){
                if(prizeId == aux[i].PremioNobelId){
                    self.prizeDetails(aux[i]);
                }
            }
        };

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
        //--- Externel functions (accessible outside)
        getPrizes = function () {
            console.log('CALL: PremioNobels...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                //self.prizes(data);
                originalLaureate = data;
            });
        };

        //---- initial call
        getPrizes();
    };
    return vm;
});
