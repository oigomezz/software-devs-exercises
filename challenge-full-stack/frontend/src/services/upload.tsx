import { API_URL } from "../config";
import { ApiUploadResponse, type Data } from "../types";

export const uploadFile = async (
  file: File
): Promise<[Error | null, Data?]> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_URL}/files`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return [new Error(`Error uploading file: ${res.statusText}`)];

    const json = (await res.json()) as ApiUploadResponse;

    return [null, json.data];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("Unknwon Error")];
};
