import { Todos } from "../types";

export function uuid(): string {
  let i, random;
  let uuid = "";

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
}

export function pluralize(count: number, word: string): string {
  return count === 1 ? word : word + "s";
}

export function storeData(namespace: string, data: Todos) {
  sessionStorage.setItem(namespace, JSON.stringify(data));
}

export function getData(namespace: string): Todos {
  const data = sessionStorage.getItem(namespace)
  if (data) {
    return JSON.parse(data)
  }
  return []
}