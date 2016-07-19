import { render } from '../views/logger';

export function log({ message, ...event }) {
  render(message);
}
