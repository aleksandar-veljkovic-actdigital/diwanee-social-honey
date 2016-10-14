this["DiwaneeSocialHoney"] = this["DiwaneeSocialHoney"] || {};
this["DiwaneeSocialHoney"]["templates"] = this["DiwaneeSocialHoney"]["templates"] || {};
this["DiwaneeSocialHoney"]["templates"]["diwanee-social-honey-mainbar"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n        <li class=\"b-rel-article__item\">\n          <a class=\"b-rel-article__list__img\" href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n            <img width=\"150\" height=\"114\" src='"
    + alias4((helpers.thumborThumb || (depth0 && depth0.thumborThumb) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.thumbnailImageURLs : depth0)) != null ? stack1["0"] : stack1),{"name":"thumborThumb","hash":{},"data":data}))
    + "' alt='"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "'>\n          </a>\n\n          <!--a rel=\"\" class=\"hrl media-small__category\" href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + ">محركات</a-->\n\n          <h4 class=\"b-rel-article__list__title\">\n            <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">هكذا تراوحت أسعار أبرز سيارات الروز رايز "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n          </h4>\n        </li>\n\n\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"b-rel-article diwanee-social-honey-wrap mainbar\" data-placement='{\"after\":\".page-article .l-article-fix--fullwidth .tags\"}'>\n\n  <ul class=\"b-rel-article__list\">\n\n"
    + ((stack1 = helpers.each.call(alias1,(helpers.limit || (depth0 && depth0.limit) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.urls : depth0),8,{"name":"limit","hash":{},"data":data}),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </ul>\n\n</div>\n\n\n\n\n\n\n\n";
},"useData":true});
;
// Diwanee Social Honey -- App that fatch related articles 
// Handlebars templates are precompiled from src/{publication} folder

Handlebars.registerHelper('limit', function (arr, limit) {
  if (!_.isArray(arr)) { return []; }
  return arr.slice(0, limit);
});

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

    var print = function ($render) {
      //
      // Placements object has to be defined as data-placement attribute on oldest element within publication's handlebars template
      //
      var placements = $render.data('placement');
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

    var compile = function (data) {
      $.each(DiwaneeSocialHoney.templates, function(key, template){
        var $render = $(template(data, true));
        print($render);        
      });
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
