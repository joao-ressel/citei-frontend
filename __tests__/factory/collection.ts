import { faker } from "@faker-js/faker";
import { ImageURL } from "../../src/entities/url";
import { ICollection } from "../../src/interfaces/collection";

//função utilitária que retorna um objeto que representa uma coleção
export function collection(initial?: Partial<ICollection>): ICollection {
  return {
    title: faker.word.words(2),
    author: faker.person.fullName(),
    subtitle: faker.word.words(7),
    image: new ImageURL(`${process.env.NEXT_PUBLIC_DEV_URL}/assets/collection.jpg`),
    ...initial,//operador spread combinado com o padrão com o objeto initial
  }
}
