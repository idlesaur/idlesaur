import { describe, it, expect, vi, beforeEach } from 'vitest';

import { getRender } from '@/test/util';
import { DinoSystemCard } from '@/components/page/game';
import { mockDinosaur } from '@/test/mockFactory';

describe('<DinoSystemCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders null with 0 dinosaurs', () => {
        const render = getRender();
        const { container } = render(<DinoSystemCard />);
        expect(container.firstChild).toBeNull();
    });

    it('renders with dinosaurs', () => {
        const render = getRender({
            dinosaurState: { dinosaurs: [mockDinosaur(), mockDinosaur()] },
        });
        const { container } = render(<DinoSystemCard />);
        expect(container.firstChild).not.toBeNull();
    });
});
