import React from 'react';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import CollectionList from '../../src/components/collectionList';
import { collection } from '../factory/collection';
import { ICollection } from '../../src/interfaces/collection';

describe('<CollectionList>', () => {
  describe('Deve renderizar uma lista de coleções em branco', () => {
    it('Deve exibir um elemento em branco quando uma lista de coleções vazia for injetada via prop', () => {
      const collections = [] as ICollection[];
      const { container } = render(<CollectionList collections={collections} />);
      //verifica se um elemento em branco é exibido quando uma lista vazia de coleções é injetada
      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it('Deve exibir corretamente o nome de todas as coleções passadas via prop', () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );
      render(<CollectionList collections={collections} />);
      //verifica se o nome de todas as coleções é exibido corretamente quando as coleções são passadas
      collections.forEach(({ title }) => expect(screen.getByText(title)).toBeInTheDocument());
    });

    it('Deve renderizar o mesmo numero de coleções passadas via prop "collections"', () => {
      const collections = Array.from(Array(faker.number.int({ min: 1, max: 10 }))).map(() =>
        collection()
      );
      //verifica se o número de coleções renderizadas é o mesmo número de coleções passadas
      const { container } = render(<CollectionList collections={collections} />);
      //verificar se o número de nós filhos do primeiro elemento do contêiner é igual ao número de coleções
      expect(container.firstChild?.childNodes.length).toBe(collections.length);
    });
  });
});
