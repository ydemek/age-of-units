export const valueExtractor = (costs) => {
    return costs.reduce((obj, cost) => {
      if (!cost.disabled && cost.value !== "-") {
        obj[cost.name] = cost.value.split("-");
      }
      return obj;
    }, {});
  };