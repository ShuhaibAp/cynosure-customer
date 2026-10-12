import { proxyBackendFile } from "@/lib/proxy-file";

export async function GET(_request, { params }) {
  const { id, kind } = await params;
  return proxyBackendFile(`/customer/orders/${encodeURIComponent(id)}/documents/${encodeURIComponent(kind)}`);
}
