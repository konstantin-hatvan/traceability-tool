module.exports = {
    requirement: {
        startingpoint: 'requirements',
    },
    implementation: {
        startingpoint: 'src',
        excludes: [
            '.*\\.test\\..*',
        ],
    }
};
