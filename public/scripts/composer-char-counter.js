
$(document).ready(function() {
  $('textarea').on('change', function() { //$('textarea').on('change'
    const charRem = 140 - $(this).val().length;
    $(this).parent().find(".counter").val(charRem); // .val(charRem)
    
    if (charRem < 0) {
      $(this).parent().find(".counter").addClass('error');
    } else {
      $(this).parent().find(".counter").removeClass('error');
    }
    // .css() to do something to result?
    // $( this ).parent().children(“div”).children(“.counter”).val(charLeft)?
  })

  // $('article').mouseover(function() {
  //   $(this).addClass('hover');
  //   $(this).find('div').addClass('text_hover');
  // })
  // $('article').mouseout(function() {
  //   $(this).removeClass('hover');
  //   $(this).find('div').removeClass('text_hover');
  // })


});
