import Counter from 'components/counter';

describe('Counter', () => {
  it('will render', () => {
    const component = mount(<Counter />);
    expect(component.text()).to.equal('Client: 1');
  });
});
