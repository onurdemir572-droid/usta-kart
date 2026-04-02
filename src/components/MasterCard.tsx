import { useState } from "react";
import { MapPin, Star, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MasterDetailModal } from "./MasterDetailModal";
import type { Master } from "@/types/master";

interface MasterCardProps {
  master: Master;
}

export function MasterCard({ master }: MasterCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full text-left rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        {/* Cover */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={master.coverImage}
            alt={master.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          {/* Avatar */}
          <div className="absolute -bottom-8 left-4">
            <div className="w-16 h-16 rounded-full border-[3px] border-card overflow-hidden shadow-md">
              <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-xs font-semibold text-card-foreground">{master.rating}</span>
            <span className="text-xs text-muted-foreground">({master.reviewCount})</span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-10 px-4 pb-4">
          <h3 className="font-display text-lg font-semibold text-card-foreground">{master.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{master.title}</p>

          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs">{master.district}, {master.city}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {master.services.slice(0, 3).map((service) => (
              <Badge key={service} variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">
                <Wrench className="w-2.5 h-2.5 mr-1" />
                {service}
              </Badge>
            ))}
            {master.services.length > 3 && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                +{master.services.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </button>

      <MasterDetailModal master={master} open={open} onOpenChange={setOpen} />
    </>
  );
}
