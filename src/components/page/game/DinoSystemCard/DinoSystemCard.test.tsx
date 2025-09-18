import { describe, it, expect, vi, beforeEach } from 'vitest';

import { getRender } from '@/test/util';
import { DinoSystemCard } from '@/components/page/game';

describe('<DinoSystemCard />', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders null with 0 dinosaurs', () => {
        const render = getRender();
        const { container } = render(<DinoSystemCard />);
        expect(container.firstChild).toBeNull();
    });
});
