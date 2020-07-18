import TraceabilityLocation from './TraceabilityLocation';

describe('Node', () => {
    const testData = [
        {
            'location': 'this/is/a/test/requirement.md',
            'line': 2,
            'type': 'Requirement',
        },
        {
            'location': 'this/is/another/test/Controller.php',
            'line': 131,
            'type': 'Implementation',
        },
    ];

    test('can be instantiated', () => {
        testData.forEach(({ location, line, type }) => {
            const instance = new TraceabilityLocation(location, line, type);

            expect(instance).toBeInstanceOf(TraceabilityLocation);
        });
    });

    test('getLocation()', () => {
        testData.forEach(({ location, line, type }) => {
            const instance = new TraceabilityLocation(location, line, type);

            expect(instance.getLocation()).toEqual(location);
        });
    });

    test('getLine()', () => {
        testData.forEach(({ location, line, type }) => {
            const instance = new TraceabilityLocation(location, line, type);

            expect(instance.getLine()).toEqual(line);
        });
    });

    test('getType()', () => {
        testData.forEach(({ location, line, type }) => {
            const instance = new TraceabilityLocation(location, line, type);

            expect(instance.getType()).toEqual(type);
        });
    });
});
