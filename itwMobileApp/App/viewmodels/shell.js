﻿define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false },
                { route: 'laureates', moduleId: 'viewmodels/laureates', nav: true },
                { route: 'prizes', moduleId: 'viewmodels/prizes', nav: true },
                //{ route: 'search', moduleId: 'viewmodels/search', nav: true },
                { route: 'laureateDetails/:id', moduleId: 'viewmodels/laureateDetails', nav: false },
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});