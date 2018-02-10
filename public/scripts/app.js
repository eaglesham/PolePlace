$(document).ready(() => {
  $('.sortable').sortable().bind('sortupdate', function(e, ui) {
    console.log($('.sortable'));
    // for (let i=0; i < thispoll.length; i++) {
    //  $('.list-item-group')
    // }
  });

});


// loop through your li's each time and assign new values, as was done on ejs file 

