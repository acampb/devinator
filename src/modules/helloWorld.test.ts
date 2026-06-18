import { describe, expect, it } from 'vitest';
import { helloWorld } from './helloWorld';

describe('helloWorld', () => {
  it('returns default greeting with no argument', () => {
    expect(helloWorld()).toBe('Hello, World!');
  });
  it('returns personalised greeting with a name', () => {
    expect(helloWorld('Alice')).toBe('Hello, Alice!');
  });
  it('falls back to default greeting for empty string', () => {
    expect(helloWorld('')).toBe('Hello, World!');
  });
});
