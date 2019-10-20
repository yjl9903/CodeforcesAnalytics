import axios from 'axios';

import { DAEMON_URL } from '../config';
import { User } from '../type';

const api = axios.create({
  baseURL: DAEMON_URL,
  timeout: 60 * 1000
});

export default api;

export async function checkDaemon() {
  try {
    await api.get('');
    return true;
  } catch (err) {
    return false;
  }
}

export async function insert(name: string, cfid: string) {
  console.log(`开始查询 "${cfid}" ...`);
  try {
    await api.post('', { name, cfid });
    console.log(`${name}的 Codeforces ID "${cfid}" 插入成功`);
    return true;
  } catch (err) {
    console.log(`插入失败`);
    return false;
  }
}

export async function query(): Promise<Array<User & { name: string }>>;
export async function query(name: string): Promise<User>;

export async function query(name?: string): Promise<any> {
  if (typeof name === 'undefined') {
    const { data } = await api.get('');
    return data;
  } else if (typeof name === 'string') {
    const { data } = await api.get('', {
      params: { name }
    });
    return data;
  }
}