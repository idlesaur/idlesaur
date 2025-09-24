import { describe, it, expect, vi, beforeEach } from 'vitest';

import { getRender } from '@/test/util';
import { DinosCard } from '@/components/page/game';
import { mockDinosaur } from '@/test/mockFactory';

describe('<DinosCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders null with 0 dinosaurs', () => {
        const render = getRender();
        const { container } = render(<DinosCard />);
        expect(container.firstChild).toBeNull();
    });

    it('renders with dinosaurs', () => {
        const render = getRender({
            dinosaurState: { dinosaurs: [mockDinosaur(), mockDinosaur()] },
        });
        const { container } = render(<DinosCard />);
        expect(container.firstChild).not.toBeNull();
    });
});
