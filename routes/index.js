import { style_array_data } from "../styles_data_sheet.js";

export default (req, res) => {
  res.render("home", {style_array:style_array_data});
};
