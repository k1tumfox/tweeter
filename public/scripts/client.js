/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) 
 * jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
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
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = (tweets) => { //takes in tweet library array of objs
  for (let tweet of tweets.reverse()) {
    
    let allTweets = '';
    // console.log(tweet);
    allTweets = createTweetElement(tweet);
    $('.tweet-lib').append(allTweets); // returns tweet article containing
    
  }
  $('article').mouseover(function() {
    $(this).addClass('hover');
    $(this).find('div').addClass('text_hover');
  })
  $('article').mouseout(function() {
    $(this).removeClass('hover');
    $(this).find('div').removeClass('text_hover');
  })
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  //should use createTweetElement() by passing tweet obj to it,
  //then use returned jQuery obj by appending it to .tweet-lib section


}

const createTweetElement = (tweet) => {
  
  const caw = `
    <article>
      <header>
        <div class="left-head"><img src="${tweet.user.avatars}"></div>
        <div class="left-head">${tweet.user.name}</div>
        <div>${tweet.user.handle}</div>
      </header>
      <p>
        ${tweet.content.text}
      </p>
      <footer>
        ${tweet.created_at}
      </footer>
    </article>
    <br>

  `;
  return caw;
  // let $tweet = /* Your code for creating the tweet element */
  // // ...          ????????
  // return $tweet;
  
}


$(document).ready( () => {
  const loadTweets = () => {
    $.ajax({url: "/tweets", method: 'GET'}).then(response => {
      renderTweets(response);
      
      //JSON.parse();
    })
  }
  loadTweets();

  // renderTweets(data); //for hardcoded tweet db
  // $('form').on('submit', (evt) => {
  $('form').submit((evt) => {
    evt.preventDefault();
    // alert($('#tweet-text').val);
    // console.log($('#tweet-text').val().length);
    
    if (!$('#tweet-text').val()) {
      alert("Please ensure your submission is not empty.");
      return;
    } else if ($('#tweet-text').val().length > 140) {
      alert("Your chirp must not exceed 140 characters.");
      return;
    } else {
      const formData = $('form').serialize()//converts so the server can understand
      $.ajax({url: "/tweets", method: 'POST', data: formData}).then(response => {
        // alert($('#tweet-text').val());
        
        // renderTweets(response);
        $.ajax({url: "/tweets", method: 'GET'}).then(response => {
          $('.tweet-lib').empty();
          renderTweets(response);
          
        })
        
      })
    }
    
  })
})





