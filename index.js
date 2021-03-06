const cheerio = require('cheerio')
const request = require('request')
const Language = require('@google-cloud/language')
const geocoder = require('geocoder')


const mockResults = '[[{"name":"lease","type":"OTHER","metadata":{},"salience":0.11535070836544037,"mentions":[{"text":{"content":"lease","beginOffset":-1},"type":"COMMON"}]},{"name":"Auckland Council","type":"ORGANIZATION","metadata":{"wikipedia_url":"http://en.wikipedia.org/wiki/Auckland_Council","mid":"/m/0642svx"},"salience":0.09406536817550659,"mentions":[{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"}]},{"name":"submissions","type":"WORK_OF_ART","metadata":{},"salience":0.07710202038288116,"mentions":[{"text":{"content":"submissions","beginOffset":-1},"type":"COMMON"}]},{"name":"Local Government Act 2002","type":"WORK_OF_ART","metadata":{"mid":"/m/0cc5cx","wikipedia_url":"http://en.wikipedia.org/wiki/Local_Government_Act_2002"},"salience":0.07339221984148026,"mentions":[{"text":{"content":"Local Government Act 2002","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Local Government Act 2002","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Act","beginOffset":-1},"type":"COMMON"}]},{"name":"persons","type":"PERSON","metadata":{},"salience":0.06660247594118118,"mentions":[{"text":{"content":"persons","beginOffset":-1},"type":"COMMON"}]},{"name":"objections","type":"OTHER","metadata":{},"salience":0.06211705133318901,"mentions":[{"text":{"content":"objections","beginOffset":-1},"type":"COMMON"}]},{"name":"John G Kay Park","type":"LOCATION","metadata":{},"salience":0.0487770214676857,"mentions":[{"text":{"content":"John G Kay Park","beginOffset":-1},"type":"PROPER"},{"text":{"content":"John G Kay Park","beginOffset":-1},"type":"PROPER"}]},{"name":"89 Waipa Street","type":"LOCATION","metadata":{},"salience":0.0487770214676857,"mentions":[{"text":{"content":"89 Waipa Street","beginOffset":-1},"type":"PROPER"},{"text":{"content":"89 Waipa Street","beginOffset":-1},"type":"PROPER"}]},{"name":"Birkenhead","type":"LOCATION","metadata":{"mid":"/m/04jylx","wikipedia_url":"http://en.wikipedia.org/wiki/Birkenhead,_New_Zealand"},"salience":0.0487770214676857,"mentions":[{"text":{"content":"Birkenhead","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Birkenhead","beginOffset":-1},"type":"PROPER"}]},{"name":"community lease","type":"OTHER","metadata":{},"salience":0.0486309789121151,"mentions":[{"text":{"content":"community lease","beginOffset":-1},"type":"COMMON"}]},{"name":"Elena Malkova","type":"PERSON","metadata":{},"salience":0.027747584506869316,"mentions":[{"text":{"content":"Elena Malkova","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Contact","beginOffset":-1},"type":"COMMON"},{"text":{"content":"Elena Malkova","beginOffset":-1},"type":"PROPER"}]},{"name":"interest","type":"OTHER","metadata":{},"salience":0.018839824944734573,"mentions":[{"text":{"content":"interest","beginOffset":-1},"type":"COMMON"}]},{"name":"community lease","type":"OTHER","metadata":{},"salience":0.013910711742937565,"mentions":[{"text":{"content":"community lease","beginOffset":-1},"type":"COMMON"}]},{"name":"Submissions","type":"WORK_OF_ART","metadata":{},"salience":0.01010048296302557,"mentions":[{"text":{"content":"Submissions","beginOffset":-1},"type":"COMMON"}]},{"name":"plan","type":"OTHER","metadata":{},"salience":0.009601151570677757,"mentions":[{"text":{"content":"plan","beginOffset":-1},"type":"COMMON"}]},{"name":"lease","type":"OTHER","metadata":{},"salience":0.009325721301138401,"mentions":[{"text":{"content":"lease","beginOffset":-1},"type":"COMMON"}]},{"name":"lease","type":"OTHER","metadata":{},"salience":0.00927747506648302,"mentions":[{"text":{"content":"lease","beginOffset":-1},"type":"COMMON"}]},{"name":"fee simple","type":"OTHER","metadata":{},"salience":0.009017638862133026,"mentions":[{"text":{"content":"fee simple","beginOffset":-1},"type":"COMMON"}]},{"name":"council","type":"ORGANIZATION","metadata":{},"salience":0.008438779972493649,"mentions":[{"text":{"content":"council","beginOffset":-1},"type":"COMMON"}]},{"name":"John G Kay Park","type":"PERSON","metadata":{},"salience":0.008137903176248074,"mentions":[{"text":{"content":"John G Kay Park","beginOffset":-1},"type":"PROPER"}]},{"name":"person","type":"PERSON","metadata":{},"salience":0.007588846608996391,"mentions":[{"text":{"content":"person","beginOffset":-1},"type":"COMMON"}]},{"name":"term","type":"OTHER","metadata":{},"salience":0.007282914128154516,"mentions":[{"text":{"content":"term","beginOffset":-1},"type":"COMMON"}]},{"name":"club","type":"ORGANIZATION","metadata":{},"salience":0.007090925704687834,"mentions":[{"text":{"content":"club","beginOffset":-1},"type":"COMMON"}]},{"name":"land","type":"LOCATION","metadata":{},"salience":0.007090925704687834,"mentions":[{"text":{"content":"land","beginOffset":-1},"type":"COMMON"}]},{"name":"objection","type":"OTHER","metadata":{},"salience":0.007065733894705772,"mentions":[{"text":{"content":"objection","beginOffset":-1},"type":"COMMON"}]},{"name":"land","type":"LOCATION","metadata":{},"salience":0.007046650163829327,"mentions":[{"text":{"content":"land","beginOffset":-1},"type":"COMMON"}]},{"name":"respect","type":"OTHER","metadata":{},"salience":0.007046650163829327,"mentions":[{"text":{"content":"respect","beginOffset":-1},"type":"COMMON"}]},{"name":"person","type":"PERSON","metadata":{},"salience":0.006565007846802473,"mentions":[{"text":{"content":"person","beginOffset":-1},"type":"COMMON"}]},{"name":"information","type":"OTHER","metadata":{},"salience":0.006434321869164705,"mentions":[{"text":{"content":"information","beginOffset":-1},"type":"COMMON"}]},{"name":"renewal","type":"OTHER","metadata":{},"salience":0.0062454817816615105,"mentions":[{"text":{"content":"renewal","beginOffset":-1},"type":"COMMON"}]},{"name":"activities","type":"OTHER","metadata":{},"salience":0.00622765626758337,"mentions":[{"text":{"content":"activities","beginOffset":-1},"type":"COMMON"}]},{"name":"occupation","type":"OTHER","metadata":{},"salience":0.00622765626758337,"mentions":[{"text":{"content":"occupation","beginOffset":-1},"type":"COMMON"}]},{"name":"facilities","type":"LOCATION","metadata":{},"salience":0.006188756786286831,"mentions":[{"text":{"content":"facilities","beginOffset":-1},"type":"COMMON"}]},{"name":"Section","type":"OTHER","metadata":{},"salience":0.006188756786286831,"mentions":[{"text":{"content":"Section","beginOffset":-1},"type":"COMMON"}]},{"name":"phone","type":"OTHER","metadata":{},"salience":0.005669024307280779,"mentions":[{"text":{"content":"phone","beginOffset":-1},"type":"COMMON"}]},{"name":"Part Lot 150","type":"OTHER","metadata":{},"salience":0.0053105768747627735,"mentions":[{"text":{"content":"Part Lot 150","beginOffset":-1},"type":"PROPER"}]},{"name":"close","type":"EVENT","metadata":{},"salience":0.004779757931828499,"mentions":[{"text":{"content":"close","beginOffset":-1},"type":"COMMON"}]},{"name":"proposal","type":"OTHER","metadata":{},"salience":0.004779757931828499,"mentions":[{"text":{"content":"proposal","beginOffset":-1},"type":"COMMON"}]},{"name":"respect","type":"OTHER","metadata":{},"salience":0.004779757931828499,"mentions":[{"text":{"content":"respect","beginOffset":-1},"type":"COMMON"}]},{"name":"area","type":"LOCATION","metadata":{},"salience":0.004747370257973671,"mentions":[{"text":{"content":"area","beginOffset":-1},"type":"COMMON"}]},{"name":"submission","type":"EVENT","metadata":{},"salience":0.004508039448410273,"mentions":[{"text":{"content":"submission","beginOffset":-1},"type":"COMMON"}]},{"name":"submissions","type":"WORK_OF_ART","metadata":{},"salience":0.004508039448410273,"mentions":[{"text":{"content":"submissions","beginOffset":-1},"type":"COMMON"}]},{"name":"Malkova@aucklandcouncil.govt.nz","type":"OTHER","metadata":{},"salience":0.004475703928619623,"mentions":[{"text":{"content":"Malkova@aucklandcouncil.govt.nz","beginOffset":-1},"type":"PROPER"}]},{"name":"Elena.","type":"OTHER","metadata":{"mid":"/m/03nvlfp"},"salience":0.004475703928619623,"mentions":[{"text":{"content":"Elena.","beginOffset":-1},"type":"PROPER"}]},{"name":"business","type":"OTHER","metadata":{},"salience":0.004197363276034594,"mentions":[{"text":{"content":"business","beginOffset":-1},"type":"COMMON"}]},{"name":"submission","type":"OTHER","metadata":{},"salience":0.003919489216059446,"mentions":[{"text":{"content":"submission","beginOffset":-1},"type":"COMMON"}]},{"name":"person","type":"PERSON","metadata":{},"salience":0.0038776469882577658,"mentions":[{"text":{"content":"person","beginOffset":-1},"type":"COMMON"}]},{"name":"Birkenhead Tennis Club Incorporated","type":"ORGANIZATION","metadata":{},"salience":0.003642848925665021,"mentions":[{"text":{"content":"Birkenhead Tennis Club Incorporated","beginOffset":-1},"type":"PROPER"}]},{"name":"state","type":"LOCATION","metadata":{},"salience":0.003609968116506934,"mentions":[{"text":{"content":"state","beginOffset":-1},"type":"COMMON"}]},{"name":"Community Lease Advisor","type":"PERSON","metadata":{},"salience":0.002890590578317642,"mentions":[{"text":{"content":"Community Lease Advisor","beginOffset":-1},"type":"COMMON"}]},{"name":"submitter","type":"OTHER","metadata":{},"salience":0.002847887808457017,"mentions":[{"text":{"content":"submitter","beginOffset":-1},"type":"COMMON"}]},{"name":"submission","type":"EVENT","metadata":{},"salience":0.002847887808457017,"mentions":[{"text":{"content":"submission","beginOffset":-1},"type":"COMMON"}]},{"name":"council","type":"ORGANIZATION","metadata":{},"salience":0.002732202410697937,"mentions":[{"text":{"content":"council","beginOffset":-1},"type":"COMMON"}]},{"name":"Auckland 1142","type":"ORGANIZATION","metadata":{},"salience":0.0026527727022767067,"mentions":[{"text":{"content":"Auckland 1142","beginOffset":-1},"type":"PROPER"}]},{"name":"@aucklandcouncil.govt.nz","type":"ORGANIZATION","metadata":{},"salience":0.0026527727022767067,"mentions":[{"text":{"content":"@aucklandcouncil.govt.nz","beginOffset":-1},"type":"PROPER"}]},{"name":"Elena.Malkova","type":"PERSON","metadata":{},"salience":0.002281568944454193,"mentions":[{"text":{"content":"Elena.Malkova","beginOffset":-1},"type":"PROPER"}]},{"name":"part","type":"OTHER","metadata":{},"salience":0.002280229702591896,"mentions":[{"text":{"content":"part","beginOffset":-1},"type":"COMMON"}]},{"name":"objection","type":"OTHER","metadata":{},"salience":0.002280229702591896,"mentions":[{"text":{"content":"objection","beginOffset":-1},"type":"COMMON"}]},{"name":"whole","type":"OTHER","metadata":{},"salience":0.0021295424085110426,"mentions":[{"text":{"content":"whole","beginOffset":-1},"type":"COMMON"}]},{"name":"Bag 92 300","type":"CONSUMER_GOOD","metadata":{},"salience":0.0017005064291879535,"mentions":[{"text":{"content":"Bag 92 300","beginOffset":-1},"type":"PROPER"}]},{"name":"Victoria Street West","type":"LOCATION","metadata":{},"salience":0.0017005064291879535,"mentions":[{"text":{"content":"Victoria Street West","beginOffset":-1},"type":"PROPER"}]},{"name":"Local Government Official Information and Meetings Act 1977","type":"WORK_OF_ART","metadata":{},"salience":0.0014428043505176902,"mentions":[{"text":{"content":"Local Government Official Information and Meetings Act 1977","beginOffset":-1},"type":"PROPER"}]}],{"entities":[{"name":"lease","type":"OTHER","metadata":{},"salience":0.11535070836544037,"mentions":[{"text":{"content":"lease","beginOffset":-1},"type":"COMMON"}]},{"name":"Auckland Council","type":"ORGANIZATION","metadata":{"wikipedia_url":"http://en.wikipedia.org/wiki/Auckland_Council","mid":"/m/0642svx"},"salience":0.09406536817550659,"mentions":[{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Auckland Council","beginOffset":-1},"type":"PROPER"}]},{"name":"submissions","type":"WORK_OF_ART","metadata":{},"salience":0.07710202038288116,"mentions":[{"text":{"content":"submissions","beginOffset":-1},"type":"COMMON"}]},{"name":"Local Government Act 2002","type":"WORK_OF_ART","metadata":{"mid":"/m/0cc5cx","wikipedia_url":"http://en.wikipedia.org/wiki/Local_Government_Act_2002"},"salience":0.07339221984148026,"mentions":[{"text":{"content":"Local Government Act 2002","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Local Government Act 2002","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Act","beginOffset":-1},"type":"COMMON"}]},{"name":"persons","type":"PERSON","metadata":{},"salience":0.06660247594118118,"mentions":[{"text":{"content":"persons","beginOffset":-1},"type":"COMMON"}]},{"name":"objections","type":"OTHER","metadata":{},"salience":0.06211705133318901,"mentions":[{"text":{"content":"objections","beginOffset":-1},"type":"COMMON"}]},{"name":"John G Kay Park","type":"LOCATION","metadata":{},"salience":0.0487770214676857,"mentions":[{"text":{"content":"John G Kay Park","beginOffset":-1},"type":"PROPER"},{"text":{"content":"John G Kay Park","beginOffset":-1},"type":"PROPER"}]},{"name":"89 Waipa Street","type":"LOCATION","metadata":{},"salience":0.0487770214676857,"mentions":[{"text":{"content":"89 Waipa Street","beginOffset":-1},"type":"PROPER"},{"text":{"content":"89 Waipa Street","beginOffset":-1},"type":"PROPER"}]},{"name":"Birkenhead","type":"LOCATION","metadata":{"mid":"/m/04jylx","wikipedia_url":"http://en.wikipedia.org/wiki/Birkenhead,_New_Zealand"},"salience":0.0487770214676857,"mentions":[{"text":{"content":"Birkenhead","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Birkenhead","beginOffset":-1},"type":"PROPER"}]},{"name":"community lease","type":"OTHER","metadata":{},"salience":0.0486309789121151,"mentions":[{"text":{"content":"community lease","beginOffset":-1},"type":"COMMON"}]},{"name":"Elena Malkova","type":"PERSON","metadata":{},"salience":0.027747584506869316,"mentions":[{"text":{"content":"Elena Malkova","beginOffset":-1},"type":"PROPER"},{"text":{"content":"Contact","beginOffset":-1},"type":"COMMON"},{"text":{"content":"Elena Malkova","beginOffset":-1},"type":"PROPER"}]},{"name":"interest","type":"OTHER","metadata":{},"salience":0.018839824944734573,"mentions":[{"text":{"content":"interest","beginOffset":-1},"type":"COMMON"}]},{"name":"community lease","type":"OTHER","metadata":{},"salience":0.013910711742937565,"mentions":[{"text":{"content":"community lease","beginOffset":-1},"type":"COMMON"}]},{"name":"Submissions","type":"WORK_OF_ART","metadata":{},"salience":0.01010048296302557,"mentions":[{"text":{"content":"Submissions","beginOffset":-1},"type":"COMMON"}]},{"name":"plan","type":"OTHER","metadata":{},"salience":0.009601151570677757,"mentions":[{"text":{"content":"plan","beginOffset":-1},"type":"COMMON"}]},{"name":"lease","type":"OTHER","metadata":{},"salience":0.009325721301138401,"mentions":[{"text":{"content":"lease","beginOffset":-1},"type":"COMMON"}]},{"name":"lease","type":"OTHER","metadata":{},"salience":0.00927747506648302,"mentions":[{"text":{"content":"lease","beginOffset":-1},"type":"COMMON"}]},{"name":"fee simple","type":"OTHER","metadata":{},"salience":0.009017638862133026,"mentions":[{"text":{"content":"fee simple","beginOffset":-1},"type":"COMMON"}]},{"name":"council","type":"ORGANIZATION","metadata":{},"salience":0.008438779972493649,"mentions":[{"text":{"content":"council","beginOffset":-1},"type":"COMMON"}]},{"name":"John G Kay Park","type":"PERSON","metadata":{},"salience":0.008137903176248074,"mentions":[{"text":{"content":"John G Kay Park","beginOffset":-1},"type":"PROPER"}]},{"name":"person","type":"PERSON","metadata":{},"salience":0.007588846608996391,"mentions":[{"text":{"content":"person","beginOffset":-1},"type":"COMMON"}]},{"name":"term","type":"OTHER","metadata":{},"salience":0.007282914128154516,"mentions":[{"text":{"content":"term","beginOffset":-1},"type":"COMMON"}]},{"name":"club","type":"ORGANIZATION","metadata":{},"salience":0.007090925704687834,"mentions":[{"text":{"content":"club","beginOffset":-1},"type":"COMMON"}]},{"name":"land","type":"LOCATION","metadata":{},"salience":0.007090925704687834,"mentions":[{"text":{"content":"land","beginOffset":-1},"type":"COMMON"}]},{"name":"objection","type":"OTHER","metadata":{},"salience":0.007065733894705772,"mentions":[{"text":{"content":"objection","beginOffset":-1},"type":"COMMON"}]},{"name":"land","type":"LOCATION","metadata":{},"salience":0.007046650163829327,"mentions":[{"text":{"content":"land","beginOffset":-1},"type":"COMMON"}]},{"name":"respect","type":"OTHER","metadata":{},"salience":0.007046650163829327,"mentions":[{"text":{"content":"respect","beginOffset":-1},"type":"COMMON"}]},{"name":"person","type":"PERSON","metadata":{},"salience":0.006565007846802473,"mentions":[{"text":{"content":"person","beginOffset":-1},"type":"COMMON"}]},{"name":"information","type":"OTHER","metadata":{},"salience":0.006434321869164705,"mentions":[{"text":{"content":"information","beginOffset":-1},"type":"COMMON"}]},{"name":"renewal","type":"OTHER","metadata":{},"salience":0.0062454817816615105,"mentions":[{"text":{"content":"renewal","beginOffset":-1},"type":"COMMON"}]},{"name":"activities","type":"OTHER","metadata":{},"salience":0.00622765626758337,"mentions":[{"text":{"content":"activities","beginOffset":-1},"type":"COMMON"}]},{"name":"occupation","type":"OTHER","metadata":{},"salience":0.00622765626758337,"mentions":[{"text":{"content":"occupation","beginOffset":-1},"type":"COMMON"}]},{"name":"facilities","type":"LOCATION","metadata":{},"salience":0.006188756786286831,"mentions":[{"text":{"content":"facilities","beginOffset":-1},"type":"COMMON"}]},{"name":"Section","type":"OTHER","metadata":{},"salience":0.006188756786286831,"mentions":[{"text":{"content":"Section","beginOffset":-1},"type":"COMMON"}]},{"name":"phone","type":"OTHER","metadata":{},"salience":0.005669024307280779,"mentions":[{"text":{"content":"phone","beginOffset":-1},"type":"COMMON"}]},{"name":"Part Lot 150","type":"OTHER","metadata":{},"salience":0.0053105768747627735,"mentions":[{"text":{"content":"Part Lot 150","beginOffset":-1},"type":"PROPER"}]},{"name":"close","type":"EVENT","metadata":{},"salience":0.004779757931828499,"mentions":[{"text":{"content":"close","beginOffset":-1},"type":"COMMON"}]},{"name":"proposal","type":"OTHER","metadata":{},"salience":0.004779757931828499,"mentions":[{"text":{"content":"proposal","beginOffset":-1},"type":"COMMON"}]},{"name":"respect","type":"OTHER","metadata":{},"salience":0.004779757931828499,"mentions":[{"text":{"content":"respect","beginOffset":-1},"type":"COMMON"}]},{"name":"area","type":"LOCATION","metadata":{},"salience":0.004747370257973671,"mentions":[{"text":{"content":"area","beginOffset":-1},"type":"COMMON"}]},{"name":"submission","type":"EVENT","metadata":{},"salience":0.004508039448410273,"mentions":[{"text":{"content":"submission","beginOffset":-1},"type":"COMMON"}]},{"name":"submissions","type":"WORK_OF_ART","metadata":{},"salience":0.004508039448410273,"mentions":[{"text":{"content":"submissions","beginOffset":-1},"type":"COMMON"}]},{"name":"Malkova@aucklandcouncil.govt.nz","type":"OTHER","metadata":{},"salience":0.004475703928619623,"mentions":[{"text":{"content":"Malkova@aucklandcouncil.govt.nz","beginOffset":-1},"type":"PROPER"}]},{"name":"Elena.","type":"OTHER","metadata":{"mid":"/m/03nvlfp"},"salience":0.004475703928619623,"mentions":[{"text":{"content":"Elena.","beginOffset":-1},"type":"PROPER"}]},{"name":"business","type":"OTHER","metadata":{},"salience":0.004197363276034594,"mentions":[{"text":{"content":"business","beginOffset":-1},"type":"COMMON"}]},{"name":"submission","type":"OTHER","metadata":{},"salience":0.003919489216059446,"mentions":[{"text":{"content":"submission","beginOffset":-1},"type":"COMMON"}]},{"name":"person","type":"PERSON","metadata":{},"salience":0.0038776469882577658,"mentions":[{"text":{"content":"person","beginOffset":-1},"type":"COMMON"}]},{"name":"Birkenhead Tennis Club Incorporated","type":"ORGANIZATION","metadata":{},"salience":0.003642848925665021,"mentions":[{"text":{"content":"Birkenhead Tennis Club Incorporated","beginOffset":-1},"type":"PROPER"}]},{"name":"state","type":"LOCATION","metadata":{},"salience":0.003609968116506934,"mentions":[{"text":{"content":"state","beginOffset":-1},"type":"COMMON"}]},{"name":"Community Lease Advisor","type":"PERSON","metadata":{},"salience":0.002890590578317642,"mentions":[{"text":{"content":"Community Lease Advisor","beginOffset":-1},"type":"COMMON"}]},{"name":"submitter","type":"OTHER","metadata":{},"salience":0.002847887808457017,"mentions":[{"text":{"content":"submitter","beginOffset":-1},"type":"COMMON"}]},{"name":"submission","type":"EVENT","metadata":{},"salience":0.002847887808457017,"mentions":[{"text":{"content":"submission","beginOffset":-1},"type":"COMMON"}]},{"name":"council","type":"ORGANIZATION","metadata":{},"salience":0.002732202410697937,"mentions":[{"text":{"content":"council","beginOffset":-1},"type":"COMMON"}]},{"name":"Auckland 1142","type":"ORGANIZATION","metadata":{},"salience":0.0026527727022767067,"mentions":[{"text":{"content":"Auckland 1142","beginOffset":-1},"type":"PROPER"}]},{"name":"@aucklandcouncil.govt.nz","type":"ORGANIZATION","metadata":{},"salience":0.0026527727022767067,"mentions":[{"text":{"content":"@aucklandcouncil.govt.nz","beginOffset":-1},"type":"PROPER"}]},{"name":"Elena.Malkova","type":"PERSON","metadata":{},"salience":0.002281568944454193,"mentions":[{"text":{"content":"Elena.Malkova","beginOffset":-1},"type":"PROPER"}]},{"name":"part","type":"OTHER","metadata":{},"salience":0.002280229702591896,"mentions":[{"text":{"content":"part","beginOffset":-1},"type":"COMMON"}]},{"name":"objection","type":"OTHER","metadata":{},"salience":0.002280229702591896,"mentions":[{"text":{"content":"objection","beginOffset":-1},"type":"COMMON"}]},{"name":"whole","type":"OTHER","metadata":{},"salience":0.0021295424085110426,"mentions":[{"text":{"content":"whole","beginOffset":-1},"type":"COMMON"}]},{"name":"Bag 92 300","type":"CONSUMER_GOOD","metadata":{},"salience":0.0017005064291879535,"mentions":[{"text":{"content":"Bag 92 300","beginOffset":-1},"type":"PROPER"}]},{"name":"Victoria Street West","type":"LOCATION","metadata":{},"salience":0.0017005064291879535,"mentions":[{"text":{"content":"Victoria Street West","beginOffset":-1},"type":"PROPER"}]},{"name":"Local Government Official Information and Meetings Act 1977","type":"WORK_OF_ART","metadata":{},"salience":0.0014428043505176902,"mentions":[{"text":{"content":"Local Government Official Information and Meetings Act 1977","beginOffset":-1},"type":"PROPER"}]}],"language":"en"}]'

const language = Language()
const baseUrl = 'http://www.aucklandcouncil.govt.nz'

function main() {
    const results = {}
    getNotices()
        .then(notices => {
            // Debug the notices.
            // console.log(JSON.stringify(notices, null, 2))
            // process.exit()

            // Debug the first "Other" notice.
            return getNotice(notices.Other[0]).then(notice => {
                results.firstNoticeFromCategoryOther = notice
                return [notice]
            })

            return Promise.all(notices.Other.map(getNotice))
        })
        .then((notices) => getLocationNames(notices[0]))
        .then(names => {
            const promises = names.map(name => new Promise(resolve => {
                // TODO Provide some context
                geocoder.geocode(name, (err, data) => {
                    resolve(filterGeocodeResults(data.results))
                })
            }))
            return Promise.all(promises)
        })
        .then(locations => {
            results.places = locations
            console.log(JSON.stringify(results, null, 2))
            process.exit()
        })
}

function filterGeocodeResults(results) {
    return results.map(result => {
        const {lat, lng} = result.geometry.location
        return {
            name: result.formatted_address,
            ll: lat + ',' + lng,
        }
    })
}

function filterLanguageEntities(entities) {
    return entities
        .filter(entity => entity.type === 'LOCATION')
        .filter(entity => entity.mentions.some(mention => mention.type === 'PROPER'))
        .map(entity => entity.name)
}

function getLocationNames({content}) {
    const document = language.document({ content: content.text });
    return document.detectEntities()
        .then((results) => filterLanguageEntities(results[0]))
        .catch((err) => console.error('ERROR:', err))
}

function getNotice({url, text}) {
    return new Promise(resolve => {
        request(url, (error, response, html) => {
            if (error) throw error
            const $ = cheerio.load(html)
            const element = $('#content_middle')
            const content = element.find('.pagecontent > div')
            const notice = {
                title: element.find('h2').text().trim(),
                date: element.find('.date').text().trim(),
                content: {
                    text: content.text(),
                    html: content.html(),
                },
                unknown: {
                    full: element.find('.full').text().trim(),
                    byline: element.find('.byline').text().trim(),
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
