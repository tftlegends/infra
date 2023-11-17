import VectorDBPool from "@TftLegends/Common/Repositories/Pool";

export default class Repository {
  protected static instance: Repository;
  protected pool: VectorDBPool;
  constructor() {
    this.pool = VectorDBPool.getInstance();
  }

  public static getInstance(): Repository {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }
}
