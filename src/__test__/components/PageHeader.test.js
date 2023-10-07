import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageHeader from '../../components/PageHeader';

describe('PageHeader Component', () => {
  it('renders the title correctly', () => {
    const title = 'My Page Header';
    const { getByText } = render(<PageHeader title={title} />);
    const headerElement = getByText(title);
    expect(headerElement).toBeInTheDocument();
  });
});
