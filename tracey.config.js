module.exports = {
    requirement: {
        startingpoints: [
            'requirements/**',
        ],
    },
    annotation: {
        startingpoints: [
            'src/**',
            'requirements/**',
        ],
        excludes: [
            '*.test.ts',
            'constants.ts',
            'requirements/Annotation/Annotation.md',
        ],
    }
};
