export default (req, res) => {
  res.render("home", {
    title: "Home Page",
    message: "Hello from cs290!",
  });
};
