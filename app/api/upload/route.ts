import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";
import { pinecone } from "@/utils/pinecone";

export async function POST(request: Request) {
  const body = await request.formData();
  console.log(body.get("prompt"));
  const pdfFile = body.get("file");
  if (!pdfFile) {
    return NextResponse.error();
  }

  // INGEST
  const loader = new PDFLoader(pdfFile);
  // const loader = new PDFLoader(filePath);
  const rawDocs = await loader.load();

  /* Split text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(rawDocs);
  console.log("split docs into ", docs.length);

  console.log("creating vector store...");
  /*create and store the embeddings in the vectorStore*/
  const embeddings = new OpenAIEmbeddings();
  const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

  // clear index
  console.log("RESETTING INDEX...");
  await index.delete1({ deleteAll: true, namespace: PINECONE_NAME_SPACE });

  //embed the PDF documents
  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: PINECONE_NAME_SPACE,
    textKey: "text",
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
}
