define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
        var page = '?page=';
        var laureateID;
        self.className = 'Laureates';
        self.description = 'I HATE THIS PAGE! <br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.laureates = ko.observableArray([]);
        self.laureatesDetails = ko.observableArray([]);
        self.decades190 = ko.observableArray([]);
        self.decades191 = ko.observableArray([]);
        self.decades192 = ko.observableArray([]);
        self.decades193 = ko.observableArray([]);
        self.decades194 = ko.observableArray([]);
        self.decades195 = ko.observableArray([]);
        self.decades196 = ko.observableArray([]);
        self.decades197 = ko.observableArray([]);
        self.decades198 = ko.observableArray([]);
        self.decades199 = ko.observableArray([]);
        self.decades200 = ko.observableArray([]);
        self.decades201 = ko.observableArray([]);

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
            console.log('CALL: LaureadoIndividuos...');
            ajaxHelper(baseUri+page+'1', 'GET').done(function (data) {
                self.laureates(data);
                //self.laureatesDetails(); //Inicializa array de detalhes 
                defineDecades(data);
            });
            var n;
            for (n = 2; n<=9; n++){
                ajaxHelper(baseUri+page+n.toString(), 'GET').done(function (data) {
                    //defineDecades(data);
                    var i;
                    for (i in data) {
                        self.laureates.push(data[i]);
                    }
                });
            }
        };


//--- Funtion define Laureates for decades
    defineDecades = function(array) {
        console.log("Im in BITCHES!");
        console.log(array[0].LaureadoId);
        console.log(array.length);
        var k;
        var laureateDet;
        for (k=0;k<array.length;k++){
            //laureateID = k.LaureadoId;
            console.log('ISADORA',baseUri+'/'+array[k].LaureadoId);
            ajaxHelper(baseUri+'/'+array[k].LaureadoId, 'GET').done(function (data) {
                if(self.laureatesDetails().length == 0) {
                    self.laureatesDetails(data);
                    console.log('LAUREATE DETAILS VAZIO');
                    console.log(self.laureatesDetails().length);
                } else{
                    self.laureatesDetails.push(data);
                    //console.log(data);
                    laureateDet = data;
                }
            });
            var p;
            for(p=0;p<laureateDet.PremioNobel.length;p++){
                var year = laureateDet.PremioNobel.Ano;
                var century = year.substring(0,2);
                var decade = year.substring(2,3);
                if(century==20) decade+= 10;
                switch (decade) {
                  case 0:
                    self.decades190.push(array[k]);
                    break;
                  case 1:
                    self.decades191.push(array[k]);
                    break;
                  case 2:
                    self.decades192.push(array[k]);
                    break;
                  case 3:
                    self.decades193.push(array[k]);
                    break;
                  case 4:
                    self.decades194.push(array[k]);
                    break;
                  case 5:
                    self.decades195.push(array[k]);
                    break;
                  case 6:
                    self.decades196.push(array[k]);
                    break;
                  case 7:
                    self.decades197.push(array[k]);
                    break;
                  case 8:
                    self.decades198.push(array[k]);
                    break;
                  case 9:
                    self.decades199.push(array[k]);
                    break;
                  case 10:
                    self.decades200.push(array[k]);
                    break;
                  case 11:
                    self.decades201.push(array[k]);
                };  
            }
        }
        
    };


        //---- initial call
        getLaureates();
    };
    return vm;
});
