import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Wrench,
  Clock,
  User,
  Send,
} from "lucide-react";
import type { Master } from "@/types/master";
import { MasterDetailModal } from "./MasterDetailModal";

interface Props {
  master: Master;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MasterListingModal({ master, open, onOpenChange }: Props) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">{master.name} - İlan</DialogTitle>

          {/* Mini header */}
          <div className="relative h-28 overflow-hidden">
            <img src={master.coverImage} alt="Kapak" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3">
              <div className="w-14 h-14 rounded-full border-2 border-card overflow-hidden shadow-lg flex-shrink-0">
                <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-lg font-bold text-primary-foreground leading-tight">{master.listingTitle}</h2>
                <p className="text-xs text-primary-foreground/90 font-medium">{master.title}</p>
                <p className="text-xs text-primary-foreground/70">{master.name}</p>
              </div>
              <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span className="text-xs font-bold text-card-foreground">{master.rating}</span>
              </div>
            </div>
          </div>

          {/* Listing body */}
          <div className="px-5 py-4 space-y-4">
            {/* Location & Experience */}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {master.district}, {master.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {master.experience} deneyim
              </span>
            </div>

            {/* İlan Açıklaması */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">İlan Açıklaması</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{master.bio}</p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-primary" />
                Hizmetler
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {master.services.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs px-2.5 py-0.5">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button className="flex-1 gap-2" size="sm">
                <Send className="w-4 h-4" />
                Teklif Al
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                size="sm"
                onClick={() => {
                  setProfileOpen(true);
                }}
              >
                <User className="w-4 h-4" />
                Usta Profilini Görüntüle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <MasterDetailModal master={master} open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
