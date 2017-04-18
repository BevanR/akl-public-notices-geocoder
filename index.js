const cheerio = require('cheerio')
const request = require('request')

url = 'http://www.imdb.com/title/tt1229340/';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        var title, release, rating;
        var json = { title : "", release : "", rating : ""};

        // We'll use the unique header class as a starting point.

        $('.title_wrapper').filter(function(){

            // Let's store the data we filter into a variable so we can easily see what's going on.

            var data = $(this);

            // In examining the DOM we notice that the title rests within the first child element of the header tag.
            // Utilizing jQuery we can easily navigate and get the text by writing the following code:

            title = data.children().first().text();

            // Once we have our title, we'll store it to the our json object.

            json.title = title;
        })
        console.log(json)
        process.exit()
    }
})
