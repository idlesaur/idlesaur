import { randomItem } from '@/util';

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
