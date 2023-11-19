import augments from './augments.json';

interface Augment {
  name: string;
}

interface Names {
  [key: string]: string;
}

interface Indices {
  [key: string]: number;
}

const main = (): void => {
  const data: { [key: string]: Augment } = augments['data'];
  const names: Names = {};
  const indices: Indices = {};

  for (const [index, key] of Object.keys(data).entries()) {
    const augment: Augment = data[key];
    names[key] = augment.name;
    indices[key] = index;
  }

  console.log(JSON.stringify(names));
  console.log('========\n\n\n\n\n=======');
  console.log(JSON.stringify(indices));
};

main();
