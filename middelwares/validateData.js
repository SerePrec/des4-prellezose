const validateId = (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) res.json({ error: "El parámetro no es válido" });
  else {
    req.params.id = parseInt(id);
    next();
  }
};

const validatePostBody = (req, res, next) => {
  let { title, price, thumbnail } = req.body;
  if (
    !(typeof title == "string" && /\w+/.test(title)) ||
    !(
      (typeof price == "string" || typeof price == "number") &&
      /^\d+(\.\d+)?$/.test(price)
    ) ||
    !(typeof thumbnail == "string" && /\w+/.test(thumbnail))
  )
    res.json({ error: "Los valores enviados no son válidos" });
  else {
    title = title.trim();
    price = Math.round(parseFloat(price) * 100) / 100;
    thumbnail = thumbnail.trim();
    req.body = { ...req.body, title, price, thumbnail };
    next();
  }
};

const validatePutBody = (req, res, next) => {
  const { title, price, thumbnail } = req.body;
  if (
    (title !== undefined && !(typeof title == "string" && /\w+/.test(title))) ||
    (price !== undefined &&
      !(
        (typeof price == "string" || typeof price == "number") &&
        /^\d+(\.\d+)?$/.test(price)
      )) ||
    (thumbnail !== undefined &&
      !(typeof thumbnail == "string" && /\w+/.test(thumbnail)))
  )
    res.json({ error: "Los valores enviados no son válidos" });
  else {
    req.body.title = title?.trim();
    req.body.rice = price && Math.round(parseFloat(price) * 100) / 100;
    req.body.thumbnail = thumbnail?.trim();
    next();
  }
};
module.exports = { validateId, validatePostBody, validatePutBody };
