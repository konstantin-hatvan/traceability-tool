module.exports = {
    requirement: {
        startingpoint: 'docs',
        excludes: [],
    },
    implementation: {
        startingpoint: 'src',
        excludes: [
            '.*\\.test\\..*',
            'TestUtility.ts',
        ],
        annotation: '@requirement',
    }
};
