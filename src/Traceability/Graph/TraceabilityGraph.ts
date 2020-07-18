import TraceabilityLocation from '../Location/TraceabilityLocation';
import TraceabilityLink from '../Link/TraceabilityLink';

export default class TraceabilityGraph {
    private locations: TraceabilityLocation[];
    private links: TraceabilityLink[];

    constructor() {
        this.locations = [];
        this.links = [];
    }

    /**
     * Return all existing TraceabilityLocations
     */
    getLocations(): TraceabilityLocation[] {
        return this.locations;
    }

    /**
     * Add a new TraceabilityLocation
     * @param location The new TraceabilityLocation
     */
    addLocation(location: TraceabilityLocation) {
        this.locations.push(location);
    }

    /**
     * Return all existing TraceabilityLocations with the specified type
     * @param type The requested TraceabilityLocation type
     */
    getLocationsByType(type: string): TraceabilityLocation[] {
        return this.locations.filter(item => item.getType() === type);
    }

    /**
     * Return all existing TraceabilityLinks
     */
    getLinks(): TraceabilityLink[] {
        return this.links;
    }

    /**
     * Add a new TraceabilityLink
     * @param link The new TraceabilityLink
     */
    addLink(link: TraceabilityLink) {
        this.links.push(link);
    }

    /**
     * Return all TraceabilityLinks that are connected to the provided TraceabilityLocation
     * @param location The TraceabilityLocation
     */
    getIncidentLinks(location: TraceabilityLocation): TraceabilityLink[] {
        return this.links.filter(link => link.getEndpoints().indexOf(location) >= 0);
    }
}
