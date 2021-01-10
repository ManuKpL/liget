import * as features from './features';

async function importDefault(feat: string) {
  const module = await import(`./${feat}`);
  return module.default;
}

async function importNamed(feat: string) {
  const module = await import('./index');
  return module[feat as keyof typeof module];
}

async function importLib(feat: string) {
  const module = await import('./index');
  return module.default[feat as keyof typeof module.default];
}

describe('features exports', () => {
  it('should expose a named export, a default export and a whole lib export option', async () => {
    expect.hasAssertions();

    const featNames = Object.keys(features);

    expect.assertions(featNames.length * 5);

    const cases = featNames
      .map(async (feat) => Promise.all([importDefault(feat), importNamed(feat), importLib(feat)]))
      .map(async (loadFeat) => {
        const [defaultFeat, namedFeat, libFeat] = await loadFeat;
        expect(defaultFeat).toBeDefined();
        expect(namedFeat).toBeDefined();
        expect(libFeat).toBeDefined();

        expect(defaultFeat).toBe(namedFeat);
        expect(defaultFeat).toBe(libFeat);
      });

    await Promise.all(cases);
  });
});
