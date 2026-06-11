import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Demo } from './Demo'

// Stub for the required onNavigate prop — tests that exercise navigation are
// out of scope here; we just need a valid function reference.
const noop = vi.fn()

describe('Demo', () => {
  it('renders heading and session banner', () => {
    render(<Demo onNavigate={noop} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Todo Testbed' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Live demo/)).toBeInTheDocument()
  })

  it('shows empty state and no list items on initial render', () => {
    render(<Demo onNavigate={noop} />)
    expect(screen.getByText(/No todos yet\./)).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('adds a typed todo to the list', async () => {
    const user = userEvent.setup()
    render(<Demo onNavigate={noop} />)

    await user.type(screen.getByLabelText('New todo'), 'Buy milk')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('listitem')).toHaveTextContent('Buy milk')
    expect(screen.queryByText(/No todos yet\./)).not.toBeInTheDocument()
  })

  it('does not add a todo when input is blank', async () => {
    const user = userEvent.setup()
    render(<Demo onNavigate={noop} />)

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText(/No todos yet\./)).toBeInTheDocument()
  })

  it('toggles a todo to done, adding the todo-done class', async () => {
    const user = userEvent.setup()
    render(<Demo onNavigate={noop} />)

    await user.type(screen.getByLabelText('New todo'), 'Read the docs')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    const item = screen.getByRole('listitem')
    expect(item).not.toHaveClass('todo-done')

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(item).toHaveClass('todo-done')
  })

  it('toggles a done todo back to undone, removing the todo-done class', async () => {
    const user = userEvent.setup()
    render(<Demo onNavigate={noop} />)

    await user.type(screen.getByLabelText('New todo'), 'Read the docs')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    const item = screen.getByRole('listitem')
    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(item).toHaveClass('todo-done')

    await user.click(screen.getByRole('button', { name: 'Mark complete' }))
    expect(item).not.toHaveClass('todo-done')
  })

  it('deletes a todo from the list', async () => {
    const user = userEvent.setup()
    render(<Demo onNavigate={noop} />)

    await user.type(screen.getByLabelText('New todo'), 'Take out trash')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByRole('listitem')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete todo' }))

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText(/No todos yet\./)).toBeInTheDocument()
  })

  it('clears all todos when "Clear all" is clicked', async () => {
    const user = userEvent.setup()
    render(<Demo onNavigate={noop} />)

    await user.type(screen.getByLabelText('New todo'), 'First task')
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await user.type(screen.getByLabelText('New todo'), 'Second task')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: 'Clear all' }))

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText(/No todos yet\./)).toBeInTheDocument()
  })

  it('does not render the "Clear all" button when the list is empty', () => {
    render(<Demo onNavigate={noop} />)
    expect(
      screen.queryByRole('button', { name: 'Clear all' }),
    ).not.toBeInTheDocument()
  })
})
