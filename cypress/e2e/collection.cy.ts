import { faker } from '@faker-js/faker';
import { Collection } from '../../src/entities/collection';
import {collection} from '../../__tests__/factory/collection'
import { ICollection } from '../../src/interfaces/collection';
import { ImageURL } from '../../src/entities/url';

/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('e2e/collection', () => {
  describe('Deve carregar a página de coleções corretamente', () => {
    it('Deve exibir o botão de adicionar coleção quando ela for carregada', () => {
      cy.visit('http://localhost:8080');

      cy.get('button').contains('Adicionar coleção').click({force: true}).should('be.visible');
    });
  });

  describe('Deve exibir corretamente o modal de cadastrar coleção', () => {
    it('Deve exibir a coleção que foi adicionada pelo usuário através do modal de adicionar coleção', () => {
      // Utilize a factory de coleção para gerar os dados de uma nova coleção
      const arrange: ICollection = {
        title: faker.word.words(2),
        author: faker.person.fullName(),
        // Utilize o faker para gerar uma url de imagem valida
        image: new ImageURL(faker.image.url()),
        subtitle: '',
      };


      // Acesse a URL da aplicação
      cy.visit('http://localhost:8080');
      // Faça o modal de criar coleção aparecer na tela
      cy.get('button').contains('Adicionar coleção').click({force: true}).should('be.visible');

      cy.get('input[ placeholder="Título da coleção"]').type(arrange.title);
      // Complete com os dados dos outros campos
      cy.get('input[ placeholder="Autor da coleção"]').type(arrange.author);
      cy.get('input[ placeholder="Link para imagem de capa"]').type(arrange.image);
      cy.get('input[ placeholder="Subtitulo da coleção"]').type(arrange.subtitle);
      // Não esqueça de clicar no botão com o texto de salvar
      cy.get('button').contains('Salvar').should('be.visible');

      cy.get('footer').contains('Rodapé').scrollIntoView();

      // Talvez seja interessante procurar na documentação do cypress uma maneira de ESPERAR algum tempo
      // até que a tela realmente termine a requisição
      cy.contains('Aguarde...').should('not.exist');
      // Aqui você deve fazer o assert, o h3 deve estar visível com o texto da nova coleção
      cy.get('h3').contains(arrange.title).should('be.visible');
      cy.get('h4').contains(arrange.subtitle).should('be.visible');
      cy.get('p').contains(arrange.author).should('be.visible');
      cy.get('img').should('have.attr', 'src', arrange.image);

    });
  });

  describe('Deve filtrar as coleções corretamente', () => {
    it('Deve exibir a coleção cujo título foi digitado no campo de buscar', async() => {
      cy.visit('http://localhost:8080');

      cy.get('h3').first().then((element) => {
        const firstCollectionTitle = element[0].innerText;

        cy.get('[aria-label="search-icon"]').click();
        cy.get('input[name="search-input"').type(firstCollectionTitle);

        cy.get('h3').contains(firstCollectionTitle).should('be.visible');
      });
    });
  });
})

// Prevent TypeScript from reading file as legacy script
export {}
