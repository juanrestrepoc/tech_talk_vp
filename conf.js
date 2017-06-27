const HtmlReporter = require('protractor-jasmine2-screenshot-reporter');

const reporter = new HtmlReporter({
    dest: './reports',
    filename: 'html-report.html',
    reportTitle: "Tech Talk"
});

exports.config = {
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 300000
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'phantomjs',
        specs: './spec.js'
    },
    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },

    // Assign the test reporter to each running instance
    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
        browser.driver.manage().window().setSize(1920, 1080);
        browser.manage().timeouts().implicitlyWait(800000);
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
}