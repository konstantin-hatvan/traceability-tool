import * as fs from 'fs';
import * as path from 'path';

// Setup example project
export const setup = (rootDirectory: string) => {
    const docsDirectory = path.resolve(rootDirectory, 'docs');
    const srcDirectory = path.resolve(rootDirectory, 'src');
    const testFiles = [
        // Requirement files
        {
            location: path.resolve(docsDirectory, 'requirement_1.md'),
            content: `# Requirement 1
This is a test
`
        },
        {
            location: path.resolve(docsDirectory, 'requirement_2.md'),
            content: `# Requirement 2
This is the second test

- List test
`
        },
        // Example source code files
        {
            location: path.resolve(srcDirectory, 'index.ts'),
            content: `console.log('Test');`
        },
        {
            location: path.resolve(srcDirectory, 'styles.scss'),
            content: `body {
    background-color: white;
}
`
        },
        {
            location: path.resolve(srcDirectory, 'index.html'),
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
`
        },
    ];

    if (!fs.existsSync(rootDirectory)) {
        // Create directories
        fs.mkdirSync(rootDirectory);
        fs.mkdirSync(docsDirectory);
        fs.mkdirSync(srcDirectory);

        // Create test files
        testFiles.forEach(requirement => {
            fs.writeFile(requirement.location, requirement.content, (error) => {
                if (error) throw error;
            });
        });
    }
}
