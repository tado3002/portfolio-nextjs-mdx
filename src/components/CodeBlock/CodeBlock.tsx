"use client";
import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="relative bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
