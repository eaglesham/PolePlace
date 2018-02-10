$(document).ready(() => {
  

  $('.sortable').sortable().bind('sortupdate', function(e, ui) {
    
    let optionsLength = $('.list-group-item').length;
    
    for (let i=0; i < $('.list-group-item').length; i++) {
      $($('.list-group-item')[i]).attr('value', optionsLength);
      optionsLength--
    }
  });
  
  const valueObj= {};
  const $voteButton = $('#vote-button');
  
  $voteButton.on('click', function (event) {
    for (let i=0; i < $('.list-group-item').length; i++) {
      let currentListItem = $($('.list-group-item')[i]).html()
      console.log(currentListItem)
      valueObj[currentListItem] = $($('.list-group-item')[i]).attr('value');
    }
    console.log(valueObj);
  })
  

});

