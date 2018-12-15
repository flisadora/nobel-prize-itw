define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/welcome', nav: false },
                { route: 'laureates', moduleId: 'viewmodels/laureates', nav: true },
                { route: 'countries', moduleId: 'viewmodels/countries', nav: true },
                { route: 'search', moduleId: 'viewmodels/search', nav: true },
                { route: 'prizes', moduleId: 'viewmodels/prizes', nav: false },
                { route: 'laureadoDetalhes/:id', moduleId: 'viewmodels/laureadoDetalhes', nav: false },
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});