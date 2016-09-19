(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['diwanee-social-honey'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <li class=\"ui-list__item\">\n\n\n\n\n\n        <article class=\"media-small related-small\">\n          <div class=\"media-small__img\">\n            <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"hrl\">\n              <img src='"
    + alias4((helpers.thumborThumb || (depth0 && depth0.thumborThumb) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.thumbnailImageURLs : depth0)) != null ? stack1["0"] : stack1),{"name":"thumborThumb","hash":{},"data":data}))
    + "' alt='"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "' />\n            </a>\n          </div>\n          <div class=\"media-small__body\">\n            <h3 class=\"media-small__title remove-margin\">\n              "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n            </h3>\n          </div>\n        </article>\n\n\n\n\n\n\n\n      </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"trending-articles__feed\">\n  <h2 class=\"trending-articles__title\">مقالات ذات صلة</h2>\n  <ul class=\"ui-list\">\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.urls : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </ul>\n</div>\n";
},"useData":true});
})();