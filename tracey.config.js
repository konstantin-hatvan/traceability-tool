module.exports = {
    requirement: {
        startingpoints: [
            'requirements',
        ],
    },
    implementation: {
        startingpoints: [
            'src',
        ],
        excludes: [
            '.*\\.test\\..*',
        ],
    }
};
