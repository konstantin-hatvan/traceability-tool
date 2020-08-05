const requirements = {
    'requirement_01.md': `---
id: REQ_01
other-key: other value
---

# Requirement 1\n`,
    'requirement_02.md': `---
id: REQ_02
---

# Requirement 2\n`,
    nestedRequirements: {
        'requirement_03.md': `---
id: REQ_03
---

# Requirement 3\n`,
    },
};

const docs = {
    ...requirements,
};

const stylesSrc = {
    'styles.scss': `// @requirement REQ_01, REQ_02
html {
    background: green;
}\n`,
    Modules: {
        'my-module.scss': `.test {
    color: red; // @requirement REQ_01
}

/** @requirement REQ_03 */
.another-test {
    border-radius: 3px;
}\n`
    }
};

const scriptsSrc = {
    'main.ts': `console.log('Test'); // @requirement REQ_02, REQ_03\n`,
};

const stylesBuild = {
    'styles.css': `html {
    background: green;
}

.test {
    color: red;
}

.another-test {
    border-radius: 3px;
}\n`
};

const scriptsBuild = {
    'main.js': `console.log('Test');\n`,
};

const src = {
    Resources: {
        Private: {
            Scss: {
                ...stylesSrc,
            },
            JavaScript: {
                ...scriptsSrc,
            },
        },
        Public: {
            Css: {
                ...stylesBuild,
            },
            JavaScript: {
                ...scriptsBuild,
            },
        },
    }
};

export const mockFileSystemData = () => ({
    docs,
    src,
});

export const mockAbstractSyntaxTree = () => ({
    type: 'root',
    children: [
        {
            type: 'yaml',
            value: 'id: REQ_01\nother-key: other value',
        },
        {
            type: 'heading',
            depth: 1,
            children: [
                {
                    type: 'text',
                    value: 'Requirement 1',
                }
            ],
        },
    ],
});
