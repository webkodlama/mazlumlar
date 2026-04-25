# Umut Projesi - Ajan Talimatları

## Proje Genel Bakış

Bu proje, mazlumlar ve yardıma muhtaç insanlar için oluşturulmuş modern, responsive bir yardım derneği web sitesidir.

## Proje Yapısı

```
umut/
├── index.html      # Tek sayfalık HTML yapısı (tüm bölümler)
├── styles.css      # Tüm CSS stilleri (tek dosya)
├── script.js       # Tüm JavaScript fonksiyonları
├── README.md       # Kullanıcı dokümantasyonu
└── AGENTS.md       # Bu dosya
```

## Kodlama Standartları

### HTML
- Semantic HTML5 etiketleri kullanılır (`section`, `article`, `nav` vb.)
- Tüm görsellerde `alt` attribute'u zorunlu
- ARIA label'ları erişilebilirlik için eklenmiştir
- BEM benzeri class isimlendirmesi

### CSS
- CSS Variables (custom properties) kullanılır
- Mobile-first yaklaşım
- Flexbox ve Grid kullanımı
- REM birimi kullanılır
- Transition ve animation best practices

### JavaScript
- Vanilla JavaScript (framework kullanılmamıştır)
- Event delegation kullanımı
- Intersection Observer API kullanımı
- Debounce/throttle fonksiyonları
- Modern ES6+ syntax

## Önemli Notlar

1. **Tek Sayfalık Yapı**: Tüm içerik `index.html` içindedir, sayfa geçişleri anchor linklerle yapılır
2. **Responsive Tasarım**: 3 ana breakpoint vardır (480px, 768px, 1024px)
3. **Animasyonlar**: CSS transitions ve keyframes kullanılır, JavaScript sadece trigger olarak kullanılır
4. **SEO**: Meta tag'ler, Open Graph ve semantic yapı önemlidir

## Sık Yapılan Değişiklikler

### Renk Değiştirme
```css
/* styles.css - :root içinde */
--primary: #2dd4bf;      /* Turkuaz */
--secondary: #6366f1;    /* Mor */
--accent: #f59e0b;       /* Turuncu */
```

### Yeni Bölüm Ekleme
1. `index.html`'de son section'dan sonra yeni `<section>` ekle
2. CSS'de gerekli stilleri ekle
3. Navigasyon menüsüne link ekle
4. `data-aos` attribute'u ekle animasyon için

### Form İşlemleri
Tüm formlar şu anda client-side validation ile çalışır ve toast mesajı gösterir. Backend bağlantısı için:
1. Form submit event listener'ını bul
2. `e.preventDefault()` sonrası AJAX/Fetch ekle
3. Success/error handling ekle

## Performans Optimizasyonları

- CSS ve JS tek dosyada (HTTP request azaltmak için)
- Google Fonts preconnect
- Lazy loading için hazır yapı (data-src attribute)
- Throttled scroll event listeners

## Erişilebilirlik (Accessibility)

- Tüm butonlarda aria-label
- Form elemanlarında label bağlantıları
- Yeterli renk kontrastı (WCAG AA)
- Klavye navigasyonu desteği
- Screen reader dostu yapı

## Test Kontrol Listesi

Her değişiklik sonrası:
- [ ] Mobil görünüm (Chrome DevTools)
- [ ] Tablet görünüm
- [ ] Desktop görünüm
- [ ] Navigasyon çalışıyor mu?
- [ ] Form validasyonları çalışıyor mu?
- [ ] Animasyonlar düzgün çalışıyor mu?
- [ ] Console'da hata var mı?

## Geliştirme Ortamı

Projeyi çalıştırmak için herhangi bir build tool gerekmez:
```bash
# Basit HTTP sunucusu ile (Python 3)
cd umut
python -m http.server 8000

# Veya Node.js ile
npx serve

# Veya VS Code Live Server eklentisi
```

## Deployment

Projeyi yayınlamak için:
1. Tüm dosyaları hosting'e yükleyin
2. `index.html` ana dizinde olmalı
3. HTTPS tercih edilir (forms için)
4. .htaccess veya benzeri yapılandırma SEO için önerilir

## İletişim

Proje sahibi: Umut Derneği
E-posta: info@umut.org.tr
