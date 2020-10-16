module.exports = {
    requirement: {
        startingpoints: [
            'requirements',
        ],
    },
    annotation: {
        startingpoints: [
            'src',
            'requirements',
        ],
        excludes: [
            '.*\\.test\\..*',
            'constants\\.ts',
            'requirements/Annotation/Annotation.md',
        ],
    }
};
