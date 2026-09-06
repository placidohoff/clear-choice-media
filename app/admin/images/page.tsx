import { requireAdminSession } from "@/app/actions/admin";
import UploadClient from "./UploadClient";

export default async function ImagesAdminPage() {
  await requireAdminSession();

  return (
    <main className="min-h-screen bg-[#071019] px-4 py-10 text-white">
      <UploadClient />
    </main>
  );
}
