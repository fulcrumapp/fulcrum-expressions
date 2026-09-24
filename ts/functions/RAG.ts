/**
 * Retrieves bounded passages from the active form's local RAG bundle.
 *
 * This is a Data Event function supported only by the iOS and Android
 * Expressions hosts. It does not generate answers or contact a remote service.
 */
export interface RagRetrievalOptionsV1 {
  /**
   * Literal plain-text query. Boundary whitespace is normalized with the
   * v1 trimQueryV1 rule and the resulting query must contain 1–1,000 Unicode
   * scalar values.
   */
  query: string;
  /** Maximum result count; an integer from 1 through 20. @default 5 */
  limit?: number;
  /** Inclusive normalized-score threshold from 0 through 1. @default 0.70 */
  min_score?: number;
  /** Retrieval timeout in milliseconds; an integer from 2,000 through 10,000. @default 2000 */
  timeout_ms?: number;
}

export type RagErrorCodeV1 =
  | "rag_invalid_options"
  | "rag_invalid_query"
  | "rag_unavailable"
  | "rag_timeout"
  | "rag_cancelled";

export interface RagErrorV1 extends Error {
  code: RagErrorCodeV1;
}

export interface RagCitationV1 {
  /** Non-empty opaque attachment ID of at most 128 Unicode scalar values. */
  attachment_id: string;
  /** Non-empty redacted filename of at most 255 Unicode scalar values. */
  filename: string;
  /** Integer page number from 1 through 100,000. */
  page_number: number;
  /** Non-empty opaque chunk ID of at most 128 Unicode scalar values. */
  chunk_id: string;
  /** Optional non-empty redacted heading of at most 500 Unicode scalar values. */
  section_heading?: string;
}

export interface RagRetrievalResultItemV1 {
  /** One-based contiguous rank in descending score order. */
  rank: number;
  /** Finite normalized score from 0 through 1, at or above min_score. */
  score: number;
  /** Non-empty redacted passage text of at most 2,000 Unicode scalar values. */
  text: string;
  citation: RagCitationV1;
}

export interface RagRetrievalResultV1 {
  /** Non-empty opaque local-bundle version of at most 128 Unicode scalar values. */
  bundle_version: string;
  /** Exactly results.length and no greater than the effective limit. */
  result_count: number;
  /** Results are score-descending; equal scores use ascending chunk_id code-point order. */
  results: RagRetrievalResultItemV1[];
}

/**
 * Retrieves ranked passages from the active form's validated local bundle.
 * The callback is invoked asynchronously exactly once. On failure, `result`
 * is null and `error.code` is one of the stable v1 RAG error codes.
 */
export default function RAG(
  options: RagRetrievalOptionsV1,
  callback: (error: RagErrorV1 | null, result: RagRetrievalResultV1 | null) => void
): void
{}
