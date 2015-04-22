define(["underscore"], function(_) {
    return {
        make: function() {
            var pub = {
                subscribers: {},
                selected: null
            }

            return {
                // Arrange that selected will be called when the current
                // value is set to v and that deselected will be called
                // when the selected value changes from v to something
                // else.
                add: function(v, selected, deselected) {
                    var s = pub.subscribers[v];
                    if (!s) {
                        s = pub.subscribers[v] = [];
                    }
                    s.push([selected, deselected]);

                    // Could return a function that will removed the
                    // callbacks.
                },

                // Sets the currently selected value to v and informs
                // all subscribers.
                select: function(v) {
                    var listeners = pub.subscribers[v];
                    var deselectListeners = pub.subscribers[pub.selected];
                    var old = pub.selected;

                    if (deselectListeners) {
                        _.each(_.pluck(deselectListeners, 1), function(f) {
                            if (f) f();
                        });
                    }

                    if (listeners) {
                        _.each(_.pluck(listeners, 0), function(f) {
                            if (f) f();
                        });
                    }

                    pub.selected = v;
                    return old;
                }
            }
        }
    }
})
