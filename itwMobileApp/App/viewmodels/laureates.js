define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
        var page = '?page=';
        var laureateID;
        var arrayDetails = [];
        var arrayLaureates = [];
        self.className = 'Laureates';
        self.description = 'END OF LIST';
        self.error = ko.observable();
        self.laureates = ko.observableArray([]);
        self.decadesXX = ko.observableArray([{label: '00s', from:1900, until:1910, title:'1901 to 1909'}, {label: '10s', from:1910, until:1920, title:'1910 to 1919'}, {label: '20s', from:1920, until:1930, title:'1920 to 1929'}, {label: '30s', from:1930, until:1940, title:'1930 to 1939'}, {label: '40s', from:1940, until:1950, title:'1940 to 1949'}, {label: '50s', from:1950, until:1960, title:'1950 to 1959'}, {label: '60s', from:1960, until:1970, title:'1960 to 1969'}, {label: '70s', from:1970, until:1980, title:'1970 to 1979'}, {label: '80s', from:1980, until:1990, title:'1980 to 1989'}, {label: '90s', from:1990, until:2000, title:'1990 to 1999'}]);
        self.decadesXXI = ko.observableArray([{label: '00s', from:2000, until:2010, title:'2000 to 2009'}, {label: '10s', from:2010, until:2018, title:'2010 to 2018'}]);
        self.tooltip = ko.observable("title=''");
        self.decadeSelection = ko.observable();
        self.listTitle = ko.observable();
        var originalLaureate = [];

        self.decadeSelection2 = function(from, until, title){
            var sizeOriginal = originalLaureate.length;
            self.laureates([]);
            self.listTitle = title;
            console.log(self.listTitle);
            var aux = [];
            for(var i= 0; i < sizeOriginal; i++){
                var elem = originalLaureate[i];
                ajaxHelper(baseUri+'/'+elem.LaureadoId, 'GET').done(function (data) {
                    //console.log(data);
                    for(var k = 0; k < data.PremioNobel.length; k++){
                        if(data.PremioNobel[k].Ano > from && data.PremioNobel[k].Ano < until){
                            aux.push(data);
                            //console.log(aux);
                        }
                    }
                    if(i == sizeOriginal){
                        self.laureates(aux);
                        //console.log(aux);
                    }
                });
            }
        }

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
            });
        };


//--- External functions (accessible outside)
        getLaureates = function () {
            console.log('CALL: LaureadoIndividuos...');
            ajaxHelper(baseUri+page+'1', 'GET').done(function (data) {
                //self.laureates(data);
                var m;
                for(m = 0;m<data.length;m++){
                    arrayLaureates.push(data[m]);
                }
            });
            var n;
            for (n = 2; n<=9; n++){
                ajaxHelper(baseUri+page+n.toString(), 'GET').done(function (data) {
                    var i;
                    for (i in data) {
                        //self.laureates.push(data[i]);
                        arrayLaureates.push(data[i]);
                    }
                });
            }
            originalLaureate = arrayLaureates;

        };

        //---- initial call
        getLaureates();
        console.log('-----> ponto de teste');
    };
    return vm;
});
