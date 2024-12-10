(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['single_style'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"/"
    + alias4(((helper = (helper = lookupProperty(helpers,"theme_name") || (depth0 != null ? lookupProperty(depth0,"theme_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme_name","hash":{},"data":data,"loc":{"start":{"line":1,"column":30},"end":{"line":1,"column":44}}}) : helper)))
    + ".css\"  media=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"start_as") || (depth0 != null ? lookupProperty(depth0,"start_as") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"start_as","hash":{},"data":data,"loc":{"start":{"line":1,"column":58},"end":{"line":1,"column":70}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"theme_id") || (depth0 != null ? lookupProperty(depth0,"theme_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":76},"end":{"line":1,"column":88}}}) : helper)))
    + "\">";
},"useData":true});
})();