import { ToolStructuredData } from "@/components/tool-structured-data";
import { createToolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-data";
import { QRCodeGeneratorTool } from "@/components/tools/qr-code-generator";

const tool = getToolBySlug("qr-code-generator")!;

export function generateMetadata() {
  return createToolMetadata(tool);
}

export default function QrCodeGeneratorPage() {
  return (
    <>
      <ToolStructuredData tool={tool} />
      <QRCodeGeneratorTool />
    </>
  );
}
