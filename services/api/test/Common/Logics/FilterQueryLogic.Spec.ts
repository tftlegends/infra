import { FilterQueryLogic } from "@TftLegends/Common/Logics/FilterQueryLogic";

describe('FilterQueryLogic', () => {

  let filterQueryLogic: FilterQueryLogic;

  beforeEach(() => {
    filterQueryLogic = new FilterQueryLogic();
  });

  test('should generate correct query for champion filters', () => {
    const input = {
      champions: [{ championName: 'Fiora' }, { championName: 'Mordekaiser', championTier: 3 }]
    };
    const { query, params } = FilterQueryLogic.buildQuery(input);
    const queryWithoutWhitespace = query.replaceAll(/\s/g, '');
    expect(queryWithoutWhitespace).toContain('FROMTftCompositionstc');
    expect(queryWithoutWhitespace).toContain('JOINTftCompositionChampionstcc_champ_1');
    expect(queryWithoutWhitespace).toContain('JOINTftCompositionChampionstcc_champ_2');
    expect(queryWithoutWhitespace).toContain('tcc_champ_1.championName=$1');
    expect(queryWithoutWhitespace).toContain('tcc_champ_2.championName=$2');
    expect(queryWithoutWhitespace).toContain('tcc_champ_2.championTier=$3');
    expect(params).toEqual(['Fiora', 'Mordekaiser', 3]);

  });

  test('should generate correct query for trait filters', () => {
    const input = {
      traits: [{ traitName: 'Cultist' }, { traitName: 'Duelist', traitTier: 2 }]
    };
    const { query, params } = FilterQueryLogic.buildQuery(input);
    const queryWithoutWhitespace = query.replaceAll(/\s/g, '');
    expect(queryWithoutWhitespace).toContain('FROMTftCompositionstc');
    expect(queryWithoutWhitespace).toContain('JOINTftCompositionTraitstct_1');
    expect(queryWithoutWhitespace).toContain('JOINTftCompositionTraitstct_2');
    expect(queryWithoutWhitespace).toContain('tct_1.traitName=$1');
    expect(queryWithoutWhitespace).toContain('tct_2.traitName=$2');
    expect(queryWithoutWhitespace).toContain('tct_2.traitTier=$3');
    expect(params).toEqual(['Cultist', 'Duelist', 2]);
  });

  test('should generate correct query for item filters', () => {
    const input = {
      items: [{ itemName: 'Quicksilver' }, { itemName: 'Bramble Vest', championName: 'Darius' }]
    };
    const { query, params } = FilterQueryLogic.buildQuery(input);
    const queryWithoutWhitespace = query.replaceAll(/\s/g, '');
    expect(queryWithoutWhitespace).toContain('FROMTftCompositionstc');
    expect(queryWithoutWhitespace).toContain('JOINTftCompositionItemstci_1');
    expect(queryWithoutWhitespace).toContain('JOINTftCompositionItemstci_2');
    expect(queryWithoutWhitespace).toContain('tci_1.itemName=$1');
    expect(queryWithoutWhitespace).toContain('tci_2.itemName=$2');
    expect(queryWithoutWhitespace).toContain('tci_2.championName=$3');
    expect(params).toEqual(['Quicksilver', 'Bramble Vest', 'Darius']);
  });

});
