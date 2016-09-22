this["DiwaneeSocialHoney"] = this["DiwaneeSocialHoney"] || {};
this["DiwaneeSocialHoney"]["templates"] = this["DiwaneeSocialHoney"]["templates"] || {};
this["DiwaneeSocialHoney"]["templates"]["diwanee-social-honey"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li class=\"ui-list__item\">\n\n          <article class=\"media-small related-small\">\n            <div class=\"media-small__img\">\n              <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"hrl\">\n                <img src='"
    + alias4((helpers.thumborThumb || (depth0 && depth0.thumborThumb) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.thumbnailImageURLs : depth0)) != null ? stack1["0"] : stack1),{"name":"thumborThumb","hash":{},"data":data}))
    + "' alt='"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "' />\n              </a>\n            </div>\n            <div class=\"media-small__body\">\n              <h3 class=\"media-small__title remove-margin\">\n                "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n              </h3>\n            </div>\n          </article>\n\n        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"small-12 medium-6 large-12 columns diwanee-social-honey-wrap\"  data-placement='{\"after\":\".l-sidebar .ad-sidebar--top\"}'>\n  <div class=\"trending-articles__feed\">\n    <h2 class=\"trending-articles__title\">مقالات ذات صلة</h2>\n    <ul class=\"ui-list\">\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.urls : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </ul>\n  </div>\n</div>\n";
},"useData":true});
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
