const { tagsService } = require("../services");

const addExistingTag = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await tagsService.addExistingTag(req.body);
    res.status(201).send("Added existing tag");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const addNewTag = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    await tagsService.addNewTag(req.user.id, req.body);
    res.status(201).send("Added new tag");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  addExistingTag,
  addNewTag,
};
