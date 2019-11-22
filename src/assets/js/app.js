// $(document).foundation();

(function($, window, document, undefined) {
  var $window = $(window), $document = $(document), $windowWidth = document.documentElement.clientWidth, $windowHeight = document.documentElement.clientHeight;

  // http://codepen.io/anon/pen/GpeCi [Items with position fixed/absolute + area for fixed header]
  function StickyTitles(stickies) {
      this.load = function() {
          stickies.each(function() {
              var thisSticky = jQuery(this);
              thisSticky.parent().height(thisSticky.outerHeight());

              jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);
          });
      };

      this.scroll = function() {
          stickies.each(function(i) {
              var thisSticky = jQuery(this), nextSticky = stickies.eq(i + 1), prevSticky = stickies.eq(i - 1), pos = jQuery.data(thisSticky[0], 'pos'), $windowWidth = document.documentElement.clientWidth;
              // console.log('StickyTitles $windowWidth: ' + $windowWidth);

              if($windowWidth >= 1200) {
                  if(pos <= (jQuery(window).scrollTop() + 100)) {
                      thisSticky.addClass('fixed');

                      if(nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight() - 100) {
                          thisSticky.addClass('absolute').css('top', jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight() - 100 + 1);
                      }
                  } else {
                      thisSticky.removeClass('fixed');

                      if(prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos') - prevSticky.outerHeight() - 100) {
                          prevSticky.removeClass('absolute').removeAttr('style')
                      }
                  }
              } else {
                  if(pos <= (jQuery(window).scrollTop() + 75)) {
                      thisSticky.addClass('fixed');

                      if(nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight() - 75) {
                          thisSticky.addClass('absolute').css('top', jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight() - 75 + 1);
                      }
                  } else {
                      thisSticky.removeClass('fixed');

                      if(prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos') - prevSticky.outerHeight() - 75) {
                          prevSticky.removeClass('absolute').removeAttr('style')
                      }
                  }
              }
          });
      }
  }

  function NewStickies() {
      var newStickies = new StickyTitles(jQuery('[data-stick-scroll]'));

      newStickies.load();

      jQuery(window).on('scroll', function() {
          newStickies.scroll();
          // console.log('reach NewStickies');
      });
  }

  function SidebarSticky() {
      var newSidebar = $(".sidebar-wrapper");

      if(newSidebar.length) {
          // console.log('window >= 1024');

          var $windowWidth = document.documentElement.clientWidth;
          // console.log($windowWidth);

          if($windowWidth >= 1024 && $windowWidth < 1200) {
              // console.log('stick more than 1024');
              newSidebar.stick_in_parent({
                  offset_top : 75
              });
          } else if($windowWidth >= 1200) {
              // console.log('stick more than 1200');
              newSidebar.stick_in_parent({
                  offset_top : 100
              });
          }
      } else {
          // console.log('stick less than 1024');
          newSidebar.trigger("sticky_kit:detach");
      }
  }

  function HeroImageResize(resize) {
      this.load = function() {
          resize.each(function() {
              // when load window private vars
              var thisResize = jQuery(this),
                thisResizeParentHeight = thisResize.parent().outerHeight(),
                $windowWidth = document.documentElement.clientWidth;

              if(thisResize.length) {
                  // console.log('thisResize: ' + thisResize + 'window width: ' + $windowWidth + ' hero-image parent height: ' + thisResizeParentHeight);

                  if($windowWidth < thisResizeParentHeight) {
                      // screen portrait : width < height
                      // console.log('container portrait');
                      thisResize.closest('.hero').addClass('portrait').removeClass('landscape').removeAttr('style');
                      thisResize.css('width', 'auto').css('height', '100%');
                      thisResize.siblings().removeAttr('style');

                  } else if($windowWidth > thisResizeParentHeight) {
                      // screen landscape : width > height
                      // console.log('container landscape');
                      thisResize.closest('.hero').addClass('landscape').removeClass('portrait').removeAttr('style');
                      thisResize.css('width', '100%').css('height', 'auto');
                      thisResize.siblings().removeAttr('style');

                  } else {
                      // screen squared : width = height
                      // console.log('container squared');
                      if(thisResize.hasClass('portrait')) {
                          thisResize.closest('.hero').removeClass('portrait').removeAttr('style');
                          thisResize.siblings().removeAttr('style');

                      } else if(thisResize.hasClass('landscape')) {
                          thisResize.closest('.hero').removeClass('landscape').removeAttr('style');
                          thisResize.siblings().removeAttr('style');
                      }
                  }
              }
          });
      };

      this.scroll = function() {
          resize.each(function() {
              // when scroll window private vars
              var thisResize = jQuery(this),
                $windowWidth = document.documentElement.clientWidth,
                scrollY = jQuery(window).scrollTop(),
                frameSize = scrollY / 8;

              thisResize.siblings().css('width', frameSize);

              if(thisResize.closest('.hero').hasClass('portrait')) {
                  thisResize.css('width', 'auto').css('height', '100%');

              } else if(thisResize.closest('.hero').hasClass('landscape')) {
                  thisResize.css('width', $windowWidth - frameSize/2).css('height', 'auto');

              } else {
                  thisResize.css('width', $windowWidth - frameSize/2).css('height', 'auto');
              }
          });
      };
  }

  function NewHero() {
      var newHero = new HeroImageResize(jQuery('.hero-image'));
      // console.log('newHero ' + newHero);

      newHero.load();

      jQuery(window).on('resize', function() {
          newHero.load();
      });

      jQuery(window).on('scroll', function() {
          newHero.scroll();
      });
  }

  // function ImageRatio(ratio) {
  //     this.load = function() {
  //         ratio.each(function() {
  //             var thisRatio = jQuery(this),
  //               thisRatioWidth = thisRatio.width(),
  //               thisRatioHeight = thisRatio.height();
  //
  //             // console.log('thisRatioWidth: ' + thisRatioWidth + ' thisRatioHeight: ' + thisRatioHeight);
  //
  //             if(thisRatioWidth > thisRatioHeight) {
  //
  //             }
  //         });
  //     };
  // }

  function LazyImage() {
      if($('.lazy').length) {
          $("img.lazy").lazyload({
              // event : "click",
              threshold : 200,
              effect : "fadeIn"
          });
      }
  }

  $document.ready(function() {
      NewStickies();
      SidebarSticky();
      NewHero();
      LazyImage();

      $('[data-open]').on('click', function(event) {
          event.preventDefault();

          $(this).parent().toggleClass('open');
      });

      $('[data-trigger-nav]').on('click', function(event) {
          event.preventDefault();

          $(this).closest('body').toggleClass('nav-open');
          // console.log('reach trigger');
      });

      // Update date on copyright
      new Date().getFullYear();

      $('#updatedYear').append(' ' + new Date().getFullYear() + ' ');
      // console.log(new Date().getFullYear());
  });

  $window.on('load', function() {

  }).on('load, scroll', function() {

  }).on('resize', function() {
      // console.log('resize function = detach');
      $(".sidebar-wrapper").trigger("sticky_kit:detach");

      SidebarSticky();
  });
})(jQuery, window, document);