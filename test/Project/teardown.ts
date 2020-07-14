import * as fs from 'fs';

export const teardown = (rootDirectory: string) => {
    if (fs.existsSync(rootDirectory)) {
        fs.rmdirSync(rootDirectory, {
            recursive: true,
        });
    }
};
