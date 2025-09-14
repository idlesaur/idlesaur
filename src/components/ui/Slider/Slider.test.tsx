import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from './Slider';

describe('<Slider />', () => {
    it('renders with default props', () => {
        render(<Slider data-testid="slider" />);
        const range = screen.getByTestId('slider');
        expect(range).toBeInTheDocument();
        expect(range).toHaveAttribute('type', 'range');
        expect(range).toHaveValue('0'); // default min
    });

    it('renders with custom min, max, and step', () => {
        render(<Slider data-testid="slider" min={5} max={50} step={5} />);
        const range = screen.getByTestId('slider');
        expect(range).toHaveAttribute('min', '5');
        expect(range).toHaveAttribute('max', '50');
        expect(range).toHaveAttribute('step', '5');
    });

    it('uncontrolled: updates internal state when slider changes', () => {
        render(<Slider data-testid="slider" />);
        const range = screen.getByTestId('slider');

        fireEvent.change(range, { target: { value: '20' } });

        expect(range).toHaveValue('20');
        expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('controlled: reflects controlled value but does not change internal state', () => {
        const handleChange = vi.fn();
        const { rerender } = render(
            <Slider data-testid="slider" value={10} onChange={handleChange} />,
        );
        const range = screen.getByTestId('slider');

        expect(range).toHaveValue('10');

        // Simulate change
        fireEvent.change(range, { target: { value: '30' } });
        expect(handleChange).toHaveBeenCalledTimes(1);

        // Because it's controlled, rerender with same value should not change without prop update
        expect(range).toHaveValue('10');

        rerender(
            <Slider data-testid="slider" value={30} onChange={handleChange} />,
        );
        expect(range).toHaveValue('30');
    });

    it('renders number input when allowEdit=true', () => {
        render(<Slider allowEdit data-testid="slider" />);
        const numberInput = screen.getByRole('spinbutton');
        expect(numberInput).toBeInTheDocument();
        expect(numberInput).toHaveValue(0);
    });

    it('updates value through number input when allowEdit=true', () => {
        render(<Slider allowEdit min={0} max={100} />);
        const numberInput = screen.getByRole('spinbutton');

        fireEvent.change(numberInput, { target: { value: '42' } });

        expect(numberInput).toHaveValue(42);
        expect(screen.getByRole('slider')).toHaveValue('42');
    });

    it('calls onChange when slider value changes', () => {
        const handleChange = vi.fn();
        render(<Slider onChange={handleChange} />);
        const range = screen.getByRole('slider');

        fireEvent.change(range, { target: { value: '15' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({ target: expect.any(HTMLInputElement) }),
        );
    });
});
