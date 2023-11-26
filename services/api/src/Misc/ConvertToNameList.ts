import AugmentNames from '@TftLegends/Common/Constants/Augments';
import ChampionNames from '@TftLegends/Common/Constants/Champions';
import ItemNames from '@TftLegends/Common/Constants/Items';
import TraitNames from '@TftLegends/Common/Constants/Traits';




import fs from 'node:fs';
import path from 'node:path';
const misc = () => {

  const augmentNames = Object.values(AugmentNames);
  fs.writeFileSync(
    path.join(__dirname, '../Common/Constants/AugmentNames.ts'),
    `export default ${JSON.stringify(augmentNames, null, 2)};\n`
  );

  const championNames = Object.values(ChampionNames);
  fs.writeFileSync(
    path.join(__dirname, '../Common/Constants/ChampionNames.ts'),
    `export default ${JSON.stringify(championNames, null, 2)};\n`
  );

  const itemNames = Object.values(ItemNames);
  fs.writeFileSync(
    path.join(__dirname, '../Common/Constants/ItemNames.ts'),
    `export default ${JSON.stringify(itemNames, null, 2)};\n`
  );

  const traitNames = Object.values(TraitNames);
  fs.writeFileSync(
    path.join(__dirname, '../Common/Constants/TraitNames.ts'),
    `export default ${JSON.stringify(traitNames, null, 2)};\n`
  );
}

misc();

