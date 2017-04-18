const cheerio = require('cheerio')
const request = require('request')

const baseUrl = 'http://www.aucklandcouncil.govt.nz'

function main() {
    getNotices()
        .then(notices => {
            return Promise.all(notices.Other.map(getNotice))
        })
        .then((notices) => {
            console.log(notices)
            process.exit()
        })
}

function getNotice({url, text}) {
    return new Promise(resolve => {
        request(url, (error, response, html) => {
            if (error) throw error
            const $ = cheerio.load(html)
            const content = $('#content_middle')
            const notice = {
                title: content.find('h2').text().trim(),
                date: content.find('.date').text().trim(),
                content: content.find('.pagecontent > div').html(),
                unknown: {
                    full: content.find('.full').text().trim(),
                    byline: content.find('.byline').text().trim(),
                }
            }

            resolve(notice)
        })
    })
}

function getNotices() {
    return new Promise(resolve => {
        const url = `${baseUrl}/EN/newseventsculture/OurAuckland/PublicNotices/Pages/Home.aspx`

        request(url, (error, response, html) => {
            if (error) throw error
            const $ = cheerio.load(html)

            elements = []
            $('#ZoneA').find('a').filter(function () {
                elements.push($(this))
            })

            const all = []
            let results

            elements.map((element) => {
                const url = element.attr('href')
                if (url) {
                    const text = element.text()
                    results.notices.push({url, text})
                } else {
                    if (results) {
                        all.push(results)
                    }

                    results = {
                        notices: [],
                        description: element.parent().text().trim()
                    }
                }
            })
            all.push(results)
            const map = {}
            all.forEach(({description, notices}) => map[description] = notices)

            resolve(map)
        })
    })
}

main()
