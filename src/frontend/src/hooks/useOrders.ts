import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Order, Address, PaymentMethod } from '../backend';
import { QUERY_KEYS } from '../lib/queryKeys';

export function useListMyOrders() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: QUERY_KEYS.myOrders,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !actorFetching,
  });
}

interface CreateOrderParams {
  productId: bigint;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, shippingAddress, paymentMethod }: CreateOrderParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createOrder(productId, shippingAddress, paymentMethod);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myOrders });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sellerOrders });
    },
  });
}
