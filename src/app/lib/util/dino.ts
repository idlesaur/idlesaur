import { v4 as uuidv4 } from 'uuid';

import { randomItem } from '@/util';
import { type Prisma } from '@/generated/prisma';

const DEFAULT_NEXT_LEVEL_EXP: number = 10;
const DEFAULT_ATTRIBUTE_POINTS: number = 5;
const DEFAULT_HEALTH: number = 10;

const prefixes = [
    'Mighty',
    'Sneaky',
    'Ancient',
    'Spiky',
    'Bone',
    'Fossil',
    'Shadow',
];

const cores = [
    'Fred',
    'Tina',
    'Gary',
    'Linda',
    'Carl',
    'Debra',
    'Steve',
    'Nancy',
    'Bob',
    'Karen',
    'Chompers',
    'Stompy',
    'Snaggletooth',
    'Tiny',
    'Clawdia',
    'Bitey',
    'Roarbert',
    'Tricera-Tom',
    'Veloci-Pete',
];

const suffixes = [
    '',
    '',
    '',
    'the Destroyer',
    'the Bonecrusher',
    'the Tiny Terror',
    'the Roaring Menace',
    'Lord of Fossils',
    'Queen of Claws',
    'Captain Crunch',
    'Baron von Chomp',
    'General Fang',
    'Professor Talonstein',
    'the Great Nom-Nom',
];

export const generateName = (): string => {
    const prefix = randomItem(prefixes);
    const core = randomItem(cores);
    const suffix = randomItem(suffixes);

    return [prefix, core, suffix].filter(Boolean).join(' ');
};

export const createDino = (
    defaultOverrides: Partial<Prisma.DinosaurCreateInput> = {},
): Prisma.DinosaurCreateInput =>
    ({
        id: uuidv4(),
        name: generateName(),
        level: 1,
        experience: 0,
        nextLevelExperience: DEFAULT_NEXT_LEVEL_EXP,
        type: 'RAPTOR',
        alive: true,
        attack: DEFAULT_ATTRIBUTE_POINTS,
        defense: DEFAULT_ATTRIBUTE_POINTS,
        speed: DEFAULT_ATTRIBUTE_POINTS,
        health: DEFAULT_HEALTH,
        maxHealth: DEFAULT_HEALTH,
        ...defaultOverrides,
    }) as Prisma.DinosaurCreateInput;
