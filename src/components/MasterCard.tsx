import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MasterDetailModal } from "./MasterDetailModal";
import type { Master } from "@/types/master";

interface MasterCardProps {
  master: Master;
}

export function MasterCard({ master }: MasterCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="gap-2"
      >
        <Eye className="w-4 h-4" />
        Usta Kartı Önizleme
      </Button>

      <MasterDetailModal master={master} open={open} onOpenChange={setOpen} />
    </>
  );
}
