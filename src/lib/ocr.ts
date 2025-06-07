import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function ocrFile(
  file: string,
  name: string,
  type: "jpeg" | "png" | "pdf"
): Promise<string> {
  if (type == "pdf") {
    const content = await ocrPdf(file, name);
    return content;
  } else {
    const content = await ocrImage(file, type);
    return content;
  }
}

async function ocrImage(file: string, type: "jpeg" | "png"): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-4o",
    temperature: 0,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Please extract the text from this image. Just return the text from the image, nothing else. Format it in Markdown, including different levels of headings to preserve hierarchy. Provide ready-to-use Markdown, and DO NOT include ```.",
          },
          {
            type: "input_image",
            image_url: `data:image/${type};base64,${file}`,
            detail: "auto",
          },
        ],
      },
    ],
  });
  return response.output_text;
}

async function ocrPdf(file: string, name: string): Promise<string> {
  const response = await openai.responses.create({
    model: "gpt-4o",
    temperature: 0,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Please extract the text from this PDF. Just return the text from the PDF, nothing else. Format it in Markdown, including different levels of headings to preserve hierarchy. Provide ready-to-use Markdown, and DO NOT include ```.",
          },
          {
            type: "input_file",
            file_data: `data:application/pdf;base64,${file}`,
            filename: name,
          },
        ],
      },
    ],
  });
  return response.output_text;
}
