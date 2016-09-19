;
// Diwanee Social Honey -- App that fatch related articles 
// Handlebars templates are precompiled from src/{publication} folder

(function () {

  var userToken;
  var shId;
  var apiBaseUrl;
  var apiEndpointRecommended;

  window.diwaneeSocialHoneyInit = function () {
    sh('getToken', function (token) {
      userToken = token;
      shId = window.socialHoney.shId || "";
      apiBaseUrl = window.socialHoney.apiBaseUrl || "http://api.socialhoney.co:3000";
      apiEndpointRecommended = window.socialHoney.apiEndpointRecommended || "/top/urls/recommended/";
      diwaneeSocialHoney();
    });
  };

  var diwaneeSocialHoney = function () {
    var thumborThumb = function (src) {
      var thumborConfig = $.extend(true, {}, window.appThumborConfig, {thumbor: {
          hasResize: true,
          hasTrim: false,
          isSmart: false,
          resizeWidth: "130",
          resizeHeight: "100"
        }});
      var data = {
        hash: src.split('/').pop().split(".")[0]
      };
      var thumbor = new thumborUrlBuilder(thumborConfig);
      thumbor.setAmazonUrlPath(thumborConfig.amazonS3Path, data);
      var url = thumbor.finalUrl();
      return url;
    };

    window.Handlebars.registerHelper('thumborThumb', function (src) {
      return thumborThumb(src);
    });

    var compile = function (data) {
      var temp = data.urls[0].thumbnailImageURLs[0];
      var render = Handlebars.templates['diwanee-social-honey'](data, true);
      $('.l-sidebar').prepend(render);
    };

    $.ajax({
      url: apiBaseUrl + apiEndpointRecommended + shId,
      method: "GET",
      dataType: "json",
      data: {
        //url: encodeURIComponent(window.location.href),
        url: encodeURIComponent("http://www.mazyun.com" + window.location.pathname), // for local development      
        token: encodeURIComponent(userToken)
      },
      success: function (data) {
        if (data.urls && data.urls.length > 0) {
          compile(data);
        }
      },
      error: function () {
        //console.log('error');
      }
    });

  };

  // executor
  $(window).load(function () {
    diwaneeSocialHoneyInit();
  });
  
})();
