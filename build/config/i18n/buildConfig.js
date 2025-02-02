const fs = require("fs");
const path = require("path");
const {URL_MAPPINGS, PATHS} = require("../../../config");

function buildBrowserConfig() {
	// Provide url mappings for language.js in the browser
	const configContent = `window.URL_TRANSLATIONS = ${JSON.stringify(URL_MAPPINGS, null, 2)};`;

	const outputDir = path.join(PATHS.DIST, "scripts");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	fs.writeFileSync(path.join(outputDir, "i18n.js"), configContent);
}

module.exports = { buildBrowserConfig };
