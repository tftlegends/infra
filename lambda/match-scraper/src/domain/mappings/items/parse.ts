import items from './items.json';

interface Item {
  name: string;
}

interface Names {
  [key: string]: string;
}

interface Indices {
  [key: string]: number;
}

const main = (): void => {
  const data: { [key: string]: Item } = items['data'];
  const names: Names = {};
  const indices: Indices = {};

  for (const [index, key] of Object.keys(data).entries()) {
    const augment: Item = data[key];
    names[key] = augment.name;
    indices[key] = index;
  }

  console.log(JSON.stringify(names));
  console.log('========\n\n\n\n\n=======');
  console.log(JSON.stringify(indices));
};

main();
