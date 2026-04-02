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
    ],
    documents: [
      { name: "Ustalık Belgesi.pdf", type: "pdf", url: "#" },
      { name: "Hizmet Broşürü.pdf", type: "pdf", url: "#" },
      { name: "Sertifika.jpg", type: "image", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Mehmet Kara",
    listingTitle: "Usta & İş Gücü",
    title: "Tesisatçı",
    avatar: avatar2,
    coverImage: cover2,
    services: ["Su Tesisatı", "Kalorifer", "Doğalgaz", "Petek Temizliği"],
    city: "İstanbul",
    district: "Beşiktaş",
    phone: "0533 987 65 43",
    email: "mehmet@usta.com",
    rating: 4.6,
    reviewCount: 89,
    experience: "8 yıl",
    bio: "Su tesisatı, petek temizliği, kalorifer tamiri, doğalgaz tesisatı ve boru döşeme işleriniz yapılır. Tıkanıklık açma, sızıntı tespiti, musluk montajı ve banyo tadilatı hizmeti verilir. Acil durumlar için 7/24 hizmetinizdeyiz.",
    references: [
      {
        description: "Beşiktaş'ta komple banyo renovasyonu ve tesisat yenilemesi yapıldı.",
        image: reference1,
      },
    ],
    documents: [
      { name: "Tesisat Belgesi.pdf", type: "pdf", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Can Demir",
    title: "Elektrik Ustası",
    avatar: avatar3,
    coverImage: cover3,
    services: ["Elektrik Tesisatı", "Aydınlatma", "Güvenlik Sistemleri", "Akıllı Ev"],
    city: "Ankara",
    district: "Çankaya",
    phone: "0535 456 78 90",
    email: "can@usta.com",
    rating: 4.9,
    reviewCount: 156,
    experience: "15 yıl",
    bio: "Elektrik tesisatı, aydınlatma montajı, sigorta panosu kurulumu, güvenlik kamerası ve akıllı ev sistemleri işleriniz yapılır. Arıza tespiti, kablo çekimi, topraklama ve priz/anahtar montajı hizmeti verilir.",
    references: [
      {
        description: "Çankaya'da villa tipi evin komple elektrik tesisatı ve akıllı ev sistemi kurulumu.",
        image: reference1,
      },
    ],
    documents: [
      { name: "Elektrik Yetki Belgesi.pdf", type: "pdf", url: "#" },
      { name: "Akıllı Ev Broşürü.pdf", type: "pdf", url: "#" },
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
