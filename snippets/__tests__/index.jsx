jest.unmock('../');
import { shallow } from 'enzyme';
import { SomeComponent } from '../';

let props, comp;

describe('<<name>>', () => {
  beforeEach(() => {
    comp = shallow(<<<name>> {...props} />);
  });

  it('renders', () => {
    //
  });
});

