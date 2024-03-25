import { faker } from '@faker-js/faker';

export const getFakeCategories = (count: number) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push({
      id: faker.string.uuid(),
      name: faker.commerce.department()
    });
  }
  localStorage.setItem("categoriesList", JSON.stringify(categories));
  return categories;
};
