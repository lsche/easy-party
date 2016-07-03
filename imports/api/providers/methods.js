import { Meteor } from 'meteor/meteor';
import { Providers } from './collection';


export function scrapeYelp(info) {
    
        ref = 'https://www.yelp.com/search?find_loc='+info+'&cflt=food';

        console.log('ref is - ' + ref);

        
        
        ScrapeParser.registerHelper('toInt', function(str, url) {
            return parseInt('0'+str.replace(',', ''));
        });

        ScrapeParser.registerHelper('titleLinks', function(arr, url) {
            return arr && arr.map(function(str) {
                var $ = cheerio.load(str);
                var link = $('a.title');
                return { link: link.attr('href'), title: link.text() };
            });
        });

        ScrapeParser.reset(); // Remove any/all stored parsers

        ScrapeParser.parser(ref, {
            infob: { path: '#find-friends > a', content: true, multi: true },
            // prozent: { path: 'td.c-2', content: true, multi: true },
            // packung: { path: 'body > div.page.product-info > div.float-group > div.page-col-1-2-left > div.block.prod-basic-info > div > div:nth-child(2) > p:nth-child(2)', content: true, multi: true },
            // name: { path: 'div.page-title-headline h1', content: true, multi: true },
            // vorschlag: { path: 'a.alt-link', content: true, multi: true },
            // vorschlagLinks: { path: 'a.alt-link', attribute: 'href', multi: true }
        });
        

        ScrapeParser.resetExcept([ref]); // Remove stored parsers except those in array
        
        values = ScrapeParser.get(ref); 

        console.log(values.infob);

        return values;
}

Meteor.methods({
  scrapeYelp
});