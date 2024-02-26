import { JestConfigWithTsJest } from 'ts-jest';
import { getConfig } from '@powerhousedao/codegen';

const { documentModelsDir, editorsDir } = getConfig();

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        `${documentModelsDir}/**/*.ts`,
        `${editorsDir}/**/*.ts`,
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
    },
} satisfies JestConfigWithTsJest;
