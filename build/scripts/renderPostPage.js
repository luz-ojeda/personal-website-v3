const { formatDate, checkIfFileChanged, parseMarkdown, configureNunjucksEnv } = require("./utils");
const { render } = require("./renderPage");
const fs = require("fs");

/**
 * Renders a blog post page
 * @param {Post} post - Post object containing content and metadata
 * @param {string} outputPath - Full path where the rendered HTML will be saved
 * @param {string} lang - Language code ('en' or 'es')
 * @throws {Error} If rendering or file writing fails
 */
async function renderPostPage(post, outputPath, lang) {
	const context = {
		content: parseMarkdown(post.content),
		description: post.content.slice(0, 150),
		pageName: post.data.slug,
		pageTitle: post.data.title,
		pubDate: formatDate(post.data.pubDate, lang, true),
		tags: post.data.tags,
		translationSlug: post.data.translationSlug,
	};

	if (fs.existsSync(outputPath)) {
		const env = configureNunjucksEnv(lang);
		const newHTML = env.render("post.njk", context);
	}

	render({
		templateName: "post.njk",
		outputPath,
		context,
		lang,
	});
}

module.exports = { renderPostPage };
