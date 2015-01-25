/**
 * Apache watcher
 * @todo check if target files exist
 */
(function(app)
{

    'use strict';

    var module = function()
    {

        var events = new app.node.events.EventEmitter();
        var watcher;

        /**
         * Attaches an event
         * @param event
         * @param callback
         */
        this.on = function(event, callback)
        {
            events.on(event, callback);
        };

        /**
         * Starts watching the needed apache files
         */
        this.watch = function()
        {
            watcher = app.node.watcher.watch(app.models.apache.confPath, {persistent: true});
            watcher.add(app.models.apache.modulesPath);
            watcher.on('change', _onFileChange);
            watcher.on('ready', _onFileChange);
            app.logActivity(app.locale.apache.watch.replace('%s', app.models.apache.confPath));
            app.logActivity(app.locale.apache.watch.replace('%s', app.models.apache.modulesPath));
        };
        
        /**
         * Stops watching files
         */
        this.unwatch = function()
        {
            watcher.close();
        };

        /**
         * Triggers when a configuration file is update
         * @private
         */
        var _onFileChange = function()
        {
            app.logActivity(app.locale.apache.filechange);
            events.emit('change');
        }

    };

    app.utils.apache.watcher = module;

})(window.App);