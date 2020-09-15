
$(document).ready(function() {
  $('textarea').on('keydown', function() { 
    const charRem = 140 - $(this).val().length;
    $(this).parent().find(".counter").val(charRem); 
    
    if (charRem < 0) {
      $(this).parent().find(".counter").addClass('error');
    } else {
      $(this).parent().find(".counter").removeClass('error');
    }
  })

  
});
