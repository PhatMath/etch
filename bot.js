require('dotenv').config();
const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} = process.env;

var Twit = require('twit');
const fs = require('fs');
const Twetch = require('@twetch/sdk');
const twetch = new Twetch({clientIdentifier: 'b20c48d2-6f42-41d4-906b-ca4909e99181'});
const puppeteer = require('puppeteer');

let screen_name = "pix_9999";



var T = new Twit({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    app_only_auth:        true,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

console.log('Starting bot...');

T.get('statuses/user_timeline', { screen_name, count: 1 }, results);

function results(err, data, response) {
  if (err) {
    console.log('Something went wrong :(')
  } else {
    var text = data[0].text;
    var link = data[0].id_str;
    var user = data[0].user.screen_name;
    var media = data[0].entities.media;
    var tweetLink = 'https://twitter.com/'+user+'/status/'+link;
    var post = text+" "+tweetLink;
//    console.log(data);
    console.log('Fetched!');
    console.log(text); };

    let scrape = async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 620, height: 1000 });
    
      var jquery_code_str = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf8');
    
      await page.goto(tweetLink, {waitUntil: 'networkidle0'});
    
      var jquery_ev_fn = await page.evaluate(function(code_str){
          return code_str;
      }, jquery_code_str);
      await page.evaluate(jquery_ev_fn);

      const h = await page.evaluate(() => {
        const $ = window.$;
        return $('.css-1dbjc4n.r-my5ep6.r-qklmqi.r-1adg3ll').height();
      });
      const position = await page.evaluate(() => {
        const $ = window.$;
        return $('.css-1dbjc4n.r-my5ep6.r-qklmqi.r-1adg3ll').offset();
      });      
    
      var clip = new Object();
      clip.x = 0;
      clip.y = position.top;
      clip.width = 598;
      clip.height = h;

      await page.screenshot({clip, quality: 70, path: 'tweet.jpg'});
      await browser.close();      
      
      etchPost();
    };

    scrape();
      
    function etchPost(){
      console.log('posting...');
    // if (text.length <= 140) { 
    //     if (Boolean.media = true) {
    //     twetch.publish('twetch/post@0.0.1', {
    //       mapComment: text}, './tweet.jpg');
    //     } else
    //     twetch.publish('twetch/post@0.0.1', {
    //       mapComment: post}, './tweet.jpg');
    // } else
    //     twetch.publish('twetch/post@0.0.1', {
    //       mapComment: text}, './tweet.jpg');
    // }
  } 
};