import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';
import { faTrash } from '@fortawesome/pro-solid-svg-icons';

describe('Card', () => {
  it('renders children wrapped in padded div when list is not used', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
    const wrapper = screen.getByText('Test content').closest('div');
    expect(wrapper).toHaveClass('p-4');
  });

  it('renders children directly when child is a list', () => {
    render(
      <Card>
        <ol role="list">
          <li>Item 1</li>
        </ol>
      </Card>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Card footer={<div>Custom footer</div>}>
        <p>Content</p>
      </Card>
    );
    expect(screen.getByText('Custom footer')).toBeInTheDocument();
  });

  it('renders footerButton with label and triggers onClick', () => {
    const onClick = jest.fn();
    render(
      <Card
        footerButton={{
          label: 'Click me',
          onClick,
        }}
      >
        <p>Content</p>
      </Card>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders footerButton with icon and variant styling', () => {
    render(
      <Card
        footerButton={{
          label: 'Delete',
          onClick: jest.fn(),
          icon: faTrash,
          variant: 'danger',
        }}
      >
        <p>Content</p>
      </Card>
    );
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(button).toHaveClass('text-red-600');
  });
});
