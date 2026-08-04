import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { QRCodeGeneratorTool } from "@/components/tools/qr-code-generator";

const tool = getToolBySlug("qr-code-generator")!;
export const metadata = createToolMetadata(tool);

export default function QRCodeGeneratorPage() {
  return <QRCodeGeneratorTool />;
}
