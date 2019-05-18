$(document).ready(function () {

  $('.tweet-field').on('input', function () {
    const tweetLength = this.value.length;
    const tweetCounter = $(this).siblings('.counter');
    const errorMessage = $('.error-msg');

    tweetCounter.html(140 - tweetLength);
    tweetCounter.css({color: '#4a5a9b'});
    errorMessage.hide();
    
    if (tweetLength > 140) {
      tweetCounter.css({color: '#d33829'});
    }
   
  });

});