define(["underscore"], function(_) {
    return {
        make: function() {
            var pub = {
                // Callbacks that will respond to a particular key.
                // Stored as pairs of [selectHandler, deselectHandler]
                subscribers: {},

                // Callbacks that run whenever the selection changes.
                callbacks: [],
                selected: null
            }

            return {
                /**
                 * Arrange that selected will be called when the current
                 * value is set to v and that deselected will be called
                 * when the selected value changes from v to something
                 * else.
                 */
                watchForValue: function(v, selected, deselected) {
                    var s = pub.subscribers[v];
                    if (!s) {
                        s = pub.subscribers[v] = [];
                    }
                    s.push([selected, deselected]);

                    // Could return a function that will removed the
                    // callbacks.
                },

                /**
                 *   Add a new selection change handler.
                 *
                 *   @param {Function} handler A function taking two
                 *   arguments: toValue and fromValue
                 */
                watch: function(handler) {
                    pub.callbacks.push(handler)
                },

                /**
                /* Sets the currently selected value to v and informs
                /* all subscribers. v must be a valid object key.
                 *
                 * @param v The new value to select or null.
                 */
                select: function(v) {
                    var old = pub.selected;

                    if (old) {
                        _.each(_.pluck(pub.subscribers[old], 1), function(f) {
                            if (f) f();
                        });
                    }

                    if (v) {
                        _.each(_.pluck(pub.subscribers[v], 0), function(f) {
                            if (f) f();
                        });
                    }

                    _.each(pub.callbacks, function(f) {
                        if (f) f(v, old);
                    });

                    pub.selected = v;
                    return old;
                }
            }
        }
    }
})
