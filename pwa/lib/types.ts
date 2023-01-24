export declare type Nullable<T> = T | null

export declare interface JsonViolation {
  propertyPath: string
  message: string
}

export declare interface JsonResponse {
  violations: JsonViolation[] | [],
  'hydra:description'?: string
  'hydra:title'?: string
}

export declare interface StringAssociativeArray {
  [key: string]: string|number
}
export declare type SubmissionErrorsType = {
  [key: string]: string
}
