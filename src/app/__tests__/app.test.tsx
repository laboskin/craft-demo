import { screen, render } from '@testing-library/react';
import { App } from '@/app';

describe('App rendering', () => {
  it('Renders', async () => {
    render(<App />);
    expect(await screen.findByText('👋🏻 🌎')).toBeInTheDocument();
  });
});
