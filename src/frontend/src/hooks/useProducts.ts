import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Product } from '../backend';
import { QUERY_KEYS } from '../lib/queryKeys';

export function useListAllProducts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: QUERY_KEYS.allProducts,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllProducts();
    },
    enabled: !!actor && !actorFetching,
  });
}
