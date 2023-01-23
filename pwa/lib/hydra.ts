import get from "lodash/get";
import has from "lodash/has";
import mapValues from "lodash/mapValues";

export function normalize(data: any) {
  if (has(data, "hydra:member")) {
    // Normalize items in collections
    data["hydra:member"] = data["hydra:member"].map((item:any) => normalize(item));

    return data;
  }

  // Flatten nested documents
  return mapValues(data, (value:any) =>
    Array.isArray(value)
      ? value.map((v) => get(v, "@id", v))
      : get(value, "@id", value)
  );
}
