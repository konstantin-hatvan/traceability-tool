import fs from 'fs';
import path from 'path';
import { Requirement, RequirementConfiguration } from "../../Shared/types";
import { createTableRow, createTableCell, createText, createTable, createLink, createHeading, createDocument } from '../../Markdown/Generator';
import { Table } from "mdast";
import { stringify } from '../../Markdown';

const createOverviewTable = (requirements: Requirement[], configuration: RequirementConfiguration): Table => {
    const tableHeader = createTableRow([
        createTableCell(createText('File')),
        createTableCell(createText('ID')),
        createTableCell(createText('Synopsis')),
    ]);

    const tableBody = requirements.map(requirement => {
        const { file, id, synopsis } = requirement;
        const link = path.relative(configuration.startingpoint, requirement.file);

        return createTableRow([
            createTableCell(createLink(file, link)),
            createTableCell(createText(id)),
            createTableCell(createText(synopsis)),
        ]);
    });

    return createTable([
        tableHeader,
        ...tableBody,
    ]);
};

export const generate = (requirements: Requirement[], configuration: RequirementConfiguration): void => {
    const table = createOverviewTable(requirements, configuration);
    const heading = createHeading('Requirements', 1);

    const document = createDocument([
        heading,
        table,
    ]);

    fs.writeFileSync(path.resolve(configuration.startingpoint, 'overview.md'), stringify(document));
};
