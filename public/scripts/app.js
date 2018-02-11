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
      valueObj[currentListItem] = $($('.list-group-item')[i]).attr('value');
    }  
      //let formData = $("#textarea");
      $.ajax({
        url: '/polls/vote',
        method: 'POST',
        data: valueObj,
        success: function () {
            console.log('SUCCESS!', data);
      //     knex('votes')
      //     .insert({
      //       optionid: creatorid[0],
      //       points: 2
      //     }); 
        }   
      }) 

  })

});

