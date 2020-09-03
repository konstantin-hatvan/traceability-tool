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
            'constants.ts',
        ],
        annotation: '@requirement',
    }
};
