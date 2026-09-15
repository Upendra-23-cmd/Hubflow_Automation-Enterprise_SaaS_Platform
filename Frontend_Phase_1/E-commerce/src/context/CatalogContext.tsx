import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "@/services/api";
import type { Category, Product } from "@/types";

interface CatalogContextValue {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const refetch = useCallback(() => setReloadToken((token) => token + 1), []);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setIsError(false);

    Promise.all([api.getProducts(), api.getCategories()])
      .then(([fetchedProducts, fetchedCategories]) => {
        if (!active) return;
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      })
      .catch(() => active && setIsError(true))
      .finally(() => active && setIsLoading(false));

    return () => {
      active = false;
    };
  }, [reloadToken]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesQuery =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, searchQuery]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      categories,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      filteredProducts,
      isLoading,
      isError,
      refetch,
    }),
    [products, categories, activeCategory, searchQuery, filteredProducts, isLoading, isError, refetch],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used within a CatalogProvider");
  return context;
}
