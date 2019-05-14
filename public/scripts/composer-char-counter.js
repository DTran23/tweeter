$(document).ready(function(){

  $('.tweet-field').on('keydown', function(){
    let tweetLength = this.value.length;
    let tweetCounter = $(this).siblings('.counter');


    tweetCounter = tweetCounter.html(140 - tweetLength);

    if(tweetLength > 140){
      tweetCounter.css('color', 'red')
    } else {
      tweetCounter.css('color', 'black')
    }
  })
  
})