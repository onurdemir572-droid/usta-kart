import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  Download,
  UserPlus,
  UserCheck,
  ArrowLeft,
  User,
} from "lucide-react";
import type { Master, Review } from "@/types/master";

interface Props {
  master: Master;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ReferencesSection({ references }: { references: Master["references"] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? references.length : 1;

  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Star className="w-4 h-4 text-primary" />
        Referanslar ({references.length})
      </h3>
      <div className="space-y-3">
        {references.slice(0, visibleCount).map((ref, i) => (
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
      {references.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 gap-1 text-muted-foreground"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Gizle
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Tümünü Göster ({references.length - 1} daha)
            </>
          )}
        </Button>
      )}
    </div>
  );
}

function StarRating({ rating, onRate, size = "sm" }: { rating: number; onRate?: (r: number) => void; size?: "sm" | "md" }) {
  const s = size === "md" ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          className={onRate ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        >
          <Star
            className={`${s} ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewsPanel({ master }: { master: Master }) {
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>(master.reviews);

  const filtered = filterStar
    ? localReviews.filter((r) => r.rating === filterStar)
    : localReviews;

  const avgRating = localReviews.length > 0
    ? (localReviews.reduce((sum, r) => sum + r.rating, 0) / localReviews.length).toFixed(1)
    : "0";

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: localReviews.filter((r) => r.rating === s).length,
  }));

  const handleSubmit = () => {
    if (newRating === 0 || !newComment.trim()) return;
    const review: Review = {
      id: `r-${Date.now()}`,
      author: "Siz",
      avatar: "",
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    setLocalReviews([review, ...localReviews]);
    setNewRating(0);
    setNewComment("");
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="flex gap-6 items-start">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground">{avgRating}</p>
          <StarRating rating={Math.round(Number(avgRating))} />
          <p className="text-xs text-muted-foreground mt-1">{localReviews.length} değerlendirme</p>
        </div>
        <div className="flex-1 space-y-1">
          {starCounts.map(({ star, count }) => {
            const pct = localReviews.length > 0 ? (count / localReviews.length) * 100 : 0;
            return (
              <button
                key={star}
                onClick={() => setFilterStar(filterStar === star ? null : star)}
                className={`flex items-center gap-2 w-full group rounded px-1 py-0.5 transition-colors ${
                  filterStar === star ? "bg-primary/10" : "hover:bg-secondary/50"
                }`}
              >
                <span className="text-xs font-medium text-muted-foreground w-3">{star}</span>
                <Star className="w-3 h-3 fill-primary text-primary" />
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-5 text-right">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter indicator */}
      {filterStar && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            {filterStar} yıldız filtresi
            <button onClick={() => setFilterStar(null)} className="ml-1 hover:text-destructive">✕</button>
          </Badge>
          <span className="text-xs text-muted-foreground">{filtered.length} sonuç</span>
        </div>
      )}

      {/* Write review */}
      <div className="p-4 rounded-lg border border-border bg-secondary/30 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Yorum Yaz</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Puanınız:</span>
          <StarRating rating={newRating} onRate={setNewRating} size="md" />
        </div>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Deneyiminizi paylaşın..."
          className="text-sm resize-none"
          rows={3}
        />
        <Button size="sm" onClick={handleSubmit} disabled={newRating === 0 || !newComment.trim()} className="gap-1">
          <Send className="w-3.5 h-3.5" />
          Gönder
        </Button>
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Bu filtrede yorum bulunamadı.</p>
        ) : (
          filtered.map((review) => (
            <div key={review.id} className="p-3 rounded-lg border border-border bg-card space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{review.author}</span>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function MasterDetailModal({ master, open, onOpenChange }: Props) {
  const [following, setFollowing] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) setShowReviews(false); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">{master.name} - {showReviews ? "Yorumlar" : "Usta Detay"}</DialogTitle>

        {/* Cover + Avatar header */}
        <div className="relative">
          <div className="h-44 overflow-hidden">
            <img src={master.coverImage} alt="Kapak" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex items-end gap-4">
            <div className="w-20 h-20 rounded-xl border-[3px] border-card overflow-hidden shadow-lg flex-shrink-0">
              <img src={master.avatar} alt={master.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-primary-foreground">{master.name}</h2>
                <Button
                  size="sm"
                  variant={following ? "secondary" : "default"}
                  className="h-7 text-xs gap-1 rounded-full"
                  onClick={() => setFollowing(!following)}
                >
                  {following ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                  {following ? "Takip Ediliyor" : "Takip Et"}
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80">{master.title}</p>
            </div>
            <button
              onClick={() => setShowReviews(true)}
              className="flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 hover:bg-card transition-colors"
            >
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-card-foreground">{master.rating}</span>
              <span className="text-xs text-muted-foreground">({master.reviewCount})</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {showReviews ? (
            <>
              <Button variant="ghost" size="sm" className="gap-1 -ml-2" onClick={() => setShowReviews(false)}>
                <ArrowLeft className="w-4 h-4" />
                Profile Dön
              </Button>
              <ReviewsPanel master={master} />
            </>
          ) : (
            <>
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

              <p className="text-sm text-muted-foreground leading-relaxed">{master.bio}</p>

              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" />
                  Verilen Hizmetler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {master.services.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs px-3 py-1">{s}</Badge>
                  ))}
                </div>
              </div>

              {/* References */}
              {master.references.length > 0 && (
                <ReferencesSection references={master.references} />
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
