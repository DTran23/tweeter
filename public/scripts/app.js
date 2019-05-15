/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(() => {

//   const tweetData = {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
// }


// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },

//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },


//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },


//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }

// ];
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//CREATE TWEET
const createTweetElement = (tweetData) => {

  const html = `<article class="tweet-post">

            <header class="tweet-header">
              <img class="avatar" src="${tweetData.user.avatars.small}" alt="">
                <div class="name-info">
                  <h2>${tweetData.user.name}</h2>
                  <p>${tweetData.user.handle}</p>
                </div>
            </header>

            <p class="tweet-text">${escape(tweetData.content.text)}}</p>

            <footer class="tweet-date">
              <p class="footer-p">${tweetData.created_at}</p>
                <div class="footer-icons">
                  <ul>
                    <li><i class="fas fa-flag"></i></li>
                    <li><i class="fas fa-retweet"></i></li>
                    <li><i class="fas fa-heart"></i></li>
                  </ul>
                </div>
            </footer>

          </article>`
    
    return html;

};



//RENDER Tweets to HTML
function renderTweets(tweets) {
  let tweetData;
  
  for(let tweet of tweets){
    let tweetData = createTweetElement(tweet);
    $('#tweets-container').prepend(tweetData);
  }
  return tweetData;
}



//POST Tweet
const onSubmit =  $("#post-tweet").on("submit", event => {
    event.preventDefault();
    let query = $("#post-tweet").serialize();
    const url = "http://localhost:8080/tweets/";
    const isTextLength = ($('.tweet-field')[0].value.length)
    let errorMessage = $('.error-msg');

    if(isTextLength > 0){
      
      if(isTextLength <= 140){
        errorMessage.hide();
        $.post(url, query);
        $('.tweet-field')[0].value = '';
      } else {
        errorMessage.html("Maximum characters exceeded");
        errorMessage.show();
      }
      
    } else {
      errorMessage.html("Please Enter a message");
      errorMessage.show();
    }

    loadTweets()
    
 });


 //GET Tweet

 const loadTweets = query => {
  const url = "http://localhost:8080/tweets/";

  $.getJSON(url, (data, status) => {
    renderTweets(data);
  })
 }
 
 loadTweets();


 //SLIDE ANIMATIONS
const slideBtn = $('.compose-btn').on('click', event => {
  const $isTweet = $('.new-tweet');
  const $tweetField = $('.tweet-field');
  

  if($($isTweet).is(":hidden")) {
    $isTweet.slideDown(1000);
    $tweetField.focus(); 
  } else {
    $isTweet.slideUp(1000);
  }
})

});
