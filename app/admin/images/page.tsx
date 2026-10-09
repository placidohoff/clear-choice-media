import { requireAdminSession } from "@/app/actions/admin";
import { listUploadedImages } from "@/lib/cloudinary";
import UploadClient from "./UploadClient";
import UploadedImagesList from "./UploadedImagesList";

export default async function ImagesAdminPage() {
  await requireAdminSession();
  const images = await listUploadedImages();

  return (
    <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
      <UploadClient />
      <UploadedImagesList images={images} />
    </main>
  );
}
