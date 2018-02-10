$(document).ready(() => {
  $('.sortable').sortable().bind('sortupdate', function(e, ui) {
    let optionsLength = $('.list-group-item').length;
    
    for (let i=0; i < $('.list-group-item').length; i++) {
      let newValue = $('.list-group-item').length - i;
      $($('.list-group-item')[i]).attr('value', optionsLength);
      optionsLength--
    }
  });
  
  const $voteButton = $('#vote-button');


});

