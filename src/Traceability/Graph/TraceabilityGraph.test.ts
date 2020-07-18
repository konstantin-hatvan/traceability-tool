import TraceabilityGraph from './TraceabilityGraph';
import TraceabilityLocation from '../Location/TraceabilityLocation';
import TraceabilityLink from '../Link/TraceabilityLink';

describe('TraceabilityGraph', () => {
    const locations = [
        new TraceabilityLocation('this/is/a/test/requirement.md', 2, 'Requirement'),
        new TraceabilityLocation('this/is/another/test/Controller.php', 131, 'Implementation'),
        new TraceabilityLocation('this/is/an/additional/test/styles.scss', 42, 'Implementation'),
    ];

    const links = [
        new TraceabilityLink(locations[0], locations[1]),
        new TraceabilityLink(locations[0], locations[2]),
    ];

    test('can be instantiated', () => {
        const instance = new TraceabilityGraph();

        expect(instance).toBeInstanceOf(TraceabilityGraph);
    });

    test('addLocation()', () => {
        const instance = new TraceabilityGraph();

        instance.addLocation(locations[0]);

        expect(instance.getLocations().length).toEqual(1);
    });

    test('getLocations()', () => {
        const instance = new TraceabilityGraph();

        instance.addLocation(locations[0]);
        instance.addLocation(locations[1]);
        instance.addLocation(locations[2]);

        expect(instance.getLocations().length).toEqual(3);
    });

    test('addLink()', () => {
        const instance = new TraceabilityGraph();

        instance.addLink(links[0]);

        expect(instance.getLinks().length).toEqual(1);
    });

    test('getLinks()', () => {
        const instance = new TraceabilityGraph();

        instance.addLink(links[0]);
        instance.addLink(links[1]);

        expect(instance.getLinks().length).toEqual(2);
    });

    test('getIncidentLinks()', () => {
        const instance = new TraceabilityGraph();

        instance.addLocation(locations[0]);
        instance.addLocation(locations[1]);
        instance.addLocation(locations[2]);
        instance.addLink(links[0]);
        instance.addLink(links[1]);

        expect(instance.getIncidentLinks(locations[0]).length).toEqual(2);
        expect(instance.getIncidentLinks(locations[1]).length).toEqual(1);
        expect(instance.getIncidentLinks(locations[2]).length).toEqual(1);
    });

    test('getLocationsByType()', () => {
        const instance = new TraceabilityGraph();

        instance.addLocation(locations[0]);
        instance.addLocation(locations[1]);
        instance.addLocation(locations[2]);
        instance.addLink(links[0]);
        instance.addLink(links[1]);

        expect(instance.getLocationsByType('Requirement').length).toEqual(1);
        expect(instance.getLocationsByType('Implementation').length).toEqual(2);
    });
});
