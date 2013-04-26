/**
 * A Twitter Fontana with a settings panel and fullscreen option.
 */

$(function () {
    var settings, settingsGUI, data, fontana, params, i, pair, key, value, feed;

    // Create the settings and the settings panel
    settings = new Fontana.config.Settings();
    settingsGUI = new Fontana.config.SettingsGUI($('footer'), settings);
    if (window.location.search) {
        settingsGUI.loadSettingsFromUrl();
    }
    settingsGUI.draw(function () {
        settingsGUI.toggle();
    });

    // Setup the actual fountain
    params = window.location.search.substring(1).replace(/\+/g, ' ').split('&');
    for (i = 0; i < params.length; i++) {
        pair = params[i].split('=')
        key = decodeURIComponent(pair[0]);
        value = decodeURIComponent(pair[1]);
        if (key == 'url') {
            feed = value;
        }
    }
    data = new Fontana.datasources.CrowdConvergence(feed);
    fontana = new Fontana.GUI(data, settings);
    fontana.start($('#twitter-fontana'));

    // Make settings buttons toggle the settings panel
    $('.settings > a').live('click', function (e) {
        e.preventDefault();
        settingsGUI.toggle();
    });

    // Make pause button work
    $('.pause').click(function (e) {
        e.preventDefault();
        if (fontana.paused) {
            fontana.resume();
            $(this).removeClass('paused');
        }
        else {
            fontana.pause();
            $(this).addClass('paused');
        }
    });

    // Make fullscreen buttons work
    $('.fullscreen').click(function (e) {
        e.preventDefault();
        settingsGUI.toggle(false);
        Fontana.utils.requestFullscreen(document.getElementById('twitter-fontana'));
    });
});


/* Twitter Tweet button */
!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src="//platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,"script","twitter-wjs");


/* Google Webfonts */
WebFontConfig = {
    google: { families: ['Open+Sans:400,600:latin,latin-ext',
                         'Crete Round::latin,latin-ext',
                         'Enriqueta::latin,latin-ext',
                         'Exo::latin,latin-ext',
                         'Handlee::latin,latin-ext',
                         'Imprima::latin,latin-ext'] }
};
(function() {
    var wf = document.createElement('script');
    wf.src = 'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30289566-2']);
_gaq.push(['_setDomainName', 'twitterfontana.com']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'http://www.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


var _gauges = _gauges || [];
(function() {
    var t   = document.createElement('script');
    t.type  = 'text/javascript';
    t.async = true;
    t.id    = 'gauges-tracker';
    t.setAttribute('data-site-id', '4ffc0f6ff5a1f54c9f00003c');
    t.src = '//secure.gaug.es/track.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(t, s);
})();
