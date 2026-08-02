import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

const renderApp = (path = '/') => {
  window.location.hash = path
  return render(<App />)
}

describe('Hjalte’s Cookbook', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '/'
  })

  it('searches recipe titles and ingredients instantly', () => {
    renderApp()
    const search = screen.getByRole('searchbox', { name: 'Search recipes' })

    fireEvent.change(search, { target: { value: 'falafel' } })
    expect(screen.getByText('2 recipes')).toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'quinoa' } })
    expect(screen.getByText('1 recipe')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hjalte’s Customizable Meal-Prep Salad' })).toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'pizza' } })
    expect(screen.getByText('No recipes match your search.')).toBeInTheDocument()
  })

  it('switches the complete interface to Danish and remembers the choice', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Dansk' }))

    expect(screen.getByRole('searchbox', { name: 'Søg i opskrifter' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hjaltes valgfri meal-prep-salat' })).toBeInTheDocument()
    expect(localStorage.getItem('hjaltes-cookbook-language')).toBe('da')
  })

  it('opens each recipe route and supports temporary salad choices', () => {
    const { unmount } = renderApp('/recipes/meal-prep-salad')
    const spinach = screen.getByRole('button', { name: /Spinach/ })
    fireEvent.click(spinach)
    expect(spinach).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('1 selected')).toBeInTheDocument()

    unmount()
    renderApp('/recipes/easy-everyday-wrap')
    expect(screen.getByRole('heading', { level: 1, name: 'Easy Everyday Wrap' })).toBeInTheDocument()
    expect(screen.getByText('Fold both sides inward.')).toBeInTheDocument()
  })
})
