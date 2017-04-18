const cheerio = require('cheerio')
const request = require('request')

url = 'http://www.aucklandcouncil.govt.nz/EN/newseventsculture/OurAuckland/PublicNotices/Pages/Home.aspx';

request(url, function(error, response, html){
    if (error) throw error

    const $ = cheerio.load(html)
    const results = []
    const selectors = [
        'a[href]',
        // '*:has(> a:not([href]))',
    ]

    $('#ZoneA').find(selectors.join(',')).filter(() => {
        const element = $(this)
        const text = element.text().trim()
        if (text) console.log(text)
    })
    // console.log(results)
    process.exit()
})
