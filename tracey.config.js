module.exports = {
    requirement: {
        startingpoint: 'docs',
    },
    implementation: {
        startingpoint: 'src',
        excludes: [
            '.*\\.test\\..*',
        ],
    }
};
