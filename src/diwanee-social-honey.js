;
// Diwanee Social Honey -- App that fatch related articles 
// Handlebars templates are precompiled from src/{publication} folder

(function () {

  var userToken;
  var shId;
  var apiBaseUrl;
  var apiEndpointRecommended;

  window.diwaneeSocialHoneyStarter = function () {
    var timeout = 30; // * interval
    var stop = false;
    var initInterval = setInterval(function () {
      sh('getToken', function (token) {
        if (stop === true) {
          clearInterval(initInterval);
          return;
        }
        stop = true;
        clearInterval(initInterval);
        diwaneeSocialHoneyInit(token); // go go go
      });
      stop--;
      if (timeout < 1) {
        clearInterval(initInterval);
      }
    }, 333);
  };

  var diwaneeSocialHoneyInit = function (token) {
    userToken = token;
    shId = window.diwaneeSocialHoneyData.shId || "";
    apiBaseUrl = window.diwaneeSocialHoneyData.apiBaseUrl || "http://api.socialhoney.co:3000";
    apiEndpointRecommended = window.diwaneeSocialHoneyData.apiEndpointRecommended || "/top/urls/recommended/";
    diwaneeSocialHoney();
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
      var $render = $(DiwaneeSocialHoney.templates['diwanee-social-honey'](data, true));
      var placements = $render.data('placement');
      //
      // Placements object has to be defined as data-placement attribute on oldest element within publication's handlebars template
      //
      $.each(placements, function (method, selector) {   
        var $selector = $(selector).first();
        if ($selector.length > 0) { // dos selector exist?
          if (method === "after") {
            $selector.after($render);
            return false; // break
          }
          if (method === "append") {
            $selector.append($render);
            return false; // break
          }  
        }
      });
      setTimeout(function(){
        $render.addClass('rendered'); // animation trigger
      },0);
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

})();
