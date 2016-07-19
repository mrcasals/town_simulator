import * as event from './gravedigger_works';
import { Gravedigger } from '../services/gravedigger';

describe('gravediggerWorks', () => {
  it('calls the Gravedigger service', () => {
    let stub = spyOn(Gravedigger.prototype, 'perform')

    event.gravediggerWorks({ people: [] })
    expect(stub).toHaveBeenCalled();
  })
})
