/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) 
 * jQuery's document ready function
 */

 //Hard-coded database for development purposes
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
    allTweets = createTweetElement(tweet);
    $('.tweet-lib').append(allTweets); 
    
  }
  $('.t_display').mouseover(function() {
    $(this).addClass('hover');
    $(this).find('div').addClass('text_hover');
  })
  $('.t_display').mouseout(function() {
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
  const dateElap = Date.now();
  const dateTweeted = tweet.created_at;
  const date = Math.round((dateElap - dateTweeted) / (1000 * 60 * 60 * 24));
  
  const caw = `
    <article class="t_display">
      <header>
        <div class="left-head"><img src="${tweet.user.avatars}"></div>
        <div class="left-head">${tweet.user.name}</div>
        <div>${tweet.user.handle}</div>
      </header>
      <p>
        ${tweet.content.text}
      </p>
      <footer>
        ${date} days
      </footer>
    </article>
    <br>

  `;
  return caw;
  
}


$(document).ready( () => {
  const errorPrompt = document.getElementById('vHeader');
  errorPrompt.style.display = "none";
  
  const loadTweets = () => {
    $.ajax({url: "/tweets", method: 'GET'}).then(response => {
      renderTweets(response);
    })
  }
  loadTweets();

  $('form').submit((evt) => {
    evt.preventDefault();
    // alert($('#tweet-text').val);
    $('#vHeader').hide();

    if (!$('#tweet-text').val()) {
      $('#vHeader').show(() => {
        $('#vHeader').slideDown("slow");
      }); 
      return;
    
    } else if ($('#tweet-text').val().length > 140) {
      $('#vHeader').show(() => {
        $('#vHeader').slideDown("slow");
      });
      return;
    
    } else {
      const formData = $('form').serialize()//converts so the server can understand
      $.ajax({url: "/tweets", method: 'POST', data: formData}).then(response => {
        
        $.ajax({url: "/tweets", method: 'GET'}).then(response => {
          $('.tweet-lib').empty();
          renderTweets(response);
        })
        
      })
    }
    
  })
})





