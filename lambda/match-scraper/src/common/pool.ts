import { Pool, PoolConfig } from 'pg';

export default class VectorDBPool {
  private static instance: VectorDBPool;
  private pool: Pool;

  private constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  public static getInstance(config?: PoolConfig): VectorDBPool {
    if (!VectorDBPool.instance) {
      if (!config) {
        throw new Error("Configuration must be provided for the first initialization!");
      }
      VectorDBPool.instance = new VectorDBPool(config);
    }
    return VectorDBPool.instance;
  }

  public async getClient() {
    return await this.pool.connect();
  }

  public async end() {
    await this.pool.end();
  }
}

