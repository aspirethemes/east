$(document).ready(function() {

  'use strict';

  // =====================
  // Koenig Gallery
  // =====================
  var gallery_images = document.querySelectorAll('.kg-gallery-image img');

  gallery_images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  // =================
  // Responsive videos
  // =================

  $('.wrapper').fitVids({
    'customSelector': [ 'iframe[src*="ted.com"]'          ,
                        'iframe[src*="player.twitch.tv"]' ,
                        'iframe[src*="dailymotion.com"]'  ,
                        'iframe[src*="facebook.com"]'
                      ]
  });

  // ===============
  // Off Canvas menu
  // ===============

  $('.off-canvas-toggle').click(function(e) {
    e.preventDefault();
    $('.off-canvas-container').toggleClass('is-active');
  });

  // ======
  // Search
  // ======

  var search_field = $('.search-form__field'),
      search_results = $('.search-results'),
      toggle_search = $('.toggle-search-button'),
      search_result_template = "\
        <div class='search-results__item'>\
          <a class='search-results__item__title' href='{{link}}'>{{title}}</a>\
          <span class='search-results__item__date'>{{pubDate}}</span>\
        </div>";

  toggle_search.click(function(e) {
    e.preventDefault();
    $('.search-form-container').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.off-canvas-container').removeClass('is-active');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  $('.search-form-container, .close-search-button').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'close-search-button' || event.keyCode == 27) {
      $('.search-form-container').removeClass('is-active');
    }
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp         : true,
    result_template : search_result_template,
    zeroResultsInfo : false,
    displaySearchInfo: false,
    includepages 	: true,
    before: function() {
      search_results.fadeIn();
    }
  });

});