(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['theme_T'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"theme_element_menu"),depth0,{"name":"theme_element_menu","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<!-- Adjust so it's theme button -->\n<button id=\"change-theme-button\">\n\n    <img class=\"icon\" src=\"paint_brush.png\" id=\"brush-icon\" alt=\"Settings\">\n</button>\n\n\n<!-- MENU themes -->\n<div id=\"change-theme-modal\" class=\"hidden\">\n    <h3>Theme Setting</h3>\n    <button type=\"button\" id=\"modal-close\" class=\"modal-hide-button\">&times;</button>\n   \n    <div class=\"modal-dialog\">\n        <fieldset id=\"theme-condition-fieldset\" class=\"theme-fieldset\">\n            <legend>Theme</legend>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"style_array") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":12},"end":{"line":19,"column":21}}})) != null ? stack1 : "")
    + "            <!--My choice-->\n            <div class=\"input-group\">\n                <input type=\"radio\" name=\"theme-condition\" id=\"thee-condition-mychoice\" value=\"mychoice\">\n                <label for=\"theme-condition-mychoice\">New Theme</label>\n                <!-- New line -->\n                <div class=\"newname-container\">\n                    Name: <input type=\"text\" id=\"name_new\" placeholder=\"Name\" enabled>\n                </div>\n                <div class=\"newhex-container\">\n                    Hex Color:<input type=\"text\" id=\"hex_value_new\" placeholder=\"Hex Value\" enabled>\n                </div>\n            </div>\n        </fieldset>\n\n        <div class=\"modal-footer\">\n            <button type=\"button\" id=\"modal-cancel\" class=\"modal-hide-button action-button\">Cancel</button>\n            <button type=\"button\" id=\"modal-apply\" class=\"action-button\">Apply</button>\n        </div>\n\n    </div>\n</div>";
},"usePartial":true,"useData":true});
})();