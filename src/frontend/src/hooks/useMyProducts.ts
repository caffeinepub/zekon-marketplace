import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Product } from '../backend';
import { QUERY_KEYS } from '../lib/queryKeys';

export function useListMyProducts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: QUERY_KEYS.myProducts,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyProducts();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, price, imageUrl }: { name: string; price: bigint; imageUrl: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProduct(name, price, imageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myProducts });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allProducts });
    },
  });
}
