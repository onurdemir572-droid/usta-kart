import { MasterCard } from "@/components/MasterCard";
import type { Master } from "@/types/master";
import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import reference1 from "@/assets/reference-1.jpg";
import { Search } from "lucide-react";

const sampleMasters: Master[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    listingTitle: "Usta & İş Gücü",
    title: "Boyacı & Dekorasyon Ustası",
    avatar: avatar1,
    coverImage: cover1,
    services: ["İç Boyama", "Dış Cephe", "Dekoratif Boya", "Alçı Sıva", "Kartonpiyer"],
    city: "İstanbul",
    district: "Kadıköy",
    phone: "0532 123 45 67",
    email: "ahmet@usta.com",
    rating: 4.8,
    reviewCount: 124,
    experience: "12 yıl",
    bio: "İç ve dış cephe boya, dekoratif boya, alçı sıva, kartonpiyer ve duvar kağıdı işleriniz titizlikle yapılır. Ev, ofis ve işyeri boyama hizmeti verilir. Renk danışmanlığı ile mekanlarınıza yeni bir görünüm kazandırıyoruz.",
    references: [
      {
        description: "Kadıköy'de 3+1 dairenin komple iç boyaması ve dekoratif duvar uygulaması yapıldı. Müşteri çok memnun kaldı.",
        image: reference1,
      },
      {
        description: "Beşiktaş'ta 150m² ofis alanının dekoratif boya ve kartonpiyer uygulaması tamamlandı. Modern ve şık bir görünüm elde edildi.",
        image: reference1,
      },
      {
        description: "Üsküdar'da villa dış cephe boyası ve ısı yalıtım uygulaması yapıldı. Enerji tasarrufu sağlayan kaliteli malzemeler kullanıldı.",
        image: reference1,
      },
    ],
    documents: [
      { name: "Ustalık Belgesi.pdf", type: "pdf", url: "#" },
      { name: "Hizmet Broşürü.pdf", type: "pdf", url: "#" },
      { name: "Sertifika.jpg", type: "image", url: "#" },
    ],
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Usta<span className="text-primary">Bul</span>
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Usta veya hizmet ara..."
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-64"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-semibold text-foreground">Öne Çıkan Ustalar</h2>
          <p className="text-sm text-muted-foreground mt-1">Alanında uzman, güvenilir ustalarımız</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleMasters.map((master) => (
            <MasterCard key={master.id} master={master} />
          ))}
        </div>
      </main>
    </div>
  );
}
