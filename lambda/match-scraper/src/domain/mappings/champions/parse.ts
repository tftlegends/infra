import champions from './champions.json';

interface Champion {
  name: string;
}

interface Names {
  [key: string]: string;
}

interface Indices {
  [key: string]: number;
}

const main = (): void => {
  const data: { [key: string]: Champion } = champions['data'];
  const names: Names = {};
  const indices: Indices = {};

  for (const [index, key] of Object.keys(data).entries()) {
    const augment: Champion = data[key];
    names[key] = augment.name;
    indices[key] = index;
  }

  console.log(JSON.stringify(names));
  console.log('========\n\n\n\n\n=======');
  console.log(JSON.stringify(indices));
};

main();
