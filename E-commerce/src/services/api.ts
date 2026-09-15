import { categories as seedCategories } from "@/data/categories";
import { products as seedProducts } from "@/data/products";
import type { Category, Product } from "@/types";

/**
 * Mock REST API layer.
 *
 * Simulates network latency and the occasional failure so the UI can render
 * genuine loading / error / success states. Swap these bodies for `fetch`
 * calls against a real backend without touching the hooks or components.
 */

const DEFAULT_LATENCY = 450;
const clone = <T>(value: T): T => structuredClone(value);
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let shouldFail = false;
/** Toggle to exercise the error state (handy for demos and tests). */
export function setApiFailure(value: boolean) {
  shouldFail = value;
}

async function request<T>(data: T, latency = DEFAULT_LATENCY): Promise<T> {
  await wait(latency);
  if (shouldFail) throw new Error("Network error. Please try again.");
  return clone(data);
}

export const api = {
  getProducts: (): Promise<Product[]> => request(seedProducts),
  getCategories: (): Promise<Category[]> => request(seedCategories, 320),
  getProduct: async (id: string): Promise<Product | undefined> => {
    const list = await request(seedProducts, 220);
    return list.find((product) => product.id === id);
  },
};
