module.exports = {
    requirement: {
        startingpoints: [
            'requirements',
        ],
    },
    tracelink: {
        startingpoints: [
            'src',
            'requirements',
        ],
        excludes: [
            '.*\\.test\\..*',
            'constants\\.ts',
            'requirements/TraceLink/Annotation.md',
        ],
    }
};
