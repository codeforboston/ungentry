define(["underscore"], function(_) {
    return {
        make: function() {
            var pub = {
       	  // Callbacks that will respond to a particular key.
                // Stored as pairs of [selectHandler, deselectHandler]
                subscribers: {},

                // Callbacks that run whenever the selection changes.
                callbacks: [],

                // Selected values, stored as key/value pairs.
                selected: {}
            };

            return {
                // Arrange that selected will be called when the current
                // value is set to v and that deselected will be called
                // when the selected value changes from v to something
                // else.
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
                    pub.callbacks.push(handler);
                },

                /**
                 *   Publish updates to all subscribers, and (optionally)
                 *   all watchers on a given key.
                 *
                 *   @param {array|string} keys Key/keys for which to
                 *   update subscribers.
                 */
                publish: function(keys) {
                    keys = keys || [];
                    keys = _.isArray(keys) ? keys : [keys];

                    var selected = _.values(pub.selected);

                    var self = this;
                    _.each(keys, function (key) {
                        _.chain(pub.subscribers[key])
                            .pluck(self.contains(key) ? 0 : 1)
                            .each(function (f) {
                                if (f) f.apply(this);
                            });
                    });

                    _.each(pub.callbacks, function(f) {
                        if (f) f.apply(this, [selected]);
                    });
                },

                /**
                 *   Adds v to the currently selected set and informs
                 *   all subscribers.
                 *
                 *  @param {string} v Key/ID of selection.
                 *  @param {Object...} args Arguments associated with the selection.
                 */
                select: function(v) {
                    var args = _.rest(arguments);
                    pub.selected[v] = args;
                    this.publish(v);
                    return _.values(pub.selected);
                },

                /**
                 *   Removes v from the currently selected set and
                 *   informs all subscribers.
                 *
                 *   @param {string} v Key/ID of selection.
                 *   @param {Object...} args Arguments associated with the selection.
                 */
                deselect: function(v) {
                    pub.selected = _.omit(pub.selected, v.toString());
                    this.publish(v);
                    return _.values(pub.selected);
                },

                /**
                 *   Clear all selections and inform subscribers.
                 */
                clear: function() {
                    var keys = _.keys(pub.selected);
                    pub.selected = {};
                    this.publish(keys);
                    return pub.selected;
                },

                /**
                 *   Returns true if the key is selected, else false.
                 *
                 *   @param {string} v Key/ID of selection.
                 */
                contains: function(v) {
                    return  !!pub.selected[v];
                }
            };
        }
    };
});
