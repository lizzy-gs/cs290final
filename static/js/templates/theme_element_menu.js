(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['theme_element_menu'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<input type=\"radio\" name=\"theme-condition\" id=\"theme-condition-"
    + alias4(((helper = (helper = lookupProperty(helpers,"theme_name") || (depth0 != null ? lookupProperty(depth0,"theme_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme_name","hash":{},"data":data,"loc":{"start":{"line":1,"column":63},"end":{"line":1,"column":77}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"theme_name") || (depth0 != null ? lookupProperty(depth0,"theme_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme_name","hash":{},"data":data,"loc":{"start":{"line":1,"column":86},"end":{"line":1,"column":100}}}) : helper)))
    + "\">\n<label for=\"theme-condition-"
    + alias4(((helper = (helper = lookupProperty(helpers,"theme_name") || (depth0 != null ? lookupProperty(depth0,"theme_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":42}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"theme_name") || (depth0 != null ? lookupProperty(depth0,"theme_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":44},"end":{"line":2,"column":58}}}) : helper)))
    + "</label>";
},"useData":true});
})();