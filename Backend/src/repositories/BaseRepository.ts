import { pool } from "../config/db";

export class BaseRepository {
  protected pool = pool;

  protected async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const [rows] = await this.pool.query(sql, params);
    return rows as T[];
  }
}
