module.exports = {
    requirement: {
        startingpoints: [
            'requirements',
        ],
    },
    tracelink: {
        excludes: [
            '.*\\.test\\..*',
            'constants\\.ts',
        ],
    }
};
