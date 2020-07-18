import path from 'path';
import TraceabilityLocation from '../Location/TraceabilityLocation';

export default class TraceabilityLink {
    constructor(private origin: TraceabilityLocation, private destination: TraceabilityLocation) { }

    /**
     * Return the origin TraceabilityLocation
     */
    getOrigin(): TraceabilityLocation {
        return this.origin;
    }

    /**
     * Return the destination TraceabilityLocation
     */
    getDestination(): TraceabilityLocation {
        return this.destination;
    }

    /**
     * Return both link endpoints
     */
    getEndpoints(): TraceabilityLocation[] {
        return [
            this.origin,
            this.destination,
        ];
    }

    /**
     * Return the generated TraceabilityLink
     */
    getLink(): string {
        const relativeLink = path.relative(this.origin.getLocation(), this.destination.getLocation());
        const lineNumber = this.destination.getLine();
        return `${relativeLink}#L${lineNumber}`;
    }
}
