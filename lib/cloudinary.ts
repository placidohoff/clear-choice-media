import { v2 as cloudinary } from "cloudinary";

let configured = false;

function getClient() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }

  return cloudinary;
}

export const UPLOAD_FOLDER = "clear-choice";

export type UploadedImage = {
  publicId: string;
  url: string;
  width: number;
  height: number;
  bytes: number;
  createdAt: string;
};

export async function listUploadedImages(): Promise<UploadedImage[]> {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return [];
  }

  const client = getClient();
  const images: UploadedImage[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await client.api.resources_by_asset_folder(UPLOAD_FOLDER, {
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const resource of result.resources) {
      images.push({
        publicId: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        bytes: resource.bytes,
        createdAt: resource.created_at,
      });
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  images.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return images;
}

export async function deleteUploadedImage(publicId: string): Promise<void> {
  const client = getClient();
  await client.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
}
