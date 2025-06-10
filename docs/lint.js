const fs = require('fs');
const stylelint = require('stylelint');

async function lintStyles() {
  try {
    // Read the CSS file content
    const cssContent = fs.readFileSync('styles.css', 'utf8');

    // Extract the mobile-quick-contact section
    const mobileQuickContactPattern = /\.mobile-quick-contact\s*{[\s\S]*?}/g;
    const mobileQuickContactSections = cssContent.match(mobileQuickContactPattern);

    console.log("Found mobile-quick-contact sections:", mobileQuickContactSections?.length || 0);

    if (mobileQuickContactSections && mobileQuickContactSections.length > 0) {
      console.log("\nCSS Sections to analyze:");
      mobileQuickContactSections.forEach((section, index) => {
        console.log(`\n--- Section ${index + 1} ---\n${section}`);
      });
    }

    // Run stylelint on the whole file to find issues
    const results = await stylelint.lint({
      files: 'styles.css',
      formatter: 'string'
    });

    console.log("\n--- Stylelint Results ---");
    console.log(results.output);

  } catch (error) {
    console.error("Error during linting:", error);
  }
}

lintStyles(); 