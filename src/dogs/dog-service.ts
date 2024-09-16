import { Sort } from "../breeds/breed-context";
import { baseUrl, dogsUrl } from "../constants";

type SearchResultIds = string[];

export interface SearchResponse {
  resultIds: SearchResultIds;
  total: number;
  next?: string;
  prev?: string;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

function buildQueryString(
  params: Record<
    string,
    string | number | (string | number)[] | undefined | null
  >
): string {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // For arrays, map each element to 'key=value'
        return value.map(
          (val) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`
        );
      }
      // For non-arrays, map the single 'key=value'
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");

  return queryString ? `?${queryString}` : "";
}

export async function getDogsById(ids: string[]) {
  const res = await fetch(dogsUrl, {
    body: JSON.stringify(ids),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const dogs = (await res.json()) as Dog[];

  return dogs;
}

export async function searchDogs(
  path: string,
  breeds: string[],
  sort: Sort = "asc",
  isCursor = false
): Promise<[SearchResponse, Dog[]]> {
  const queryString = buildQueryString({
    breeds,
    sort: `breed:${sort}`,
  });

  const searchUrl = isCursor
    ? `${baseUrl}${path}`
    : `${baseUrl}${path}${queryString}`;

  const searchRes = await fetch(searchUrl, {
    credentials: "include",
  });

  const searchJson = (await searchRes.json()) as SearchResponse;
  const resultIds: SearchResultIds = searchJson.resultIds;

  const dogs = await getDogsById(resultIds);

  return [searchJson, dogs];
}
