$(document).ready(function () {


/* CROSS SITE SCRIPTING ESCAPER
    | ==================================================================================== */
  function escape(str) {

    const div = document.createElement('div');

    div.appendChild(document.createTextNode(str));
    return div.innerHTML;

  };

/* POST CREATED TIME CONVERTER
    | ==================================================================================== */
  function timeConversion(millisec) {
    
    let seconds = Math.round(millisec / 1000);

    let minutes = Math.round(millisec / (1000 * 60));

    let hours = Math.round(millisec / (1000 * 60 * 60));

    let days = Math.round(millisec / (1000 * 60 * 60 * 24));

    let years = Math.round(millisec / (1000 * 60 * 60 * 24 * 365))


    if (seconds < 60) {
      return `${seconds} Secs Ago`;
    }

    if (minutes < 60) {
      return `${minutes} Mins Ago`;
    }

    if (hours < 24) {
      return `${hours} Hours Ago`;
    }

    if (days < 365) {
      return `${days} Days Ago`;
    }

    return `${years} Year Ago`;

  };


/* CREATE TWEET 
    | ==================================================================================== */  
  const createTweetElement = (tweetData) => {
    let timePosted = timeConversion(Date.now() - tweetData.created_at);
    const html =
      `<article class="tweet-post">

        <header class="tweet-header">
          <img class="avatar" src="${tweetData.user.avatars.small}" alt="">
            <div class="name-info">
              <h3>${tweetData.user.name}</h3>
              <p>${tweetData.user.handle}</p>
            </div>
        </header>

        <p class="tweet-text">${escape(tweetData.content.text)}</p>

        <footer class="tweet-date">
          <p class="footer-p">${timePosted}</p>
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


/* RENDER TWEET
    | ==================================================================================== */
  function renderTweets(tweets) {
    let tweetData;

    for (let tweet of tweets) {
      tweetData = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetData);
    }

  };



/* POST NEW TWEET
    | ==================================================================================== */

  const onSubmit = $('#post-tweet').on('submit', event => {
    event.preventDefault();
    const errorMessage = $('.error-msg');
    const isTextLength = $('.tweet-field')[0].value.length;
    const container = $('#tweets-container');
    const tweetCounter = $('.counter');


    if (isTextLength === 0) {
      errorMessage.html(`<i class="fas fa-exclamation-circle"></i> Please Enter a message`);
      errorMessage.show();
      return;
    }

    if (isTextLength > 140) {
      errorMessage.html(`<i class="fas fa-exclamation-circle"></i> Maximum characters exceeded`);
      errorMessage.show();
      return;
    }
  
    const query = $('#post-tweet').serialize();
    const posting = $.post('/tweets', query);

    posting.done(function () {
      $('.tweet-field')[0].value = '';
      tweetCounter.text('140');
      container.empty();
      loadTweets();
    })

  });


  /* LOAD TWEETS 
    | ==================================================================================== */

  const loadTweets = () => {
    const url = "http://localhost:8080/tweets/";

    $.getJSON(url, (data) => {
      renderTweets(data);
    });

  };

  // LOAD INITIAL TWEETS
  loadTweets();


/* NEW TWEET SLIDER HIDE/SHOW
    | ==================================================================================== */

  const slideBtn = $('.compose-btn').on('click', () => {
    const $isTweet = $('.new-tweet');
    const $tweetField = $('.tweet-field');


    if ($($isTweet).is(":hidden")) {
      $isTweet.slideDown(500);
      $tweetField.focus();
    } else {
      $isTweet.slideUp(500);
    }

  });

});
