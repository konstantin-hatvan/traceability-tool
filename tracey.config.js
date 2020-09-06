module.exports = {
    requirement: {
        startingpoint: 'docs',
        excludes: [],
    },
    implementation: {
        startingpoint: 'src',
        excludes: [
            '.*\\.test\\..*',
        ],
        annotation: '@requirement',
    }
};
