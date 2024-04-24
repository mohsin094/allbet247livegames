/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 0.6
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
/*;(function($) {
"use strict";
  $.fn.onePageNav = function(options) {
    var opts = $.extend({}, $.fn.onePageNav.defaults, options),
        onePageNav = {};
    
    onePageNav.sections = {};
    
    onePageNav.bindNav = function($el, $this, o) {
      var $par = $el.parent(),
          newLoc = $el.attr('href'),
          $win = $(window);

      if(!$par.hasClass(o.currentClass)) {
        if(o.begin) {
          o.begin();
        }
        onePageNav.adjustNav($this, $par, o.currentClass);
        $win.unbind('.onePageNav');


        $.scrollTo(newLoc, o.scrollSpeed, {
          offset: {
                        top: - 70
                    },
                    easing : 'easeInCubic',
          onAfter: function() {
            if(o.changeHash) {
              window.location.hash = newLoc;

            }
            $win.bind('scroll.onePageNav', function() {
              onePageNav.scrollChange($this, o.currentClass);
            });
            if(o.end) {
              o.end();
            }
          }
        });
      }
    };
    
    onePageNav.adjustNav = function($this, $el, curClass) {
      $this.find('.'+curClass).removeClass(curClass);
      $el.addClass(curClass);
    };
    
    onePageNav.getPositions = function($this) {
      $this.find('a.link_onepage').each(function() {
        var linkHref = $(this).attr('href'),
            divPos = $(linkHref).offset(),
            topPos = divPos.top;
        onePageNav.sections[linkHref.substr(1)] = Math.round(topPos);
      });
    };
    
    onePageNav.getSection = function(windowPos) {
      var returnValue = '',
          windowHeight = Math.round($(window).height() / 2);
      
      for(var section in onePageNav.sections) {
        if((onePageNav.sections[section] - windowHeight) < windowPos) {
          returnValue = section;
        }
      }
      return returnValue;
    };
    var execute = false;
    onePageNav.scrollChange = function($this, curClass) {
      onePageNav.getPositions($this);
      
      var windowTop = $(window).scrollTop(),
          position = onePageNav.getSection(windowTop);
        if ((windowTop > 2700) & (execute == false)) {
            counterNumber();
            execute = true;
        }
        if (position == "texas") {
            $('#news1').addClass('cbp-so-side');
            $('#tableservice').addClass('cbp-so-side');
            $('.grid_item').addClass('animated');
            $('#blockTitle1').addClass('uk-animation-scale-down');
        } else if (position == "game") {
            $('.luxe-animate').addClass('animated');
            $('#blockTitle2').addClass('uk-animation-scale-down');
        } else if (position == 'section-3') {
            $('#blockTitle4').addClass('uk-animation-scale-down');
        } else if (position == "section-4") {
            $('#sponsorpoker').find('.one_sixth_sponsor').addClass('one_sixth_sponsor_after');
            $('#blockTitle5').addClass('uk-animation-scale-down');
        } else if (position == "tournaments") {
            $('#blockTitle4').addClass('uk-animation-scale-down');
        } else if (position == "section-6") {

            $('#blockTitle7').addClass('uk-animation-scale-down');
        }


        if(position !== '') {
        onePageNav.adjustNav($this,$this.find('a[href=#'+position+']').parent(), curClass);
      }
    };
    
    onePageNav.init = function($this, o) {
      $this.find('a.link_onepage').bind('click', function(e) {
        onePageNav.bindNav($(this), $this, o);
        e.preventDefault();
        
      });
    
      onePageNav.getPositions($this);


      var didScroll = false;
    
      $(window).bind('scroll.onePageNav', function() {
        didScroll = true;
      });

      setInterval(function() {
        if(didScroll) {
          didScroll = false;
          onePageNav.scrollChange($this, o.currentClass);
        }
      }, 250);
    };
    
    return this.each(function() {
      var $this = $(this),
          o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      
      onePageNav.init($this, o);
    
    });
  };

  // default options
  $.fn.onePageNav.defaults = {
    currentClass: 'current',
    changeHash: false,
    scrollSpeed: 750,
    begin: false,
    end: false
  };

})(jQuery);*/

/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

; (function ($, window, document, undefined) {
    var execute = false;
    // our plugin constructor
    var OnePageNav = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('plugin-options');
        this.$win = $(window);
        this.sections = {};
        this.didScroll = false;
        this.$doc = $(document);
        this.docHeight = this.$doc.height();
    };

    // the plugin prototype
    OnePageNav.prototype = {
        defaults: {
            navItems: 'a',
            currentClass: 'current',
            changeHash: false,
            easing: 'swing',
            filter: '',
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            begin: false,
            end: false,
            scrollChange: false
        },

        init: function () {
            // Introduce defaults that can be extended either
            // globally or using an object literal.
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

            this.$nav = this.$elem.find(this.config.navItems);

            //Filter any links out of the nav
            if (this.config.filter !== '') {
                this.$nav = this.$nav.filter(this.config.filter);
            }

            //Handle clicks on the nav
            this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

            //Get the section positions
            this.getPositions();

            //Handle scroll changes
            this.bindInterval();

            //Update the positions on resize too
            this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

            return this;
        },

        adjustNav: function (self, $parent) {
            self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
            $parent.addClass(self.config.currentClass);
        },

        bindInterval: function () {
            var self = this;
            var docHeight;

            self.$win.on('scroll.onePageNav', function () {
                self.didScroll = true;
            });

            self.t = setInterval(function () {
                docHeight = self.$doc.height();

                //If it was scrolled
                if (self.didScroll) {
                    self.didScroll = false;
                    self.scrollChange();
                }

                //If the document height changes
                if (docHeight !== self.docHeight) {
                    self.docHeight = docHeight;
                    self.getPositions();
                }
            }, 250);
        },

        getHash: function ($link) {
            return $link.attr('href').split('#')[1];
        },

        getPositions: function () {
            var self = this;
            var linkHref;
            var topPos;
            var $target;

            self.$nav.each(function () {
                linkHref = self.getHash($(this));
                $target = $('#' + linkHref);

                if ($target.length) {
                    topPos = $target.offset().top;
                    self.sections[linkHref] = Math.round(topPos);
                }
            });
        },

        getSection: function (windowPos) {
            var returnValue = null;
            var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

            for (var section in this.sections) {
                if ((this.sections[section] - windowHeight) < windowPos) {
                    returnValue = section;
                }
            }

            return returnValue;
        },

        handleClick: function (e) {
            var self = this;
            var $link = $(e.currentTarget);
            var $parent = $link.parent();
            var newLoc = '#' + self.getHash($link);

            if (!$parent.hasClass(self.config.currentClass)) {
                //Start callback
                if (self.config.begin) {
                    self.config.begin();
                }

                //Change the highlighted nav item
                self.adjustNav(self, $parent);

                //Removing the auto-adjust on scroll
                self.unbindInterval();

                //Scroll to the correct position
                self.scrollTo(newLoc, function () {
                    //Do we need to change the hash?
                    if (self.config.changeHash) {
                        window.location.hash = newLoc;
                    }

                    //Add the auto-adjust on scroll back in
                    self.bindInterval();

                    //End callback
                    if (self.config.end) {
                        self.config.end();
                    }
                });
            }

            e.preventDefault();
        },

        scrollChange: function () {
            var windowTop = this.$win.scrollTop();
            var position = this.getSection(windowTop);
            var $parent;

            if ((position == "texas") & (execute == false)) {
                counterNumber();
                execute = true;
            }
            if (position == "texas") {
                $('#news1').addClass('cbp-so-side');
                $('#tableservice').addClass('cbp-so-side');
                $('.grid_item').addClass('animated');
                $('#blockTitle1').addClass('uk-animation-scale-down');
            } else if (position == "game") {
                $('.luxe-animate').addClass('animated');
                $('#blockTitle2').addClass('uk-animation-scale-down');
            } else if (position == 'section-3') {
                $('#blockTitle4').addClass('uk-animation-scale-down');
            } else if (position == "section-4") {
                $('#sponsorpoker').find('.one_sixth_sponsor').addClass('one_sixth_sponsor_after');
                $('#blockTitle5').addClass('uk-animation-scale-down');
            } else if (position == "tournaments") {
                $('#blockTitle4').addClass('uk-animation-scale-down');
            } else if (position == "section-6") {

                $('#blockTitle7').addClass('uk-animation-scale-down');
            }

            //If the position is set
            if (position !== null) {
                $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

                //If it's not already the current section
                if (!$parent.hasClass(this.config.currentClass)) {
                    //Change the highlighted nav item
                    this.adjustNav(this, $parent);

                    //If there is a scrollChange callback
                    if (this.config.scrollChange) {
                        this.config.scrollChange($parent);
                    }
                }
            }
        },

        scrollTo: function (target, callback) {
            var offset = $(target).offset().top;

            $('html, body').animate({
                scrollTop: offset
            }, this.config.scrollSpeed, this.config.easing, callback);
        },

        unbindInterval: function () {
            clearInterval(this.t);
            this.$win.unbind('scroll.onePageNav');
        }
    };

    OnePageNav.defaults = OnePageNav.prototype.defaults;

    $.fn.onePageNav = function (options) {
        return this.each(function () {
            new OnePageNav(this, options).init();
        });
    };

})(jQuery, window, document);