import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import CollectionList from '@/components/collectionList';
import { collection } from '__tests__/factory/collection';
import { ICollection } from 'src/interfaces/collection';

describe('<CollectionList>', () => {
  describe('Deve renderizar uma lista de coleções em branco', () => {
    it('Deve exibir um elemento em branco quando uma lista de coleções vazia for injetada via prop', () => {
      const collections = [] as ICollection[];
      const { container } = render(<CollectionList collections={collections} />);

      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('Deve exibir corretamente o nome de todas as coleções passadas via prop', () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() => collection());
      render(<CollectionList collections={collections} />);

      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
    });
  });
});