module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });

  eleventyConfig.addCollection("services", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/services/*.md").sort((a, b) => {
      const aOrder = a.data.order ?? 0;
      const bOrder = b.data.order ?? 0;
      return aOrder - bOrder;
    })
  );

  eleventyConfig.addCollection("testimonials", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/testimonials/*.md").sort((a, b) => {
      const aOrder = a.data.order ?? 0;
      const bOrder = b.data.order ?? 0;
      return aOrder - bOrder;
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
