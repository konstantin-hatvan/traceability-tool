import { glob } from "glob";
import ignore from "ignore";
import { and } from ".";
import { CollectorConfiguration } from "../types";

export type CollectorCondition = (file: string) => boolean;

/**
 * Create a collector
 * A collector recursivley walks the file system from given configured startingpoints
 * collecting all files that pass all conditions
 * @param configuration The collector configuration
 * @param conditions A list of collector conditions
 */
export const createCollector = (configuration: CollectorConfiguration, conditions: CollectorCondition[]): string[] => {
    const filter = ignore().add(configuration.excludes); /** @requirement #[ Requirement.Collect, Annotation.Collect ]# #( Files must not be excluded )# */
    const requirements = configuration.startingpoints.reduce((result: string[], startingpoint: string) => {
        const files = glob.sync(startingpoint, { nodir: true });

        return [
            ...result,
            ...files,
        ];
    }, []);

    return filter.filter(requirements).filter(and(conditions));
};

