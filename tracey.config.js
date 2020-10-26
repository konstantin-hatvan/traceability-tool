const RequirementsummaryPlugin = require('tracey-plugin-requirementsummary');
const BreadcrumbsPlugin = require('tracey-plugin-breadcrumbs');

module.exports = {
    requirement: {
        excludes: [
            'node_modules',
            'build',
            'coverage',
            'docs/university',
            'docs/techical',
            'docs/user',
            'README.md',
            'docs/requirements/Requirements.md'
        ],
    },
    annotation: {
        excludes: [
            '*.test.ts',
            'constants.ts',
            'docs/requirements/Annotation/Annotation.md',
            'node_modules',
            'build',
            'coverage',
            'docs/university',
            'docs/techical',
            'docs/user',
            'README.md'
        ],
    },
    plugins: [
        RequirementsummaryPlugin.plugin({ file: 'docs/requirements/Requirements.md' }),
        BreadcrumbsPlugin.plugin(),
    ],
};
