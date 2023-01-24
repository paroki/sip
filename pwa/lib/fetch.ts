import {JsonViolation, SubmissionErrorsType} from "./types"
import {SubmissionError, normalize } from "./common"
import {API_BASE_URL, MIME_TYPE} from "./config"

// @ts-ignore
import { isArray, isObject, isUndefined, forEach } from "lodash";

const transformRelationToIri = (payload: any) => {
  forEach(payload, (value: any, property: any) => {
    if (isObject(value) && !isUndefined(value["@id"])) {
      payload[property] = value["@id"];
    }

    if (isArray(value)) payload[property] = transformRelationToIri(value);
  });

  return payload;
};

const makeParamArray = (key: any, arr:any) =>
  arr.map((val: any) => `${key}[]=${val}`).join("&");

export default function fetch(url: string, options?: any){
  if(undefined === options){
    options = {}
  }

  if(!options.hasOwnProperty('headers')){
    options.headers = {}
  }

  if(!options.headers.hasOwnProperty('Accept')){
    options.headers['Accept'] = MIME_TYPE
  }

  if(undefined !== typeof options.body){
    options.headers['Content-Type'] = 'application/json'
  }

  if (options.params) {
    const params = normalize(options.params);
    let queryString = Object.keys(params)
      .map((key) =>
        Array.isArray(params[key])
          ? makeParamArray(key, params[key])
          : `${key}=${params[key]}`
      )
      .join("&");
    url = `${url}?${queryString}`;
  }

  const entryPoint = API_BASE_URL + (API_BASE_URL.endsWith("/") ? "":"/")

  const payload = options.body && JSON.parse(options.body);
  if (isObject(payload) && payload["@id"])
    options.body = JSON.stringify(normalize(payload));

  return global.fetch(new URL(url, entryPoint), options)
    .then(response => {
      if(response.ok){
        return response
      }
      return response.json()
        .then(
          (json) => {
            const error =
              json["hydra:description"] ||
              json["hydra:title"] ||
              "An error occurred.";

            if (!json.violations) throw Error(error);

            let errors: SubmissionErrorsType = {_error: error};

            json.violations.forEach((violation: JsonViolation) =>
              errors[violation.propertyPath]
                ? (errors[violation.propertyPath] +=
                  "\n" + errors[violation.propertyPath])
                : (errors[violation.propertyPath] = violation.message)
            );
            throw new SubmissionError(errors);
          },
          () => {
            throw new Error(response.statusText || "An error occurred.");
          }
        )
    })
}

