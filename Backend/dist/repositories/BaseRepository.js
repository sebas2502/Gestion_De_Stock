"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const db_1 = require("../config/db");
class BaseRepository {
    constructor() {
        this.pool = db_1.pool;
    }
    async query(sql, params = []) {
        const [rows] = await this.pool.query(sql, params);
        return rows;
    }
}
exports.BaseRepository = BaseRepository;
