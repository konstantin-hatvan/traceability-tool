module.exports = {
    requirement: {
        startingpoints: [
            'docs/requirements/**',
        ],
    },
    annotation: {
        startingpoints: [
            'src/**',
            'docs/requirements/**',
        ],
        excludes: [
            '*.test.ts',
            'constants.ts',
            'docs/requirements/Annotation/Annotation.md',
        ],
    }
};
