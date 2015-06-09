'use strict';
define(['tourLib'], function(tourLib){
	// Instance the tour
  var tour = new Tour({
    //storage: false,  //usw this for debugging
    steps: [
      {
      element: '#about',
      title: 'Welcome!',
      content: 'You can click here for an intro and information about how and why we made this.'
      },
      {

      element: '#data-info',
      title: 'Data Info',
      content: 'Check out how we crunched our data!'
      },
      {
      element: '#tab-menus',
      title: 'Data Selectors',
      content: 'Click these drop-down menus to select the data you want to see.  There are three categroies: Demographic, Financial and Housing data.',
      placement: 'left'
      },
      {
      element: '#iWindow',
      title: 'Info Window',
      content: 'When you move your mouse pointer over a census tract, the ID number and the values for each period will display here.',
      placement: 'left'

      }
    ]
   });



    // Initialize the tour
    return {
        init: function() {
            if(document.body.clientWidth > 768) {
              tour.init();

              // Start the tour
              tour.start();
            }
        }
    };
});

