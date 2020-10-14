import { Service } from './index';
import mock from 'mock-fs';
import { Implementation, Requirement, TraceLocation } from './types';
import { Configuration } from '../Shared/types';
import { parse } from './Requirement/Markdown';

describe('TraceLocation', () => {
    beforeEach(() => {
        // console.log('beforeEach'); // workaround for mock-fs problem with console.log
    });

    afterEach(mock.restore);

    test('Service.list(): lists all TraceLocations', () => {
        const configuration: Configuration = {
            requirement: {
                startingpoints: [
                    'requirements',
                ],
                excludes: []
            },
            implementation: {
                startingpoints: [
                    'src',
                ],
                excludes: [],
            },
        };

        const requirementContent = `---
id: MyRequirement
---

# My Requirement
`;

        mock({
            src: {
                'source.ts': '@requirement #[ MyRequirement ]# #( Description )#'
            },
            requirements: {
                'MyRequirement.md': requirementContent,
            },
        });

        const requirements: Requirement[] = [
            {
                ast: parse(requirementContent),
                file: 'requirements/MyRequirement.md',
                id: 'MyRequirement',
                type: 'requirement',
            },
        ];
        const implementations: Implementation[] = [
            {
                file: 'src/source.ts',
                type: 'implementation',
            },
        ];
        const traceLocations: TraceLocation[] = [
            ...requirements,
            ...implementations,
        ];

        expect(Service.list(configuration)).toEqual(traceLocations);
    });
});
