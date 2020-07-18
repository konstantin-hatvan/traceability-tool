import visit from 'unist-util-visit';

export default class Requirement {
    private id?: string;

    constructor(private location: string, private abstractSyntaxTree: any) { }

    public getId(): string {
        if (!this.id) {
            visit(this.abstractSyntaxTree, 'yaml', (node: any) => {
                const { id } = node.value.split('\n').reduce((result: any, entryString: string) => {
                    const [key, value] = entryString.split(':');
                    result[key] = value;
                    return result;
                }, {});

                this.id = id;
            })
        }

        return <string>this.id;
    }
}
