define(["subselect"], function(subselect) {
      // A singleton for census tract selection.
    // Use feature ids as the selection value.
    var hoverTract = subselect.make();

    //////////////////////////////////////////////////////////////////////
    // Example:                                                         //
    // hoverTract.watch(function(toVal, fromVal) {                      //
    //     console.log("Selection changed from", fromVal, "to", toVal); //
    // });                                                              //
    // hoverTract.watchForValue(123, selectedCallback, deselectedCallback) //
    //////////////////////////////////////////////////////////////////////

    return subselect.make();
});
