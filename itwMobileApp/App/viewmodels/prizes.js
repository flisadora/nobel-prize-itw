define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/PremioNobels';
        self.className = 'Nobel Prizes';
        self.description = '';
        self.error = ko.observable();
        self.prizes = ko.observableArray([]);
        self.prizeDetails = ko.observable();

        var prizesCache = {};
        var originalPrizes = [];
        var allPrizesDetails = [];


        self.catSelection = function(category){
            $("#infoText").addClass("invisible");
            
            if(prizesCache[category] === undefined){
                ajaxHelper(baseUri+'?Category='+category+'&SortBy=Ano', 'GET').done(function (data) {
                    var proms = [];
                    for(var n = 0; n < data.length; n++){
                        proms.push(ajaxHelper(baseUri+'/'+data[n].PremioNobelId, 'GET'));
                    }
                    Promise.all(proms).then(function(all_prizes){
                        prizesCache[category] = all_prizes;
                        console.log(category);
                        console.log(prizesCache[category]);
                        self.prizes(prizesCache[category]);
                    });
                });
            }
            else{
                self.prizes(prizesCache[category]);
            }
        };
       
        self.setDetails = function(prize){
            console.log(prize);
            //var aux = allPrizesDetails;
            //var auxPrizeDetails = [];
            //for(var i = 0; i < aux.length; i++){
            //    if(prizeId == aux[i].PremioNobelId){
            //        self.prizeDetails(aux[i]);
            //        console.log(aux[i]);
            //    }
            //}
            self.prizeDetails(prize);
            //self.prizeDetails(auxPrizeDetails);
            //console.log(self.prizeDetails);
        };

        //self.closeModal = function() {
        //    $('.modal').modal('hide');
        //    console.log("close modal");
        //};

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
