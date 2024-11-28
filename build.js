import { exec } from 'node:child_process';
import { mkdir, glob } from 'node:fs/promises';
import { promisify } from 'node:util';
import { join, relative, dirname } from 'node:path';
import process from "node:process";

const execAsync = promisify(exec);

// Configuration
const config = {
  sourceDir: 'views/partials',
  outputDir: 'static/js/templates'
};

async function compileTemplates() {
  try {
    // Ensure output directory exists
    await mkdir(config.outputDir, { recursive: true });

    // Find all handlebars templates
    const templates = [];
    for await (const path of glob('**/*.handlebars', { cwd: config.sourceDir })) {
      templates.push(path);
    }

    // Compile each template
    await Promise.all(templates.map(async (relativePath) => {
      const templatePath = join(config.sourceDir, relativePath);
      const outputPath = join(
        config.outputDir,
        relativePath.replace('.handlebars', '.js')
      );

      // Create output directory for this template if needed
      await mkdir(dirname(outputPath), { recursive: true });

      // Build the handlebars CLI command
      const command = `handlebars "${templatePath}" -f "${outputPath}"`;

      try {
        await execAsync(command);
        console.log(`✓ Compiled ${relativePath}`);
      } catch (error) {
        console.error(`✗ Error compiling ${relativePath}:`, error.message);
        process.exit(1);
      }
    }));

    console.log('\nTemplate compilation complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Execute the build
compileTemplates();
