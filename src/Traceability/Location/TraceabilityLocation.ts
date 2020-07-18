export default class TraceabilityLocation {
    constructor(protected location: string, protected line: number, protected type: string) { }

    /**
     * Return the location
     */
    getLocation(): string {
        return this.location;
    }

    /**
     * Return the line number
     */
    getLine(): number {
        return this.line;
    }

    /**
     * Return the type
     */
    getType(): string {
        return this.type;
    }
}
