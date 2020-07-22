export type RequirementId = string;

export type RequirementData = {
    id: RequirementId;
    file: string;
};

export type KeyValuePair = {
    key: string;
    value: string;
};

export type ImplementationData = {
    file: string;
    line: number;
    requirement: RequirementId;
};
