import { Sort } from "../breeds/breed-context";
import { baseUrl, dogsUrl } from "../constants";
import { buildQueryString } from "../util";

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

export async function getDogsById(ids: string[]) {
  const res = await fetch(dogsUrl, {
    body: JSON.stringify(ids),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (res.status >= 400) {
    const error = `Unexpected error fetching dogs: ${await res.text()}`;
    console.error(error);
    throw new Error(error);
  }

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

  // If isCursor, then we have a full path formed by the search service so don't append query string
  const searchUrl = isCursor
    ? `${baseUrl}${path}`
    : `${baseUrl}${path}${queryString}`;

  const searchRes = await fetch(searchUrl, {
    credentials: "include",
  });

  if (searchRes.status >= 400) {
    const error = `Unexpected error searching dogs: ${await searchRes.text()}`;
    console.error(error);
    throw new Error(error);
  }

  const searchJson = (await searchRes.json()) as SearchResponse;
  const resultIds: SearchResultIds = searchJson.resultIds;

  const dogs = await getDogsById(resultIds);

  return [searchJson, dogs];
}
