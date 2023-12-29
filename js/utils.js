export const parseId = (id) => {
  return id.split(',').map((value) => parseInt(value, 10));
}
