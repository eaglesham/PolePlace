$(document).ready(() => {
  //add extra input fields for poll creation
  const max_fields      = 10; //maximum input boxes allowed
  const wrapper         = $("#createpoll"); //Fields wrapper
  const add_button      = $("#add-option"); //Add button ID
  
  var x = 4; //initlal text box count
  $(add_button).click(function(e){ //on add input button click
      e.preventDefault();
      console.log('CLIKKEKEKKKEEEDD')
      if(x < max_fields){ //max input box allowed
          x++; //text box increment
          $(wrapper).append('<div class="6u$ 12u$(xsmall)"><input name="opt'+x+'" type="text" placeholder="Another option..."></div>'); //add input box
          $(wrapper).append('  <div class="6u$ 12u$(xsmall)"><input name="pollDescription'+x+'" type="text" placeholder="Add a description (optional)"></div>'); //add description box
      }
  });
  
  
  //function that allows drag and drop feature and assigns values to list after every drag and drop
  $('.sortable').sortable().bind('sortupdate', function(e, ui) {
    
    let optionsLength = $('.list-group-item').length;
    
    for (let i=0; i < $('.list-group-item').length; i++) {
      $($('.list-group-item')[i]).attr('value', optionsLength);
      optionsLength--
    }
  });
  
  //submit button for vote on ranking sends object of option:values to post at /polls/vote
  const valueObj= {};
  const $voteButton = $('#vote-button');
  
  $voteButton.on('click', function (event) {
    for (let i=0; i < $('.list-group-item').length; i++) {
      let currentListItem = $($('.list-group-item')[i]).html()
      valueObj[currentListItem] = $($('.list-group-item')[i]).attr('value');
    }  

    $.ajax({
      url: '/polls/vote',
      method: 'POST',
      data: valueObj,
      success: function () {
          console.log('SUCCESS!', valueObj);
      }   
    }) 

  })

});

