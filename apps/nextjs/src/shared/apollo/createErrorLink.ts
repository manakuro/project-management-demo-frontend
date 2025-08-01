import { graphqlErrorHandler } from '@/shared/apollo/errorHandler';
import { onError } from '@apollo/client/link/error';

export const createErrorLink = () =>
  onError((error) => {
    graphqlErrorHandler(error);
  });
