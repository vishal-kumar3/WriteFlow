import { JSONContent } from "novel";

export const convertToJSONContent = (data: any): JSONContent | null => {
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    // Handle or log unexpected types
    console.warn("Unexpected jsonContent type:", typeof data);
    return null;
  }

  if (data && typeof data === 'object') {
    // Validate the object structure
    if (data.type === 'doc' && Array.isArray(data.content)) {
      return data as JSONContent;
    }
  }

  return null; // Default to null if data doesn't match the expected format
};
