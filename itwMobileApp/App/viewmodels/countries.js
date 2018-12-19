define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
        self.className = 'Laureates by Countries';
        self.marker = ko.observable();
        self.description = 'I HATE THIS! <br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
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

        //-----> MY BAD CODE BEGINS HERE
        //-----> I BET SuperMiguel WOULD DO IN 1/3rd OF THE LINES AND 1/10th OF THE TIME


        // Initialize and add the map
        function initMap() {
          // The location of Uluru
          var uluru = {lat: -25.344, lng: 131.036};
          // The map, centered at Uluru
          var map = new google.maps.Map(
              document.getElementById('map_canvas'), {zoom: 0, center: uluru});
          // The marker, positioned at Uluru
          var marker = new google.maps.Marker({position: uluru, map: map});
        }

        //--- External functions (accessible outside)
        getLaureates = function () {
            console.log('CALL: LaureadoIndividuos...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureates(data);
            });
        };


        //Google Maps function
        function initMap() {
          var center = {lat: 41.8781, lng: -87.6298};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: center
          });
          var marker = new google.maps.Marker({
            position: center,
            map: map
          });
        }







        //---- initial call
        getLaureates();
    };
    return vm;
});