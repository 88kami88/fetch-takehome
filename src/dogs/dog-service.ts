import { Sort } from "../breeds/breed-context";
import { baseUrl, dogsUrl } from "../constants";

type SearchResultIds = string[];

interface SearchResponse {
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
  params: Record<string, string | number | undefined | null>
): string {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
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
  breed: string | undefined,
  sort: Sort = "asc"
): Promise<[SearchResponse, Dog[]]> {
  const queryString = buildQueryString({
    breeds: breed,
    sort: `breed:${sort}`,
  });

  const searchUrl = breed
    ? `${baseUrl}${path}${queryString}`
    : `${baseUrl}${path}${queryString}`;

  const searchRes = await fetch(searchUrl, {
    credentials: "include",
  });

  const searchJson = (await searchRes.json()) as SearchResponse;
  const resultIds: SearchResultIds = searchJson.resultIds;

  const dogs = await getDogsById(resultIds);

  return [searchJson, dogs];
}
