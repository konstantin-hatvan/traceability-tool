import TraceabilityLocation from '../Location/TraceabilityLocation';
import TraceabilityLink from './TraceabilityLink';

describe('TraceabilityLink', () => {
    const testData = {
        'requirement': new TraceabilityLocation('this/is/a/test/requirement.md', 2, 'Requirement'),
        'implementation': new TraceabilityLocation('this/is/another/test/Controller.php', 131, 'Implementation'),
    };

    test('can be instantiated', () => {
        const instance = new TraceabilityLink(testData.requirement, testData.implementation);

        expect(instance).toBeInstanceOf(TraceabilityLink);
    });


    test('getOrigin()', () => {
        const instance = new TraceabilityLink(testData.requirement, testData.implementation);

        expect(instance.getOrigin()).toEqual(testData.requirement);
    });

    test('getDestination()', () => {
        const instance = new TraceabilityLink(testData.requirement, testData.implementation);

        expect(instance.getDestination()).toEqual(testData.implementation);
    });

    test('getLink()', () => {
        const instance = new TraceabilityLink(testData.requirement, testData.implementation);

        expect(instance.getLink()).toEqual('../../../another/test/Controller.php#L131');
    });

    test('getEndpoints()', () => {
        const instance = new TraceabilityLink(testData.requirement, testData.implementation);

        expect(instance.getEndpoints()).toEqual([
            testData.requirement,
            testData.implementation,
        ]);
    });
});
