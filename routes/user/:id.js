export const get = (req, res) => {
  res.send(req.params);
};

export function post(req, res) {
  res.send(JSON.stringify(req.params));
}
