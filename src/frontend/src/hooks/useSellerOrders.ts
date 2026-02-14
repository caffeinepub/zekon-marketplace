import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Order } from '../backend';
import { QUERY_KEYS } from '../lib/queryKeys';

export function useListSellerOrders() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: QUERY_KEYS.sellerOrders,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrdersForMyProducts();
    },
    enabled: !!actor && !actorFetching,
  });
}
