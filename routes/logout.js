export default (_req, res) => {
  res.clearCookie("session");
  res.redirect("/");
};
