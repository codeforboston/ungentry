define(['tourLib'], function(tourLib){
	// Instance the tour
  var tour = new Tour({
    steps: [
      {
      element: "#about",
      title: "Welcome!",
      content: "Content of my step"
      },
      {
      element: "#data-info",
      title: "Title of my step",
      content: "Content of my step"
      },
        {element: "#tab-menus",
      title: "Title of my step",
      content: "Content of my step"
        },{
      element: "#iwindow",
      title: "Title of my step",
      content: "Content of my step"
      }
    ]});

    // Initialize the tour
    return {
        init: function() {
            tour.init();

            // Start the tour
            tour.start();
        }
    };
});
