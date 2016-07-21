jest.unmock('../');
import { shallow } from 'enzyme';
import { SomeComponent } from '../';

let props, comp;

describe('SomeComponent', () => {
  beforeEach(() => {
    comp = shallow(<SomeComponent {...props} />);
  });

  it('renders', () => {
    //
  });
});

