const scraperjs = require('scraperjs')

const url = 'http://www.aucklandcouncil.govt.nz/EN/newseventsculture/OurAuckland/PublicNotices/Pages/Home.aspx';
scraperjs.StaticScraper.create(url)
    .scrape(function($) {
        return $('#ZoneA a').map(function() {
            return $(this).text();
        }).get();
    })
    .then(function(news) {
        console.log(news);
    })