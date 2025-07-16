import isEqual from 'lodash-es/isEqual';

export const isDescriptionEqual = (value: object, other: object): boolean => {
  if (!value || !other) return false;

  return isEqual(value, other);
};
