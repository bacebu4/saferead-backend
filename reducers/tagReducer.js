const tagReducer = (tag) => ({
  id: tag.tag_id,
  name: tag.tag_name,
  hue: tag.hue,
});

module.exports = tagReducer;
