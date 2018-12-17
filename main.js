$(document).ready(function() {
  var date = moment('2017-11-01');
  printList(date);
  call(date);




  $('#prev').click(function() {
    date = date.subtract(1, 'months');
    printList(date);
    call(date);
  });

  $('#next').click(function() {

    if (date.format('YYYY MMM') == '2018 Nov') {
      alert('mese futuro');

    }

    else {
      date = date.add(1, 'months');
      printList(date);
      call(date);
    }


  });





  function printList(date)
  {
    $('h1').text(date.format('MMMM YYYY'));
    $('ul').html('');
    var days = date.daysInMonth();
    console.log(days);

    for (var i = 1; i <= days; i++) {
      var liTemplate = $('.template li').clone();

      var lidate = date.format('MMMM-YYYY');
      console.log(lidate);
      liTemplate.text(i + ' ' + lidate);

      $('.container ul').append(liTemplate);
    }
  }

});

function call(date)
{
  $.ajax({
    url: 'https://holidayapi.com/v1/holidays',
    method: 'GET',
    data: {
      key: '6d29431d-847d-477b-b426-99c0f38d7a43',
      country: 'IT',
      month: date.format('MM'),
      year: date.format('YYYY')
    },
    success: function(data)
    {
      var holidays = data.holidays;
      $('li').each(function() {
        var text = $(this).text();

        var newDate = moment(text, 'D MMMM-YYYY');

        for (var i = 0; i < holidays.length; i++) {

          var holidayDate = holidays[i].date;

          console.log('datali:' + newDate.format('YYYY-MM-DD'));
          console.log('dataholiday:' + holidayDate);

          if (newDate.format('YYYY-MM-DD') == holidayDate) {
            $(this).addClass('active');
            $(this).append('-' + holidays[i].name);
          }

        }
      });
    },
    error: function()
    {
      alert('errore');
    }

  });
}
