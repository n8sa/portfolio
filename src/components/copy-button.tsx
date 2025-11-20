"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";

type CopyButtonProps = {
  textToCopy: string;
};

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "The email address has been copied.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
      });
    }
  };

  return (
    <Button onClick={handleCopy} variant="outline" className="w-full justify-start text-left">
      {isCopied ? (
        <Check className="mr-2 h-4 w-4 text-green-500" />
      ) : (
        <Copy className="mr-2 h-4 w-4" />
      )}
      <span className="truncate">{textToCopy}</span>
    </Button>
  );
}
