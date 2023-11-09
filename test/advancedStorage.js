const AdvancedStorage = artifacts.require("AdvancedStorage");

contract('AdvancedStorage', () => {
  let instance = null;
  before(async () => {
    instance = await AdvancedStorage.deployed();
  });

  it("Should add first element to ids array", async () => {
      await instance.add(10);
      const result = await instance.ids(0);
      assert(result.toNumber() === 10);
  });
  it("Should add second element to ids array", async () => {
      await instance.add(20);
      const result = await instance.ids(1);
      assert(result.toNumber() === 20);
  });
  it("should get the length of array", async () => {
      const length = await instance.length();
      assert(length.toNumber() === 2);
  });
  it("should get all ids", async () =>  {
      const rawIds = await instance.getAll();
      const ids = rawIds.map(id => id.toNumber());
      assert.deepEqual(ids, [10, 20]);
  });
  it("should get first element of array", async () => {
      const first = await instance.get(0);
      return first;
      assert(first.toNumber() === 10);
  });

});
