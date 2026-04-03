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
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Image as ImageIcon,
  Send,
  Wrench,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Master } from "@/types/master";

interface Props {
  master: Master;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MasterDetailModal({ master, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">{master.name} - Usta Detay</DialogTitle>

        {/* Cover + Avatar header */}
        <div className="relative">
          <div className="h-44 overflow-hidden">
            <img
              src={master.coverImage}
              alt="Kapak"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          
          {/* Avatar overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex items-end gap-4">
            <div className="w-20 h-20 rounded-xl border-[3px] border-card overflow-hidden shadow-lg flex-shrink-0">
              <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl font-bold text-primary-foreground">{master.name}</h2>
              <p className="text-sm text-primary-foreground/80">{master.title}</p>
            </div>
            <div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-card-foreground">{master.rating}</span>
              <span className="text-xs text-muted-foreground">({master.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Location & Experience */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{master.district}, {master.city}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">{master.experience} deneyim</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed">{master.bio}</p>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              Verilen Hizmetler
            </h3>
            <div className="flex flex-wrap gap-2">
              {master.services.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs px-3 py-1">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* References */}
          {master.references.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Referanslar
              </h3>
              <div className="space-y-3">
                {master.references.map((ref, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                    <img
                      src={ref.image}
                      alt="Referans"
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">{ref.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {master.documents.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Belgeler & Broşürler
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {master.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
                  >
                    {doc.type === "pdf" ? (
                      <FileText className="w-5 h-5 text-destructive flex-shrink-0" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-accent flex-shrink-0" />
                    )}
                    <span className="text-xs font-medium text-foreground truncate">{doc.name}</span>
                    <Download className="w-3.5 h-3.5 text-muted-foreground ml-auto flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              İletişim
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${master.phone}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                {master.phone}
              </a>
              <a
                href={`mailto:${master.email}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                {master.email}
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 gap-2">
              <Send className="w-4 h-4" />
              Teklif Al
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <MessageCircle className="w-4 h-4" />
              Mesaj Gönder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
